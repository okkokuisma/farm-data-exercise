const filesRouter = require('express').Router()
const farmService = require('../db/services/farmService')
const dataPointService = require('../db/services/dataPointService')
const validateCsvFile = require('../utils/dataValidator').validateCsvFile

filesRouter.post('/upload', async (request, response) => {
  if (request.file == undefined) {
    return response.status(400).send('Only CSV type files are supported.')
  }

  const filePath = process.cwd() + '/resources/uploads/' + request.file.filename
  const farmId = request.body.farmId
  const validLines = await validateCsvFile(filePath)

  if (!validLines || !validLines.length) {
    return response.status(400).send('Uploaded file contained invalid data.')
  }

  const farmInstance = await farmService.getById(farmId)
  if (!farmInstance) {
    return response.status(404).send('No farms found with the given id.')
  }

  const dataPoints = validLines.map(line => {
    return {
      farmId: farmInstance.id,
      dateTime: line[1],
      metricType: line[2],
      metricValue: line[3],
    }
  })
  const dataPointInstances = await dataPointService.bulkCreate(dataPoints)

  const responseData = dataPointInstances.map(dp => {
    const dataPointValues = dp.dataValues
    const farmValues = farmInstance.dataValues
    return { ...dataPointValues, farm: { ...farmValues } }
  })

  response.json(responseData)
})

module.exports = filesRouter