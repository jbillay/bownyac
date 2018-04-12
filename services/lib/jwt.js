const jsonwebtoken = require('jsonwebtoken')

function resolveAuthorizationHeader(ctx) {
  if (!ctx.header || !ctx.header.authorization) {
    return
  }
  const parts = ctx.header.authorization.split(' ')
  if (parts.length === 2) {
    const scheme = parts[0]
    const credentials = parts[1]
    if (/^Bearer$/i.test(scheme)) {
      return credentials
    }
  }
}

function asyncVerify(...args) {
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(...args, (error, decoded) => {
      error ? reject(error) : resolve(decoded)
    })
  })
}

module.exports.jwt = async function jwtChecker(ctx, next) {
  try {
    const decoded = await asyncVerify(
      resolveAuthorizationHeader(ctx),
      ctx.config.secret
    )
    ctx.state.user = decoded
    await next()
  } catch (err) {
    ctx.status = 401
    ctx.body = {
      error: 'Not authorized'
    }
  }
}

module.exports.issue = (payload, config) => {
  return jsonwebtoken.sign(payload, config.secret)
}
