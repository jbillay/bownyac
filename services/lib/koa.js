const Koa = require('koa')
const session = require('koa-generic-session')
const zlib = require('zlib').Z_SYNC_FLUSH
const modules = require('../modules')

const compress = require('koa-compress')
const bodyparser = require('koa-bodyparser')
const helmet = require('koa-helmet')
const conditional = require('koa-conditional-get')
const etag = require('koa-etag')
const respond = require('koa-respond')
const cors = require('@koa/cors')
const responseTime = require('../middlewares/responseTime')
const requestLogger = require('../middlewares/requestLogger')
const errorHandler = require('../middlewares/error-handler')

const create = async function create(db, config, logger, sessionStore) {
  const app = new Koa()

  app.context.logger = logger
  app.context.db = db
  app.context.config = config

  // Session setup on Redis
  app.keys = ['jbillay', config.secret]
  app.use(session({ store: sessionStore }))

  // Application middlewares
  app
    .use(errorHandler)
    .use(responseTime)
    .use(requestLogger)
    .use(
      compress({
        filter(contentType) {
          return /text/i.test(contentType)
        },
        threshold: 2048,
        flush: zlib
      })
    )
    .use(conditional())
    .use(etag())
    .use(helmet())
    .use(respond())
    .use(cors())
    .use(bodyparser())

  await modules(app, config, logger)

  return app
}

module.exports = { create }
