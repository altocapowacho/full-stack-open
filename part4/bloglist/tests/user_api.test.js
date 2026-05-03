const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('secret', 10)
  await new User({ username: 'root', name: 'Root', passwordHash }).save()
})

describe('POST /api/users', () => {
  test('creates a fresh user', async () => {
    const before = await helper.usersInDb()

    await api
      .post('/api/users')
      .send({ username: 'newbie', name: 'Newbie', password: 'secret' })
      .expect(201)

    const after = await helper.usersInDb()
    assert.strictEqual(after.length, before.length + 1)
    assert.ok(after.find((u) => u.username === 'newbie'))
  })

  test('rejects username shorter than 3 chars', async () => {
    const res = await api
      .post('/api/users')
      .send({ username: 'ab', name: 'X', password: 'secret' })
      .expect(400)
    assert.match(res.body.error, /username/)
  })

  test('rejects password shorter than 3 chars', async () => {
    const res = await api
      .post('/api/users')
      .send({ username: 'okusername', name: 'X', password: 'ab' })
      .expect(400)
    assert.match(res.body.error, /password/)
  })

  test('rejects duplicate username', async () => {
    await api
      .post('/api/users')
      .send({ username: 'root', name: 'X', password: 'secret' })
      .expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})
