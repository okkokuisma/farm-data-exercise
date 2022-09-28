import React from 'react'
import { StatTable, TableCell, TableHead } from '../../styles'
import { min, max, mean, median } from 'simple-statistics'

const TableRow = ({ values }) => {
  return (
    <tr>
      {values.map((value, i) => (
        <TableCell key={i} as='td'>
          {value}
        </TableCell>
      ))}
    </tr>
  )
}

const StatsTable = ({ data }) => {
  if (!data) return null

  const dataByMetricType = data
    .reduce((prev, next) => {
      const type = next.metricType.toLowerCase()
      prev[type].push(Number(next.metricValue))
      return prev
    }, {'rainfall': [], 'temperature': [], 'ph': []})

  const stats = Object.keys(dataByMetricType)
    .reduce((prev, metricType) => {
      return !dataByMetricType[metricType].length
        ? prev
        : [ ...prev, [
          metricType,
          dataByMetricType[metricType].length,
          min(dataByMetricType[metricType]),
          max(dataByMetricType[metricType]),
          mean(dataByMetricType[metricType]),
          median(dataByMetricType[metricType])
        ]]
    }, [])

  return (
    <>
      <StatTable>
        <TableHead>
          <tr>
            <TableCell as='th'>
              Metric type
            </TableCell>
            <TableCell as='th'>
              Data points
            </TableCell>
            <TableCell as='th'>
              Min
            </TableCell>
            <TableCell as='th'>
              Max
            </TableCell>
            <TableCell as='th'>
              Mean
            </TableCell>
            <TableCell as='th'>
              Median
            </TableCell>
          </tr>
        </TableHead>

        <tbody>
          {stats.map((metricType, i) => (
            <TableRow key={i} values={metricType} />
          ))}
        </tbody>
      </StatTable>
    </>
  )
}

export default StatsTable