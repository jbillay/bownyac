const path = require('path');

const config = {
  path: path.normalize(path.join(__dirname)),
  port: process.env.PORT || 4242,
  mode: "unsecure",
  env: "heroku",
  db: {
    server: "mongodb://heroku_38xk56f1:rcujmnmigkvbh8pmeloshfvd8f@ds211309.mlab.com:11309",
    dbName: "heroku_38xk56f1"
  }
};

module.exports = config;
