/**
 * Created by jeremy on 29/05/2017.
 */

// x-response-time middleware
module.exports = async function responseTime(ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms} ms`);
};
