const DataPoint = require('../dbInit').DataPoint
const Farm = require('../dbInit').Farm

const getAll = async () => {
  return await DataPoint.paginate({ include: Farm })
}

const create = async (values) => {
  return await DataPoint.create(values)
}

const bulkCreate = async (instances) => {
  return await DataPoint.bulkCreate(instances)
}

module.exports = { create, bulkCreate, getAll }