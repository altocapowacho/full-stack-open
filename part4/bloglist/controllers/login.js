const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

router.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const valid =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!valid) {
    return res.status(401).json({ error: 'invalid username or password' })
  }

  const tokenPayload = { username: user.username, id: user._id }
  const token = jwt.sign(tokenPayload, config.SECRET, { expiresIn: '7d' })

  res.json({ token, username: user.username, name: user.name })
})

module.exports = router
