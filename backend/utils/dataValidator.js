const fs = require('fs')
const csv = require('fast-csv')
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')

const validateCsvFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const validRows = []
    fs.createReadStream(filePath, 'utf8')
      .pipe(csv.parse())
      .on('error', () => {
        const error = new Error()
        error.name = 'InvalidFileUploadError'
        reject(error)
      })
      .on('data', row => {
        const [, dateTime, metricType, metricValue] = row
        const dataPoint = formatDataPointValues({ dateTime, metricType, metricValue })
        if (validateDataPointValues(dataPoint)) {
          validRows.push(dataPoint)
        }
      })
      .on('end', () => {
        resolve(validRows)
      })
  })
}

const formatDataPointValues = ({ dateTime, metricType, metricValue }) => {
  return {
    dateTime: formatDateTime(dateTime),
    metricType,
    metricValue: Number.parseFloat(metricValue)
  }
}

const validateDataPointValues = ({ dateTime, metricType, metricValue }) => {
  return validateMetricType(metricType)
    && validateMetricValue(metricType, metricValue)
    && validateDateTime(dateTime)
}

const validateMetricValue = (metricType, metricValue) => {
  if (isNaN(metricValue)) {
    return false
  }

  switch (metricType.toLowerCase()) {
  case 'rainfall':
    return (metricValue >= 0 && metricValue <= 500)
  case 'temperature':
    return (metricValue >= -50 && metricValue <= 100)
  case 'ph':
    return (metricValue >= 0 && metricValue <= 14)
  default:
    return false
  }
}

const validateMetricType = (value) => {
  return (typeof value === 'string' || value instanceof String)
}

const validateDateTime = (value) => {
  return dayjs(value).isValid()
}

const formatDateTime = (date) => {
  return dayjs(date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
}

const validatePassword = (password) => {
  return password && passwordRegex.test(password)
}

module.exports = {
  validateCsvFile,
  validateDataPointValues,
  validatePassword,
  formatDataPointValues,
  validateDateTime
}
