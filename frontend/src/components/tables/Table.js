import React from 'react'
import { StyledTable, TableCell, TableHead } from '../../styles'
// import { min, max, mean, median } from 'simple-statistics'

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

const TableBody = ({ rows }) => {
  return (
    <tbody>
      {rows.map((values, i) => (
        <TableRow key={i} values={values} />
      ))}
    </tbody>
  )
}

const Header = ({ title, ...props }) => {
  return (
    <TableCell as='th' {...props}>
      {title}
    </TableCell>
  )
}

const HeaderRow = ({ headers }) => {
  return (
    <TableHead>
      <tr>
        {headers.map((header, i) => (
          <Header key={i} {...header} />
        ))}
      </tr>
    </TableHead>
  )
}

const Table = ({ rows, headers }) => {
  if (!rows) return null

  // const dataByMetricType = data
  //   .reduce((prev, next) => {
  //     const type = next.metricType.toLowerCase()
  //     prev[type].push(Number(next.metricValue))
  //     return prev
  //   }, {'rainfall': [], 'temperature': [], 'ph': []})

  // const stats = Object.keys(dataByMetricType)
  //   .reduce((prev, metricType) => {
  //     return !dataByMetricType[metricType].length
  //       ? prev
  //       : [ ...prev, [
  //         metricType,
  //         dataByMetricType[metricType].length,
  //         min(dataByMetricType[metricType]),
  //         max(dataByMetricType[metricType]),
  //         mean(dataByMetricType[metricType]),
  //         median(dataByMetricType[metricType])
  //       ]]
  //   }, [])

  return (
    <>
      <StyledTable>
        <HeaderRow headers={headers} />
        <TableBody rows={rows} />
      </StyledTable>
    </>
  )
}

export default Table