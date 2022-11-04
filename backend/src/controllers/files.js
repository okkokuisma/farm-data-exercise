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

  const validRows = await validateCsvFile(request.file.buffer)
  if (!validRows || !validRows.length) {
    return response.status(400).send('Uploaded file contained invalid data.')
  }

  const dataPoints = validRows.map(row => {
    return { farmId, ...row}
  })
  await dataPointService.bulkCreate(dataPoints)

  return response.status(201).end()
})

module.exports = filesRouter