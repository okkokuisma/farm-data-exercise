const dataRouter = require('express').Router()
const dataPointService = require('../db/services/dataPointService')
const farmService = require('../db/services/farmService')

dataRouter.get('/', async (request, response) => {
  const dataPoints = await dataPointService.getAll()
  response.json(dataPoints)
})

dataRouter.post('/', async (request, response) => {
  const farmInstance = await farmService.getById(request.body.farmId)

  if (!farmInstance) {
    return response.status(404).send('No farms found with the given id.')
  }
  const body = request.body
  const dataPoint = await dataPointService.create({
    farmId: farmInstance.id,
    dateTime: body.dateTime,
    metricType: body.metricType,
    metricValue: body.metricValue
  })

  response.status(201).json(dataPoint)
})

module.exports = dataRouter