import React from 'react'
import { useSelector } from 'react-redux'
import DataPointTable from './tables/DataPointTable'
import StatsTable from './tables/StatsTable'

const DataView = () => {
  const data = useSelector(state => state.data)
  const filteredRows = useSelector(state => state.filteredData)
  if (!data.length) {
    return null
  }

  return (
    <div>
      <DataPointTable data={data} />
      <StatsTable data={filteredRows} />
    </div>
  )
}

export default DataView
