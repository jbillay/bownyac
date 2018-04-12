const https = require('https')
const http = require('http')
const fs = require('fs')
const config = require('./config/')
const logger = require('./lib/logger')(config)
const dbConnect = require('./lib/db')
const koaApp = require('./lib/koa')
const RedisStore = require('koa-redis')

const start = async function(config) {
  let db, app, store
  // Connect database
  try {
    db = await dbConnect.connect(config.db)
  } catch (err) {
    throw new Error(err)
  }
  // Connect to redis to store session
  try {
    store = new RedisStore({ host: config.redis })
  } catch (err) {
    throw new Error(err)
  }
  // Initiate Koa
  try {
    app = await koaApp.create(db, config, logger, store)
  } catch (err) {
    throw new Error(err)
  }

  if (config.mode === 'unsecure') {
    http.createServer(app.callback()).listen(config.port)
  } else {
    const options = {
      key: fs.readFileSync(`${config.path}/certs/bownyac-key.pem`),
      cert: fs.readFileSync(`${config.path}/certs/bownyac-cert.pem`),
      requestCert: false,
      rejectUnauthorized: false
    }
    https.createServer(options, app.callback()).listen(config.port)
  }
}

start(config)
  .then(server => logger.log('info', 'Server started'))
  .catch(error => logger.log('error', `Server not started : ${error}`))
