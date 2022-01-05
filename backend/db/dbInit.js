const Sequelize = require("sequelize")
const password = process.env.POSTGRES_PASSWORD
const DB_CONNECTION_RETRY_LIMIT = 10;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const username = process.env.POSTGRES_USERNAME
  ? process.env.POSTGRES_USERNAME
  : "postgres"

const sequelize = new Sequelize("postgres", username, password, {
  dialect: "postgres",
  host: process.env.DB_HOST || "localhost",
  logging: false,
})

const DataPoint = require("./models/DataPoint")(sequelize, Sequelize.DataTypes)
const Farm = require("./models/Farm")(sequelize, Sequelize.DataTypes)

const connectToDatabase = async (attempt = 0) => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log("Connected to database")
  }
  catch (e) {
    if (attempt === DB_CONNECTION_RETRY_LIMIT) {
      console.log(`Connection to database failed after ${attempt} attempts`)
      process.exit(1)
    }

    console.log(
      `Connection to database failed! Attempt ${attempt} of ${DB_CONNECTION_RETRY_LIMIT}`,
    )

    await sleep(3000);
    connectToDatabase(attempt + 1)
  }
}

module.exports = { connectToDatabase, DataPoint, Farm }