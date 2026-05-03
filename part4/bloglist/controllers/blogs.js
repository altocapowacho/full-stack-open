const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (_req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

router.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('user', {
    username: 1,
    name: 1,
  })
  if (blog) res.json(blog)
  else res.status(404).end()
})

router.post('/', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const { title, author, url, likes } = req.body

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes ?? 0,
    user: req.user._id,
  })

  const saved = await blog.save()

  req.user.blogs = req.user.blogs.concat(saved._id)
  await req.user.save()

  await saved.populate('user', { username: 1, name: 1 })
  res.status(201).json(saved)
})

router.delete('/:id', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(req.params.id)
  if (!blog) return res.status(204).end()

  if (blog.user?.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ error: 'only the creator can delete this blog' })
  }

  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

router.put('/:id', async (req, res) => {
  const { title, author, url, likes } = req.body
  const updated = await Blog.findByIdAndUpdate(
    req.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' },
  ).populate('user', { username: 1, name: 1 })

  if (updated) res.json(updated)
  else res.status(404).end()
})

module.exports = router
