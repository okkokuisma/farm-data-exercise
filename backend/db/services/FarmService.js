const Farm = require('../dbInit').Farm

const getAll = async () => {
  return await Farm.findAll()
}

const getById = async (id) => {
  return await Farm.findOne({
    where: { id: id }
  })
}

const create = async (values) => {
  return await Farm.create(values)
}

module.exports = { create, getById, getAll }