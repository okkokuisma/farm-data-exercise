const express = require('express')
require('express-async-errors')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const { uploadCsvFile, errorHandler, tokenValidator, userExtractor } = require('./utils/middleware')
const filesRouter = require('./controllers/files')
const dataRouter = require('./controllers/data')
const farmRouter = require('./controllers/farms')
const userRouter = require('./controllers/users')
const authRouter = require('./controllers/login')

const app = express()

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Origin, Content-Type, Accept']
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/files', uploadCsvFile.single('file'), filesRouter)
app.use('/api/data', tokenValidator, userExtractor, dataRouter)
app.use('/api/farms', tokenValidator, userExtractor, farmRouter)
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)

app.use(errorHandler)
app.use((request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
})

module.exports = app