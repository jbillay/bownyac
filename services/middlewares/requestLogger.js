/**
 * Created by jeremy on 29/05/2017.
 */

const winstonLogger = require('../lib/logger');

// logger middleware

module.exports = async function logger(ctx, next) {
  winstonLogger.log('info', `${ctx.method} ${ctx.url}`);
  await next();
};
