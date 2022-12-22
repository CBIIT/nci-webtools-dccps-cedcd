'use strict';

import express  from "express";
import session  from "express-session";
import passport  from "passport";
import { createUserSerializer,
	createUserDeserializer,
	createDefaultAuthStrategy,
  }  from "../service/auth/passportUtils.js";
import config  from "./index";
import compression  from "compression";
import bodyParser  from "body-parser";
import methodOverride  from "method-override";
import cookieParser  from "cookie-parser";
import path  from "path";
import { createLogger }  from "./service/logger.js";
import morgan  from "morgan";
import fs  from "fs";
import rfs  from "rotating-file-stream";
import fileUpload  from "express-fileupload";
 

export async function(){

	const env = config.env?config.env:"dev";

    const app = express();

    const logger = createLogger("cedcd", config.log_level?config.log_level:"debug");
    app.locals.logger = logger;

    app.use(compression());
    app.use(bodyParser.urlencoded({
        limit: '4mb', // 100kb default is too small
        extended: false
    }));
    app.use(bodyParser.json({
        limit: '4mb' // 100kb default is too small
    }));
    app.use(fileUpload());
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(require('../service/session'));

    app.use(express.static(path.join(config.root, 'client/www')));

    // configure passport
  logger.debug("Configuring passport");
  passport.serializeUser(createUserSerializer());
  passport.deserializeUser(createUserDeserializer(userManager));
  passport.use("default", await createDefaultAuthStrategy(config));

  // configure session
  logger.debug("Configuring session");
  app.use(createSession(env));
  app.use(passport.initialize());
  app.use(passport.session());
    
    if ('dev' === env) {
        app.use(morgan('dev'));
    }
    else if('prod' === env || 'qa' === env || 'stage' === env){
        let logDirectory = config.logDir;

        // ensure log directory exists
        fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

        // create a rotating write stream
        var accessLogStream = rfs('access.log', {
          interval: '1d', // rotate daily
          path: logDirectory
        })

        morgan.format('log-format', ':remote-addr - - [:date[clf]] ":method :url HTTP/:http-version" :status ":referrer" ":user-agent"');
        // setup the logger
        app.use(morgan('log-format', {stream: accessLogStream}));
    }

};
