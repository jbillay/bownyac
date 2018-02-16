const debug = require('debug')('services:server:db');
const mongoose = require('mongoose');

const connect = async function(server, dbName) {
  try {
    const url = `${server}/${dbName}`;
    const db = await mongoose.connect(url);
  } catch(err) {
    debug(`Unable to connect to the database: ${err}`);
    process.exit(0);
  }
};

const createSchema = function(name, content) {
  const schema = mongoose.Schema(content);
  return schema;
};

const enrichModel = function(name, schemaObject) {
  const model = mongoose.model('${name}', kittySchema);
  return model;
};

module.exports = {
  connect: connect,
  createSchema: createSchema,
  enrichModel: enrichModel
};
