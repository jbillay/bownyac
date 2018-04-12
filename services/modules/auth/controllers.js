const jwt = require('../../lib/jwt')

const authUser = async function authUser(ctx) {
  ctx.logger.log('debug', 'In authUser controller')
  const user = {
    name: 'Jeremy',
    role: 'admin'
  }
  ctx.ok({ token: jwt.issue(user, ctx.config) })
}

module.exports = { authUser }
