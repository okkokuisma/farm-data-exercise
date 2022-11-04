const farmRouter = require('express').Router()
const farmService = require('../db/services/farmService')

farmRouter.get('/', async (request, response) => {
  const farms = await farmService.getAll(request.query)
  response.json(farms)
})

farmRouter.get('/:id', async (request, response) => {
  const farm = await farmService.getById(request.params.id)
  response.status(200).json(farm)
})

farmRouter.post('/', async (request, response) => {
  const user = request.user
  const body = request.body
  const farm = await farmService.create({ ...body, userId: user.id })
  response.json(farm)
})

farmRouter.delete('/:id', async (request, response) => {
  const user = request.user
  await farmService.remove({ farmId: request.params.id, userId: user.id})
  return response.status(204).end()
})

module.exports = farmRouter