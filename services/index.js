const https = require('https');
const fs = require('fs');
const debug = require('debug')('services:server');
const config = require('./config/');
const koaApp = require('./lib/koa');

debug(config);

async function run(config) {
  const app = await koaApp.create(config);
  const options = {
    key: fs.readFileSync(`${config.path}/certs/bownyac-key.pem`),
    cert: fs.readFileSync(`${config.path}/certs/bownyac-cert.pem`),
    requestCert: false,
    rejectUnauthorized: false,
  };

  const server = https.createServer(options, app.callback()).listen(config.port);
}

run(config).catch(error => console.error(error.stack));
