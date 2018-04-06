const logger = require('../lib/logger');
const env = require('../config/');

/**
 * Error handler middleware.
 * Uses status code from error if present.
 */
const errorHandler = async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    /* istanbul ignore next */
    ctx.status = err.statusCode || 500;
    /* istanbul ignore next */
    ctx.body = err.toJSON ? err.toJSON() : { message: err.message, ...err };
    /* istanbul ignore next */
    if (!env.EMIT_STACK_TRACE) {
      delete ctx.body.stack;
    }
    /* istanbul ignore next */
    logger.log('error', `Error in request: ${err}`);
  }
}

module.exports = errorHandler;
