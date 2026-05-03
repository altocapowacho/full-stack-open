const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

let token
let testUser

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('secret', 10)
  testUser = await new User({ username: 'tester', name: 'Tester', passwordHash }).save()

  const loginRes = await api
    .post('/api/login')
    .send({ username: 'tester', password: 'secret' })
  token = loginRes.body.token

  const blogsWithUser = helper.initialBlogs.map(
    (b) => new Blog({ ...b, user: testUser._id }),
  )
  await Promise.all(blogsWithUser.map((b) => b.save()))
})

describe('GET /api/blogs', () => {
  test('returns all blogs as json', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(res.body.length, helper.initialBlogs.length)
  })

  test('blog identifier is named id, not _id', async () => {
    const res = await api.get('/api/blogs')
    assert.ok(res.body[0].id)
    assert.strictEqual(res.body[0]._id, undefined)
  })
})

describe('POST /api/blogs', () => {
  test('creates a new blog when token is valid', async () => {
    const newBlog = {
      title: 'New post',
      author: 'Me',
      url: 'https://example.com/new',
      likes: 3,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    assert.strictEqual(blogs.length, helper.initialBlogs.length + 1)
    assert.ok(blogs.find((b) => b.title === 'New post'))
  })

  test('fails with 401 when no token provided', async () => {
    await api
      .post('/api/blogs')
      .send({ title: 't', url: 'u' })
      .expect(401)
  })

  test('likes defaults to 0 when missing', async () => {
    const res = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'No likes', url: 'https://example.com/x' })
      .expect(201)
    assert.strictEqual(res.body.likes, 0)
  })

  test('fails with 400 when title is missing', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({ url: 'https://example.com/y' })
      .expect(400)
  })

  test('fails with 400 when url is missing', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'no url' })
      .expect(400)
  })
})

describe('DELETE /api/blogs/:id', () => {
  test('removes blog when caller is creator', async () => {
    const before = await helper.blogsInDb()
    const target = before[0]

    await api
      .delete(`/api/blogs/${target.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const after = await helper.blogsInDb()
    assert.strictEqual(after.length, before.length - 1)
  })
})

describe('PUT /api/blogs/:id', () => {
  test('updates likes', async () => {
    const before = await helper.blogsInDb()
    const target = before[0]

    const res = await api
      .put(`/api/blogs/${target.id}`)
      .send({ ...target, likes: target.likes + 100 })
      .expect(200)

    assert.strictEqual(res.body.likes, target.likes + 100)
  })
})

after(async () => {
  await mongoose.connection.close()
})
