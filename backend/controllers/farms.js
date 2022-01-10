const farmRouter = require('express').Router()
const farmService = require('../db/services/farmService')

farmRouter.get('/', async (request, response) => {
  const farms = await farmService.getAll()
  response.json(farms)
})

module.exports = farmRouter