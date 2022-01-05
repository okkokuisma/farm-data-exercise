require("dotenv").config()
const validator = require('./services/dataValidator')
const { connectToDatabase } = require('./db/dbInit')
const { create } = require('./db/services/DataPointService')

const start = async () => {
  await connectToDatabase()
  const output = await validator.validateCsvFile('data.csv')
  await Promise.all(output.map(async dataPoint => {
    await create({
      farm_id: 1,
      date_time: dataPoint[1],
      metric_type: dataPoint[2],
      metric_value: dataPoint[3],
    })
  }))
}

start()