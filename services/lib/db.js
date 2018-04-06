const debug = require('debug')('services:server:db');
const mongoose = require('mongoose');

const connect = async function connect(url) {
  try {
    const db = await mongoose.connect(url);
    return db;
  } catch (err) {
    debug(`Unable to connect to the database: ${err}`);
    throw new Error('Unable to connect to the database');
  }
};

module.exports = { connect };
