const farmRouter = require('express').Router()
const farmService = require('../db/services/farmService')

farmRouter.get('/', async (request, response) => {
  const farms = await farmService.getAll()
  response.json(farms)
})

farmRouter.post('/', async (request, response) => {
  const body = request.body
  const farm = await farmService.create({ name: body.name })
  response.json(farm)
})

farmRouter.delete('/:id', async (request, response) => {
  await farmService.remove(request.params.id)
  return response.status(204).end()
})

module.exports = farmRouter