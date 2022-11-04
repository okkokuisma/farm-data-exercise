const dataRouter = require('express').Router()
const dataPointService = require('../db/services/dataPointService')

dataRouter.get('/', async (request, response) => {
  const dataPoints = await dataPointService.getStats(request.query)
  return response.json(dataPoints)
})

module.exports = dataRouter