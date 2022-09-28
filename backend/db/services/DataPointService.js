const { Op } = require('sequelize')

const { DataPoint } = require('../dbInit')
const { Farm } = require('../dbInit')
const { validateDataPointValues, formatDateTime } = require('../../utils/dataValidator')

const getAll = async (query) => {
  let where = {}
  let order = ['id']

  if (query && query.search) {
    where['$farm.name$'] = {
      [Op.iLike]:  `%${query.search}%`
    }
  }

  if (query && query.metricType) {
    where.metricType = query.metricType
  }

  if (query && query.from && query.to) {
    if (!Number.isNaN(Date.parse(query.from) && !Number.isNaN(Date.parse(query.to)))) {
      const startDate = new Date(query.from)
      const endDate = new Date(query.to)
      where.createdAt = {
        [Op.between]:  [startDate, endDate]
      }
    }
  } else if (query && query.from) {
    if (!Number.isNaN(Date.parse(query.from))) {
      const startDate = new Date(query.from)
      where.createdAt = {
        [Op.gte]:  startDate
      }
    }
  } else if (query && query.to) {
    if (!Number.isNaN(Date.parse(query.to))) {
      const endDate = new Date(query.to)
      where.createdAt = {
        [Op.lte]:  endDate
      }
    }
  }

  if (query && query.sort_by) {
    if ([ 'metricValue', 'dateTime' ].includes(query.sort_by)) {
      const orderBy = query.order_by && query.order_by.toUpperCase() === 'ASC'
        ? 'ASC'
        : 'DESC'

      order = [ query.sort_by, orderBy ]
    }
  }

  try {
    return await DataPoint.paginate({
      include: [{ model: Farm, as: 'farm' }],
      where,
      order: [order],
      limit: 20
    })
  } catch (error) {
    console.log(error)
  }

}

const create = async (values) => {
  const { dateTime, metricType, metricValue } = values

  if (!validateDataPointValues({ dateTime, metricType, metricValue })) {
    const error = new Error()
    error.name = 'InvalidDataPointValueError'
    throw error
  }

  const formattedDate = formatDateTime(dateTime)

  return await DataPoint.create({ dateTime: formattedDate, ...values })
}

const bulkCreate = async (instances) => {
  return await DataPoint.bulkCreate(instances)
}

module.exports = { create, bulkCreate, getAll }