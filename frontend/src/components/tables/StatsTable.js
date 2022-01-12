import React from 'react'
import { StatTable, TableCell, TableHead } from '../../styles'
import { min, max, mean, median } from 'simple-statistics'

const TableRow = ({values}) => {
  return (
    <tr>
      <TableCell as='td'>
        {values[0]}
      </TableCell>
      <TableCell as='td'>
        {values[1]}
      </TableCell>
      <TableCell as='td'>
        {values[2]}
      </TableCell>
      <TableCell as='td'>
        {values[3]}
      </TableCell>
      <TableCell as='td'>
        {values[4]}
      </TableCell>
    </tr>
  )
}

const StatsTable = ({ data }) => {
  if (!data) return null
  const stats = Object.keys(data)
    .reduce((prev, metricType) => {
      return !data[metricType].length
        ? prev
        : [ ...prev, [metricType, min(data[metricType]), max(data[metricType]), mean(data[metricType]), median(data[metricType])] ]
    }, [])
  console.log(stats)

  return (
    <>
      <StatTable>
        <TableHead>
          <tr>
            <TableCell as='th'>
              Metric type
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