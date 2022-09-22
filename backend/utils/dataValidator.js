const fs = require('fs')
const csv = require('fast-csv')

const passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')

const validateCsvFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const validLines = []
    fs.createReadStream(filePath, 'utf8')
      .pipe(csv.parse())
      .on('error', reject)
      .on('data', row => {
        if (validateCsvRow(row)) {
          validLines.push(row)
        }
      })
      .on('end', () => {
        resolve(validLines)
      })
  })
}

const validateCsvRow = (values) => {
  const metricType = values[2].toLowerCase()
  const metricValue = Number(values[3])

  switch (metricType) {
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

const validatePassword = (password) => {
  return password && passwordRegex.test(password)
}

module.exports = { validateCsvFile, validateCsvRow, validatePassword }
