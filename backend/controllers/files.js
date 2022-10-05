const filesRouter = require('express').Router()
const farmService = require('../db/services/farmService')
const dataPointService = require('../db/services/dataPointService')
const validateCsvFile = require('../utils/dataValidator').validateCsvFile

filesRouter.post('/upload', async (request, response) => {
  if (request.file == undefined) {
    return response.status(400).send('Only CSV type files are supported.')
  }

  const farmId = request.body.farmId
  const { id: userId } = request.user
  if (!await farmService.isOwnedByUser({ farmId, userId })) {
    return response.status(401).json({ error: 'unauthorized' })
  }

  const filePath = process.cwd() + '/resources/uploads/' + request.file.filename
  const validRows = await validateCsvFile(filePath)

  if (!validRows || !validRows.length) {
    return response.status(400).send('Uploaded file contained invalid data.')
  }

  const farmInstance = await farmService.getById(farmId)
  const dataPoints = validRows.map(row => {
    return { farmId, ...row}
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