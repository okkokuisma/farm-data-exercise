const dataRouter = require('express').Router()
const dataPointService = require('../db/services/dataPointService')
const farmService = require('../db/services/farmService')

dataRouter.get('/', async (request, response) => {
  const dataPoints = await dataPointService.getAll(request.query)
  return response.json(dataPoints)
})

dataRouter.post('/', async (request, response) => {
  const { farmId, dateTime, metricType, metricValue } = request.body
  const { id: userId } = request.user

  if (!await farmService.isOwnedByUser({ farmId, userId })) {
    return response.status(401).json({ error: 'unauthorized' })
  }

  const farmInstance = await farmService.getById(request.body.farmId)
  const dataPoint = await dataPointService.create({
    farmId,
    dateTime,
    metricType,
    metricValue
  })

  return response.status(201).json({...dataPoint.dataValues, farm: {...farmInstance.dataValues}})
})

module.exports = dataRouter