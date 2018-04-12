const { createLogger, format, transports } = require('winston')

const create = function create(config) {
  const logger = createLogger({
    level: config.logLevel,
    format: format.json(),
    transports: [
      new transports.File({ filename: 'log/error.log', level: 'error' }),
      new transports.File({ filename: 'log/combined.log' })
    ]
  })

  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new transports.Console({
        format: format.simple()
      })
    )
  }
  return logger
}

module.exports = config => create(config)
