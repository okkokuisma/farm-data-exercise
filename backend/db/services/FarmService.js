const Farm = require('../dbInit').Farm

const getById = async (id) => {
  return await Farm.findOne({
    where: { id: id }
  })
}

const create = async (values) => {
  return await Farm.create(values)
}

module.exports = { create, getById }