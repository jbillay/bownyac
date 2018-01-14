const path = require('path');

const config = {
  path: path.normalize(path.join(__dirname)),
  port: 4242,
  env: "development",
  db: {
    url: "mongodb://bownyac-db:27017",
    dbname: "bownyac"
  }
};

module.exports = config;
