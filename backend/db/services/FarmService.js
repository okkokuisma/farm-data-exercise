const Farm = require('../dbInit').Farm

const create = async (values) => {
  return await Farm.create(values)
}

module.exports = { create }