const https = require('https');
const fs = require('fs');
const config = require('./config/');
const debug = require('debug')('services:server');
const koaApp = require('./lib/koa');

const start = async function (config) {
  const app = await koaApp.create(config);
  const options = {
    key: fs.readFileSync(`${config.path}/certs/bownyac-key.pem`),
    cert: fs.readFileSync(`${config.path}/certs/bownyac-cert.pem`),
    requestCert: false,
    rejectUnauthorized: false,
  };

  const server = https.createServer(options, app.callback()).listen(config.port);
};

start(config)
  .then((server) => console.log('Server started'))
  .catch((error) => console.error('Server not started'));
