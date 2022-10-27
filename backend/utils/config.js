require('dotenv').config()

const POSTGRES_USER = process.env.POSTGRES_USER || 'postgres'
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
const POSTGRES_DB = process.env.POSTGRES_DB || 'postgres'
const DB_HOST = process.env.DB_HOST || 'localhost'
const SECRET = process.env.SECRET
const SERVER_PORT = process.env.SERVER_PORT || 3003

const DB_PORT = process.env.NODE_ENV === 'test'
  ? process.env.TEST_DB_PORT || 5432
  : process.env.DB_PORT

module.exports = {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  DB_HOST,
  DB_PORT,
  SECRET,
  SERVER_PORT
}