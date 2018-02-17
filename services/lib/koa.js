const Koa = require('koa');
const KoaRouter = require('koa-route');
const dbConnect = require('./db.js');

const create = async function create(config) {
  const app = new Koa();
  app.context.db = await dbConnect.connect(config.db.server, config.db.dbName);

  // TODO: Remove that test
  app.use(KoaRouter.get('/', async (ctx) => {
    ctx.body = {
      data: 'Hello World',
    };
  }));

  return app;
};

module.exports = { create };
