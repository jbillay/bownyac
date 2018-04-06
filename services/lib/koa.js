const Koa = require('koa')
const dbConnect = require('./db.js')
const jwt = require('./jwt')
const session = require('koa-generic-session')
const RedisStore = require('koa-redis')
const Router = require('koa-router')
const zlib = require('zlib').Z_SYNC_FLUSH

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
const notFoundHandler = require('../middlewares/not-found')

const create = async function create(config) {
  const app = new Koa()

  // Connect database
  try {
    app.context.db = await dbConnect.connect(config.db)
  } catch (err) {
    throw new Error(err)
  }

  // Session setup on Redis
  app.keys = ['jbillay', config.secret]
  app.use(session({ store: new RedisStore({ host: config.redis }) }))

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

  const publicRouter = new Router()
  const securedRouter = new Router()

  // Add the securedRouter to our app as well
  app.use(publicRouter.routes()).use(publicRouter.allowedMethods())
  app.use(securedRouter.routes()).use(securedRouter.allowedMethods())

  securedRouter.use(jwt.errorHandler()).use(jwt.jwt(config))
  // TODO: Remove that test
  /**
   * @api {get} / Test function
   * @apiVersion 0.0.1
   * @apiName Test
   * @apiGroup Test
   *
   * @apiSuccess {String} data Confirmation message
   *
   * @apiSuccessExample {jsonp} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *        "data": "Hello World"
   *     }
   *
   */
  publicRouter.get('/', async ctx => {
    ctx.body = {
      data: 'Hello World'
    }
  })

  // TODO: Remove that test
  /**
   * @api {get} /home Test function
   * @apiVersion 0.0.1
   * @apiName Test
   * @apiGroup Test
   *
   * @apiSuccess {String} data Confirmation message
   *
   * @apiSuccessExample {jsonp} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *        "data": "Home sweet home"
   *     }
   *
   */
  securedRouter.get('/home', async ctx => {
    ctx.body = {
      data: 'Home sweet home'
    }
  })

  app.use(notFoundHandler)

  return app
}

module.exports = { create }
