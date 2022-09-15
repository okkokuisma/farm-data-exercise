require('dotenv').config()
const connectToDatabase = require('./db/dbInit').connectToDatabase
const app = require('./app')
const http = require('http')
let SERVER_PORT = process.env.SERVER_PORT

const start = async () => {
  await connectToDatabase()
  const server = http.createServer(app)
  server.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`)
  })
}

start()