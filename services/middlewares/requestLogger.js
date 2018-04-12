/**
 * Created by jeremy on 29/05/2017.
 */

// logger middleware
module.exports = async function logger(ctx, next) {
  ctx.logger.log('info', `${ctx.method} ${ctx.url}`)
  await next()
}
