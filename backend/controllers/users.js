const usersRouter = require('express').Router()
const userService = require('../db/services/userService')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await userService.create(body)

  response.json({username: user.username})
})

module.exports = usersRouter