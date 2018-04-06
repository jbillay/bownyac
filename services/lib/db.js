const logger = require('./logger')
const mongoose = require('mongoose')

const connect = async function connect(url) {
  try {
    const db = await mongoose.connect(url)
    return db
  } catch (err) {
    logger.log('error', `Unable to connect to the database: ${err}`)
    throw new Error('Unable to connect to the database')
  }
}

module.exports = { connect }
