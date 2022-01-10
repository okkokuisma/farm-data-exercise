const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const filesRouter = require('./controllers/files')
const dataRouter = require('./controllers/data')
const farmRouter = require('./controllers/farms')

app.use(cors())
app.use(express.json())

app.use('/api/files', middleware.uploadCsvFile.single('file'), filesRouter)
app.use('/api/data', dataRouter)
app.use('/api/farms', farmRouter)

app.use((request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
})

module.exports = app