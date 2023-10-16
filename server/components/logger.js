/**
 * back-end logger for application
 */

"use strict";

import * as winston from "winston";
import "winston-daily-rotate-file";
import config from "../config/index.js";

const tsFormat = () => new Date().toLocaleTimeString();

const transport = new winston.transports.DailyRotateFile({
  filename: config.logDir + "/-warning.log",
  timestamp: tsFormat,
  datePattern: "yyyy-MM-dd",
  prepend: true,
  level: "warn",
});
const logger = new winston.createLogger({
  transports: [
    transport,
    new winston.transports.Console({
      level: config.log_level,
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
  ],
  exitOnError: false,
});

export default logger;
