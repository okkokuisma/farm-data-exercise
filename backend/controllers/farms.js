const farmRouter = require('express').Router()
const farmService = require('../db/services/farmService')

farmRouter.get('/', async (request, response) => {
  const farms = await farmService.getAll()
  response.json(farms)
})

farmRouter.delete('/:id', async (request, response) => {
  const farm = await farmService.remove(request.params.id)
  return response.status(204).end()
})

module.exports = farmRouter