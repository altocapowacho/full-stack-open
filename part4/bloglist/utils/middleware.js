const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('./config')
const logger = require('./logger')

const requestLogger = (req, _res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

const tokenExtractor = (req, _res, next) => {
  const auth = req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    req.token = auth.substring(7)
  } else {
    req.token = null
  }
  next()
}

const userExtractor = async (req, _res, next) => {
  if (!req.token) {
    req.user = null
    return next()
  }
  try {
    const decoded = jwt.verify(req.token, config.SECRET)
    if (!decoded?.id) {
      req.user = null
      return next()
    }
    req.user = await User.findById(decoded.id)
  } catch {
    req.user = null
  }
  next()
}

const unknownEndpoint = (_req, res) =>
  res.status(404).send({ error: 'unknown endpoint' })

const errorHandler = (error, _req, res, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key')
  ) {
    return res
      .status(400)
      .json({ error: 'expected `username` to be unique' })
  }
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'token invalid' })
  }
  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' })
  }

  next(error)
}

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler,
}
