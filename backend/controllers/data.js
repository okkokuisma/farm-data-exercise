const dataRouter = require('express').Router()
const dataPointService = require('../db/services/dataPointService')
const farmService = require('../db/services/farmService')

dataRouter.get('/', async (request, response) => {
  const dataPoints = await dataPointService.getAll(request.query)
  return response.json(dataPoints)
})

dataRouter.post('/', async (request, response) => {
  const farmInstance = await farmService.getById(request.body.farmId)
  const body = request.body
  const dataPoint = await dataPointService.create({
    farmId: farmInstance.id,
    dateTime: body.dateTime,
    metricType: body.metricType,
    metricValue: body.metricValue
  })

  return response.status(201).json({...dataPoint.dataValues, farm: {...farmInstance.dataValues}})
})

module.exports = dataRouter