require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const Person = require('./models/person')
const config = require('./utils/config')
const logger = require('./utils/logger')
const { unknownEndpoint, errorHandler } = require('./utils/middleware')

const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

morgan.token('body', (req) =>
  req.method === 'POST' || req.method === 'PUT' ? JSON.stringify(req.body) : '',
)
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body'),
)

app.get('/api/persons', (_req, res, next) => {
  Person.find({})
    .then((persons) => res.json(persons))
    .catch(next)
})

app.get('/info', (_req, res, next) => {
  Person.countDocuments({})
    .then((count) => {
      res.send(
        `<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`,
      )
    })
    .catch(next)
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) res.json(person)
      else res.status(404).end()
    })
    .catch(next)
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(next)
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body
  if (!name || !number) {
    return res.status(400).json({ error: 'name and number are required' })
  }

  const person = new Person({ name, number })
  person
    .save()
    .then((saved) => res.status(201).json(saved))
    .catch(next)
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' },
  )
    .then((updated) => {
      if (updated) res.json(updated)
      else res.status(404).end()
    })
    .catch(next)
})

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
