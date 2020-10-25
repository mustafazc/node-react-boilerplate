const { createLogger, format, transports } = require('winston')

const logger = createLogger({
  // change level if in dev environment versus production
  // format: format.json(),
  format: format.combine(
    format.timestamp({
      format: 'HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({ // Comment this to show no logs in console
      // format: format.json()
      level: 'debug',
      format: format.combine(
        format.colorize(),
        format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    })
  ]
})

module.exports = logger
