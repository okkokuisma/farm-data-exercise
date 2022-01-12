import React from 'react'
import { useSelector } from 'react-redux'
import DataPointTable from './tables/DataPointTable'
import StatsTable from './tables/StatsTable'

const Farm = ({ farm }) => {
  const data = useSelector(state => state.data.filter(dp => dp.farm.name === farm.name))


  return (
    <>
      <h1>{ farm.name }</h1>
      <h2>All data</h2>
      <DataPointTable data={ data } />
      <h2>Statistics</h2>
        <StatsTable data={filteredValues} />
    </>
  )
}

export default Farm