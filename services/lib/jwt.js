const jwt = require('koa-jwt')

function jwtInstance(config) {
  return jwt({ secret: config.secret })
}

function JWTErrorHandler(ctx, next) {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        error: 'Not authorized'
      }
    } else {
      /* istanbul ignore next */
      throw new Error(err)
    }
  })
}

module.exports.jwt = jwtInstance
module.exports.errorHandler = () => JWTErrorHandler
