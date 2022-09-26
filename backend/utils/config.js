require('dotenv').config()

const POSTGRES_USER = process.env.POSTGRES_USER
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
const POSTGRES_DB = process.env.POSTGRES_DB
const DB_HOST = process.env.DB_HOST
const SECRET = process.env.SECRET
const SERVER_PORT = process.env.SERVER_PORT

const DB_PORT = process.env.NODE_ENV === 'test'
  ? process.env.TEST_DB_PORT
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