/**
 * Created by jeremy on 29/05/2017.
 */

const debug = require('debug')('services:logger');

// logger middleware

module.exports = async function logger(ctx, next) {
  await next();
  debug(`${ctx.method} ${ctx.url}`);
};
