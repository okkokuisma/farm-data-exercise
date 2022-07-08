const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const userService = require('../db/services/userService')

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.password || body.password.length < 3) {
    response.status(400).send({ error: 'malformatted password' })
  }
  const saltRounds = 10
  const hashed = await bcrypt.hash(body.password, saltRounds)

  const user = await userService.create({
    username: body.username,
    passwordHash: hashed
  })

  response.json({username: user.username})
})

module.exports = usersRouter