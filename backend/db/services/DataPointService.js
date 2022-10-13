const { fn, col } = require('sequelize')

const { DataPoint, Farm } = require('../dbInit')
const { validateDataPointValues, formatDataPointValues } = require('../../utils/dataValidator')
const { parseQueryParams } = require('../../utils/parser')

const getAll = async (query) => {
  const { where, order, orderDirection } = parseQueryParams({...query, type: 'all'})

  try {
    return await DataPoint.paginate({
      include: [{ model: Farm, as: 'farm' }],
      where,
      order: [[order, orderDirection]],
      limit: 10,
      after: query.after || '',
      before: query.before || ''
    })
  } catch (error) {
    console.log(error)
  }
}

const getStats = async (query) => {
  const { where, groupBy, orderDirection } = parseQueryParams({...query, type: 'stat'})
  return await DataPoint.findAll({
    attributes: [
      [fn('date_trunc', groupBy, col('date_time')), 'time'],
      [fn('COUNT', col('dataPoint.id')), 'count'],
      [fn('AVG', col('metric_value')), 'mean'],
      [fn('MIN', col('metric_value')), 'min'],
      [fn('MAX', col('metric_value')), 'max'],
    ],
    include: [{ model: Farm, as: 'farm', attributes: [] }],
    group: ['time'],
    order: [['time', orderDirection]],
    where
  })
}

const create = async ({ farmId, ...values}) => {
  const dataPoint = formatDataPointValues(values)
  if (!validateDataPointValues(dataPoint)) {
    const error = new Error()
    error.name = 'InvalidDataPointValueError'
    throw error
  }
  return await DataPoint.create({ farmId, ...dataPoint })
}

const bulkCreate = async (instances) => {
  return await DataPoint.bulkCreate(instances)
}

module.exports = { create, bulkCreate, getAll, getStats }