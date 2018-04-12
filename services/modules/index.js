const glob = require('glob')
const Router = require('koa-router')
const jwt = require('../lib/jwt')
const notFoundHandler = require('../middlewares/not-found')

const load = async function(app, config, logger) {
  glob(`${__dirname}/*`, { ignore: '**/index.js' }, (err, matches) => {
    /* istanbul ignore next */
    if (err) {
      throw err
    }
    matches.forEach(mod => {
      const modRouter = require(`${mod}/router`)
      const routes = modRouter.routes
      const baseUrl = modRouter.baseUrl
      const instance = new Router({ prefix: baseUrl })

      routes.forEach(modConfig => {
        /* istanbul ignore next */
        const {
          method = '',
          route = '',
          secured = false,
          handlers = []
        } = modConfig

        if (secured) handlers.unshift(jwt.jwt)

        const lastHandler = handlers.pop()

        logger.log(
          'info',
          `Load module ${method.toUpperCase()} ${baseUrl}${route} ${secured}`
        )

        instance[method.toLowerCase()](route, ...handlers, async function(ctx) {
          return lastHandler(ctx)
        })

        app.use(instance.routes()).use(instance.allowedMethods())
      })
    })
    app.use(notFoundHandler)
  })
}

module.exports = load
