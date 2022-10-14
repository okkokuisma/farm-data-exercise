const { Farm, User } = require('../dbInit')
const { literal } = require('sequelize')

const getAll = async (query) => {
  let where = {}

  if (query && query.user_id) {
    where.user_id = query.user_id
  }

  return await Farm.findAll(
    {
      attributes: { exclude: ['userId'] },
      include: [
        { model: User, as: 'user', attributes: ['username'] }
      ],
      where
    }
  )
}

const getById = async (id) => {
  const farm = await Farm.findByPk(id, {
    attributes: { exclude: ['userId'], include: [
      [literal('(SELECT MIN(dataPoint.date_time) FROM data_points AS dataPoint WHERE dataPoint.farm_id = farm.id)'), 'earliestDataPoint'],
      [literal('(SELECT MAX(dataPoint.date_time) FROM data_points AS dataPoint WHERE dataPoint.farm_id = farm.id)'), 'latestDataPoint'],
    ] },
    include: [
      { model: User, as: 'user', attributes: ['username'] }
    ],
  })

  if (!farm) {
    const error = new Error('Error: no farm found with the given id')
    error.name = 'NoFarmFoundError'
    throw error
  }

  return farm
}

const remove = async ({ farmId, userId }) => {
  if (!await isOwnedByUser({ farmId, userId })) {
    const error = new Error('unauthorized')
    error.name = 'UnauthorizedActionError'
    throw error
  }

  try {
    return await Farm.destroy({
      where: { id: farmId }
    })
  } catch (error) {
    console.log(error)
  }
}

const create = async (values) => {
  const farm = await Farm.create(values)
  return await getById(farm.toJSON().id)
}

const isOwnedByUser = async ({ farmId, userId }) => {
  const farm = await Farm.findByPk(farmId)
  return (farm.toJSON().userId === userId)
}

module.exports = { create, getById, getAll, remove, isOwnedByUser }