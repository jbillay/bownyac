const user = require('./controllers')

const baseUrl = '/user'

const routes = [
  {
    method: 'GET',
    route: '/',
    secured: true,
    handlers: [user.getCurrentUser]
  },
  {
    method: 'GET',
    route: '/test',
    secured: false,
    handlers: [user.test]
  }
]

module.exports = { baseUrl, routes }
