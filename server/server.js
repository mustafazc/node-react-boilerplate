'use strict'
require('dotenv').config()

const express = require('express')
const http = require('http')
const chalk = require('chalk')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const router = require('./routes/index.js')
const logger = require('./services/LoggingService')

const app = express()

app.use(morgan((tokens, req, res) => {
  logger.verbose(`${chalk.blue(tokens.method(req, res))} ${chalk.white.dim(tokens.url(req, res))} ${chalk.green(tokens.status(req, res))} ${chalk.green(`${tokens['response-time'](req, res)}ms`)} ${chalk.cyan(tokens.date(req, res))}`)
}))

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', router)

const httpServer = http.createServer(app)

const port = process.env.PORT
httpServer.listen(port, () => logger.info(`Server running on port ${port}`))

process.on('SIGINT', () => { // handle shutting down
  logger.info('Shutting down app')

  // Stops the server from accepting new connections and finishes existing connections.
  httpServer.close()
})
