const Sequelize = require('sequelize')
const { Umzug, SequelizeStorage } = require('umzug')

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  DB_HOST,
  DB_PORT } = require('../utils/config')
const DB_CONNECTION_RETRY_LIMIT = 10

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const sequelize = new Sequelize(
  `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}`,
  { logging: true }
)

const DataPoint = require('./models/DataPoint')(sequelize, Sequelize.DataTypes)
const Farm = require('./models/Farm')(sequelize, Sequelize.DataTypes)
const User = require('./models/User')(sequelize, Sequelize.DataTypes)

User.hasMany(Farm)
Farm.belongsTo(User)
Farm.hasMany(DataPoint, {
  onDelete: 'CASCADE',
})
DataPoint.belongsTo(Farm, {
  onDelete: 'CASCADE',
})

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

const emptyDatabase = async () => {
  if (process.env.NODE_ENV === 'test') {
    await sequelize.sync({ force: true })
  } else {
    throw new Error('function called to empty database while not in test mode')
  }
}

module.exports = {
  connectToDatabase,
  rollbackMigration,
  emptyDatabase,
  DataPoint,
  Farm,
  User
}