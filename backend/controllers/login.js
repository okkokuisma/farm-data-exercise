const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginRouter = require('express').Router()
const userService = require('../db/services/userService')
const { SECRET } = require('../utils/config')

loginRouter.post('/login', async (request, response) => {
  const body = request.body

  const user = await userService.getByUsername(body.username)
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      message: 'invalid username or password',
      type: 'InvalidAuthenticationError'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const tokenExpiry = new Date(Date.now() + 1800000)
  const token = jwt.sign(userForToken, SECRET, { expiresIn: 1800 })

  response
    .status(200)
    .cookie('access_token', token, {
      expires: tokenExpiry,
      httpOnly: true,
      path: '/api',
      // sameSite: 'none',
      // secure: true
    })
    .send({ tokenExpiry, username: user.username })
})

module.exports = loginRouter