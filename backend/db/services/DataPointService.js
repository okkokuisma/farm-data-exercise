const DataPoint = require('../dbInit').DataPoint

const create = async (values) => {
  return await DataPoint.create(values)
}

const bulkCreate = async (instances) => {
  return await DataPoint.bulkCreate(instances)
}

module.exports = { create, bulkCreate }