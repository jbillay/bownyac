const https = require('https');
const fs = require('fs');
const debug = require('debug')('serices:server');
const config = require('./config/');
const app = require('./lib/koa');

debug(config);

const options = {
  key: fs.readFileSync(`${config.path}/certs/bownyac-key.pem`),
  cert: fs.readFileSync(`${config.path}/certs/bownyac-cert.pem`),
  requestCert: false,
  rejectUnauthorized: false,
};

const server = https.createServer(options, app.callback()).listen(config.port);
