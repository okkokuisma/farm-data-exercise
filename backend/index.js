require('dotenv').config()
const connectToDatabase = require('./db/dbInit').connectToDatabase
const app = require('./app')
const http = require('http')
let PORT = process.env.PORT

const start = async () => {
  await connectToDatabase()
  const server = http.createServer(app)
  console.log(PORT)
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()