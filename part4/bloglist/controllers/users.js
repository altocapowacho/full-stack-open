const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.get('/', async (_req, res) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  })
  if (user) res.json(user)
  else res.status(404).end()
})

router.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if (!username || username.length < 3) {
    return res
      .status(400)
      .json({ error: 'username must be at least 3 characters' })
  }
  if (!password || password.length < 3) {
    return res
      .status(400)
      .json({ error: 'password must be at least 3 characters' })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({ username, name, passwordHash })
  const saved = await user.save()
  res.status(201).json(saved)
})

module.exports = router
