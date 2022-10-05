const { Farm, User } = require('../dbInit')

const getAll = async (query) => {
  let where = {}

  if (query && query.user_id) {
    where.user_id = query.user_id
  }

  return await Farm.paginate(
    {
      include: [{ model: User, as: 'user', attributes: ['username', 'id'] }],
      where,
      limit: 10,
      after: query.after || '',
      before: query.before || ''
    }
  )
}

const getById = async (id) => {
  const farm = await Farm.findByPk(id)

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

  return await Farm.destroy({
    where: { id: farmId }
  })
}

const create = async (values) => {
  return await Farm.create(values)
}

const isOwnedByUser = async ({ farmId, userId }) => {
  const farm = await getById(farmId)
  return (farm.toJSON().userId === userId)
}

module.exports = { create, getById, getAll, remove, isOwnedByUser }