const auth = require('./controllers')

const baseUrl = '/auth'

const routes = [
  {
    method: 'POST',
    route: '/',
    secured: false,
    handlers: [auth.authUser]
  }
]

module.exports = { baseUrl, routes }
