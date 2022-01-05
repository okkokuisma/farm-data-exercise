const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const filesRouter = require('./controllers/files')

app.use(cors())
app.use(express.json())

app.use('/api/files', middleware.uploadCsvFile.single('file'), filesRouter)

module.exports = app