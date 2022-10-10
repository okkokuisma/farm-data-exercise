const { Op } = require('sequelize')
const { validateDateTime } = require('./dataValidator')

const parseQueryParamDateTime = (query, where) => {
  if (query.from && query.to) {
    if (validateDateTime(query.from) && validateDateTime(query.to)) {
      const startDate = new Date(query.from)
      const endDate = new Date(query.to)
      where.dateTime = {
        [Op.between]:  [startDate, endDate]
      }
    }
  } else if (query.from) {
    if (validateDateTime(query.from)) {
      const startDate = new Date(query.from)
      where.dateTime = {
        [Op.gte]:  startDate
      }
    }
  } else if (query.to) {
    if (validateDateTime(query.to)) {
      const endDate = new Date(query.to)
      where.dateTime = {
        [Op.lte]:  endDate
      }
    }
  }
  return where
}

const parseQueryParamMetricType = (query, where) => {
  if (query.metricType) {
    where.metricType = query.metricType
  }
  return where
}

const parseQueryParamFarmSearch = (query, where) => {
  if (query.search) {
    where['$farm.name$'] = {
      [Op.iLike]:  `%${query.search}%`
    }
  }
  return where
}

const parseQueryParams = (query) => {
  let where = {}
  let queryParams = { where }
  where = parseQueryParamFarmSearch(query, where)
  where = parseQueryParamMetricType(query, where)
  where = parseQueryParamDateTime(query, where)

  if (query.type === 'stat') {
    queryParams = query.group_by && ['year', 'month', 'day'].includes(query.group_by)
      ? { ...queryParams, groupBy: query.group_by, order: query.group_by }
      : { ...queryParams, groupBy: 'month', order: 'month' }
  }

  if (query.type === 'all') {
    queryParams = query.order_by && [ 'id', 'metricValue', 'dateTime' ].includes(query.order_by)
      ? { ...queryParams, order: query.order_by }
      : { ...queryParams, order: 'id' }
  }

  queryParams.orderDirection = query.asc && query.asc.toLowerCase() === 'true'
    ? 'ASC'
    : 'DESC'

  return queryParams
}

module.exports = { parseQueryParams }