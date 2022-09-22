const Farm = require('../dbInit').Farm

const getAll = async () => {
  return await Farm.findAll()
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

const remove = async (id) => {
  return await Farm.destroy({
    where: { id: id }
  })
}

const create = async (values) => {
  return await Farm.create(values)
}

module.exports = { create, getById, getAll, remove }