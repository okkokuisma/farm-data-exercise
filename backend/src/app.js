const express = require('express')
require('express-async-errors')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('node:path')

const { uploadCsvFile, errorHandler, tokenValidator, userExtractor } = require('./utils/middleware')
const filesRouter = require('./controllers/files')
const dataRouter = require('./controllers/data')
const farmRouter = require('./controllers/farms')
const userRouter = require('./controllers/users')
const authRouter = require('./controllers/login')
const statsRouter = require('./controllers/stats')

const app = express()

app.use(express.json())
app.use(cookieParser())

if (process.env.NODE_ENV === 'development') {
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Origin, Content-Type, Accept']
  }))
}

app.use('/api/files', tokenValidator, userExtractor, uploadCsvFile.single('file'), filesRouter)
app.use('/api/data', tokenValidator, userExtractor, dataRouter)
app.use('/api/farms', tokenValidator, userExtractor, farmRouter)
app.use('/api/stats', tokenValidator, userExtractor, statsRouter)
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use(express.static('build'))

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '..', '/build/index.html'))
})

app.use(errorHandler)
app.use((request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
})

module.exports = app