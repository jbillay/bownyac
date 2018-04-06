const https = require('https');
const http = require('http');
const fs = require('fs');
const config = require('./config/');
const logger = require('./lib/logger');
const koaApp = require('./lib/koa');

const start = async function (config) {
  const app = await koaApp.create(config);

  if (config.mode === 'unsecure') {
    const server = http.createServer(app.callback()).listen(config.port);
  } else {
    const options = {
      key: fs.readFileSync(`${config.path}/certs/bownyac-key.pem`),
      cert: fs.readFileSync(`${config.path}/certs/bownyac-cert.pem`),
      requestCert: false,
      rejectUnauthorized: false,
    };
    const server = https.createServer(options, app.callback()).listen(config.port);
  }
};

start(config)
  .then((server) => logger.log('info', 'Server started'))
  .catch((error) => logger.log('error', `Server not started : ${error}`));
