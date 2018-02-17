const path = require('path');

const config = {
  path: path.normalize(path.join(__dirname)),
  port: 4242,
  env: "test",
  db: {
    server: "mongodb://bownyac-db:27017",
    dbName: "bownyac-test"
  }
};

module.exports = config;
