import React from 'react'
import { useSelector } from 'react-redux'
import DataPointTable from './tables/DataPointTable'
import StatsTable from './tables/StatsTable'
import Togglable from './Togglable'

const Farm = ({ farm }) => {
  const data = useSelector(state => state.data.filter(dp => dp.farm.name === farm.name))
  const filteredValues = data
    .reduce((prev, next) => {
      const type = next.metricType.toLowerCase()
      prev[type].push(Number(next.metricValue))
      return prev
    }, {'rainfall': [], 'temperature': [], 'ph': []})

  return (
    <>
      <h1>{ farm.name }</h1>
      <h2>All data</h2>
      <DataPointTable data={ data } />
      <h2>Statistics</h2>
      <Togglable metricType='rainfall'>
        <StatsTable dataHeader='Rainfall' data={filteredValues.rainfall} />
      </Togglable>
      <Togglable metricType='temperature'>
        <StatsTable dataHeader='Temperature' data={filteredValues.temperature} />
      </Togglable>
      <Togglable metricType='pH'>
        <StatsTable dataHeader='pH' data={filteredValues.ph} />
      </Togglable>
    </>
  )
}

export default Farm