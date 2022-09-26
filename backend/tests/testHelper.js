const mapDataValueRows = (data) => {
  return data.map((row) => {
    const [, dateTime, metricType, metricValue] = row
    return { dateTime, metricType, metricValue }
  })
}

module.exports = { mapDataValueRows }