const debug = require('debug')('services:server:koa');
const Koa = require('koa');
const dbConnect = require('./db.js');

const create = async function (config) {
  const app = new Koa();
  const db = await dbConnect.connect(config.db.server, config.db.dbName);

  app.use(async ctx => {
    ctx.body = 'Hello World';
  });

  app.listen(3000);

  return app;
};

module.exports = {
  create: create
};
