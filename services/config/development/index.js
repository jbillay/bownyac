const path = require('path');

const config = {
  path: path.normalize(path.join(__dirname)),
  port: 4242,
  mode: "secure",
  env: "development",
  db: {
    server: "mongodb://bownyac-db:27017",
    dbName: "bownyac"
  }
};

module.exports = config;
