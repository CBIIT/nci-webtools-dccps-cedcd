import { formatObject } from "./logger.js";

const isProduction = process.env.NODE_ENV === "production";

export function logRequests(formatter = (request) => [request.path, { ...request.query, ...request.body }]) {
  return (request, response, next) => {
    const { logger } = request.app.locals;
    request.startTime = new Date().getTime();
    logger.info(formatter(request));
    next();
  };
}

export function logErrors(formatter = (e) => ({ error: e.message })) {
  return (error, request, response, next) => {
    const { logger } = request.app.locals;
    logger.error(formatObject(error));
    response.status(400).json(formatter(error));
  };
}
