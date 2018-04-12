const mongoose = require('mongoose')

const connect = async function connect(url, logger) {
  try {
    await mongoose.connect(url)
  } catch (err) {
    logger.log('error', `Unable to connect to the database: ${err}`)
    throw new Error('Unable to connect to the database')
  }
}

const disconnect = function disconnect() {
  mongoose.connection.close()
}

module.exports = { connect, disconnect }
