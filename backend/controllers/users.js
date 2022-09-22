const bcrypt = require('bcrypt')

const usersRouter = require('express').Router()
const userService = require('../db/services/userService')
const { validatePassword } = require('../utils/dataValidator')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!validatePassword(body.password)) {
    const error = new Error()
    error.name = 'MalformattedPasswordError'
    throw error
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