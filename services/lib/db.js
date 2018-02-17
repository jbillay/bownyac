const debug = require('debug')('services:server:db');
const mongoose = require('mongoose');

const connect = async function connect(server, dbName) {
  try {
    const url = `${server}/${dbName}`;
    const db = await mongoose.connect(url);
    return db;
  } catch (err) {
    debug(`Unable to connect to the database: ${err}`);
    process.exit(0);
  }
  return null;
};

const createSchema = async function createSchema(name, content) {
  const schema = mongoose.Schema(content);
  return schema;
};

const enrichModel = async function enrichModel(name, schemaObject) {
  const model = mongoose.model(`${name}`, schemaObject);
  return model;
};

module.exports = { connect, createSchema, enrichModel };
