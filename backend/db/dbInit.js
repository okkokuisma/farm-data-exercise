const Sequelize = require('sequelize')
const { Umzug, SequelizeStorage } = require('umzug')

const DB_CONNECTION_RETRY_LIMIT = 10
const username = process.env.POSTGRES_USER
const password = process.env.POSTGRES_PASSWORD
const database = process.env.POSTGRES_DB
const host = process.env.DB_HOST
const port = process.env.DB_PORT

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// const sequelize = new Sequelize('postgres', username, password, {
//   dialect: 'postgres',
//   host: process.env.DB_HOST || 'localhost',
//   logging: false,
// })
console.log(`postgres://${username}:${password}@${host}:${port}/${database}`)
const sequelize = new Sequelize(`postgres://${username}:${password}@${host}:${port}/${database}`)

const DataPoint = require('./models/DataPoint')(sequelize, Sequelize.DataTypes)
const Farm = require('./models/Farm')(sequelize, Sequelize.DataTypes)
const User = require('./models/User')(sequelize, Sequelize.DataTypes)

Farm.hasMany(DataPoint)
DataPoint.belongsTo(Farm)

const connectToDatabase = async (attempt = 0) => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('Connected to database')
  }
  catch (e) {
    if (attempt === DB_CONNECTION_RETRY_LIMIT) {
      console.log(`Connection to database failed after ${attempt} attempts`)
      process.exit(1)
    }

    console.log(
      `Connection to database failed! Attempt ${attempt} of ${DB_CONNECTION_RETRY_LIMIT}`,
    )

    await sleep(3000)
    connectToDatabase(attempt + 1)
  }
}

const migrationConf = {
  migrations: {
    glob: 'db/migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}

const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}

module.exports = { connectToDatabase, rollbackMigration, DataPoint, Farm, User }