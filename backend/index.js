require('dotenv').config()
const connectToDatabase = require('./db/dbInit').connectToDatabase
const app = require('./app')
const http = require('http')
let PORT = process.env.PORT

const start = async () => {
  await connectToDatabase()
  const server = http.createServer(app)
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()