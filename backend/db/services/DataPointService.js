const DataPoint = require('../dbInit').DataPoint

const create = async (values) => {
  return await DataPoint.create(values)
}

module.exports = { create }