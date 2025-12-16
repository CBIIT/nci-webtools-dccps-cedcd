"use strict";

import { promisify } from "util";
import express from "express";
import passport from "passport";
import {
  createUserSerializer,
  createUserDeserializer,
  createDefaultAuthStrategy,
} from "./server/service/auth/passportUtils.js";
import compression from "compression";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import path from "path";
import { createLogger } from "./service/logger.js";
import morgan from "morgan";
import fs from "fs";
import rfs from "rotating-file-stream";
import fileUpload from "express-fileupload";
import session from "./service/session.js";
import UserManager from "./service/auth/userManager.js";

import config from "./server/config/index.js";
import * as mysql from "./server/components/mysql.js";
import { setValue as cache_setValue } from "./server/components/cache.js";
import routes from "./server/routes/routes.js";
import { startReminderService } from "./server/service/emailReminder.js";
import { startCohortStatusService } from "./server/service/markOutdated.js";

try {
  await startApp();
} catch (e) {
  console.error(e);
  process.exit(1);
}

export async function startApp() {
  const app = await createApp();
  startReminderService(app);
  startCohortStatusService(app);
  const logger = app.locals.logger;
  const connection = app.locals.connection;
  logger.debug("Created application, starting server");

  mysql.deferUntilConnected(connection).then(function (connection) {
    connection.query("call select_cohort_lookup()", (error, results, columns) => {
      if (!error && results && results[0] && results[0].length > 0) {
        let gender = results[0];
        let cancer = results[1];
        let data_category = results[2];
        let ethnicity = results[3];
        let race = results[4];
        let specimen = results[5];
        let cohortstatus = results[6];
        let collected_specimen = results[7];
        // remove sex/orientation
        data_category = data_category.filter((e) => e.id !== 43);
        cache_setValue("lookup:gender", gender, -1);
        cache_setValue("lookup:cancer", cancer, -1);
        cache_setValue("lookup:data_category", data_category, -1);
        cache_setValue("lookup:ethnicity", ethnicity, -1);
        cache_setValue("lookup:race", race, -1);
        cache_setValue("lookup:specimen", specimen, -1);
        cache_setValue("lookup:cohortstatus", cohortstatus, -1);
        cache_setValue("lookup:collected_specimen", collected_specimen, -1);

        app.listen(config.port, function () {
          console.log(`Project CEDCD listening on port: ${config.port}`);
        });
      } else {
        console.log(error);
        console.log("failed to start up the service: load lookup data error.");
      }
    });
  });
}

export async function createApp() {
  const app = express();

  app.set("trust proxy", 1);
  const connection = mysql.getConnectionPool(config.mysql);
  const logger = createLogger("cedcd", config.log_level ? config.log_level : "debug");
  app.locals.logger = logger;

  app.locals.connection = connection;
  app.locals.mysql = {
    connection,
    query: promisify(connection.query).bind(connection),
    upsert: mysql.upsert,
  };
  const userManager = new UserManager(app.locals.mysql);

  app.locals.userManager = userManager;

  app.use(compression());
  app.use(
    bodyParser.urlencoded({
      limit: "4mb", // 100kb default is too small
      extended: false,
    }),
  );
  app.use(
    bodyParser.json({
      limit: "4mb", // 100kb default is too small
    }),
  );
  app.use(fileUpload());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(session);

  app.use(express.static(path.join(config.root, "../client/www")));

  // configure passport
  logger.debug("Configuring passport");
  passport.serializeUser(createUserSerializer());
  passport.deserializeUser(createUserDeserializer(userManager));
  passport.use("default", await createDefaultAuthStrategy(config));

  // configure session
  logger.debug("Configuring session");
  app.use(session);
  app.use(passport.initialize());
  app.use(passport.session());

  // register api routes
  app.use("/", routes);

  // if ('dev' === env) {
  // 	app.use(morgan('dev'));
  // }
  // else if ('prod' === env || 'qa' === env || 'stage' === env) {
  // 	let logDirectory = config.logDir;

  // 	// ensure log directory exists
  // 	fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

  // 	// create a rotating write stream
  // 	var accessLogStream = rfs('access.log', {
  // 		interval: '1d', // rotate daily
  // 		path: logDirectory
  // 	})

  //morgan.format('log-format', ':remote-addr - - [:date[clf]] ":method :url HTTP/:http-version" :status ":referrer" ":user-agent"');
  // setup the logger
  //app.use(morgan('log-format', { stream: accessLogStream }));
  // }

  return app;
}

// when shutdown signal is received, do graceful shutdown
process.on("SIGINT", function () {
  console.log("gracefully shutting down :)");
  mysql.close();
  process.exit();
});

