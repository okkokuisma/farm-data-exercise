import React from 'react'
import { useSelector } from 'react-redux'
import DataPointTable from './tables/DataPointTable'
import StatsTable from './tables/StatsTable'

const DataView = () => {
  const data = useSelector(state => state.data)
  const filteredRows = useSelector(state => state.filteredData)
  if (!data.length || !filteredRows.length) {
    return null
  }
  console.log(filteredRows)
  const formattedData = filteredRows
    .reduce((prev, next) => {
      const type = next.metricType.toLowerCase()
      prev[type].push(Number(next.metricValue))
      return prev
    }, {'rainfall': [], 'temperature': [], 'ph': []})

  return (
    <div>
      <DataPointTable data={data} />
      <h2>Statistics</h2>
      <StatsTable data={formattedData} />
    </div>
  )
}

export default DataView
