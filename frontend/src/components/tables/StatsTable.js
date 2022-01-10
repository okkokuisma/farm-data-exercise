import React from 'react'
import { StatTable, TableCell, TableHead } from '../../styles'
import { min, max, mean, median } from 'simple-statistics'

const StatsTable = ({ dataHeader, data }) => {
  const minValue = min(data)
  const maxValue = max(data)
  const meanValue = mean(data)
  const medianValue = median(data)

  return (
    <>
      <h3>{dataHeader}</h3>
      <StatTable>
        <TableHead>
          <tr>
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
          <tr>
            <TableCell as='td'>
              {minValue}
            </TableCell>
            <TableCell as='td'>
              {maxValue}
            </TableCell>
            <TableCell as='td'>
              {meanValue}
            </TableCell>
            <TableCell as='td'>
              {medianValue}
            </TableCell>
          </tr>
        </tbody>
      </StatTable>
    </>
  )
}

export default StatsTable