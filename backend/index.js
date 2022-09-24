const http = require('http')

const { connectToDatabase } = require('./db/dbInit')
const app = require('./app')
const { SERVER_PORT } = require('./utils/config')

const start = async () => {
  await connectToDatabase()
  const server = http.createServer(app)
  server.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`)
  })
}

start()