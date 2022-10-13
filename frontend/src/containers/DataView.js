import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useErrorHandler } from 'react-error-boundary'
import { useDispatch } from 'react-redux'

import DataPointTable from '../components/tables/DataPointTable'
import MetricValueChart from '../components/charts/MetricValueChart'
import { fetchData } from '../reducers/dataReducer'
import useQueryParams from '../hooks/useQueryParams'
import { getStats, formatStats } from '../services/statService'
import { chartOptions } from '../contants'
import DataFilters from '../components/inputs/DataFilters'

const DataView = () => {
  const dispatch = useDispatch()
  const handleError = useErrorHandler()
  const data = useSelector(state => state.data)
  const [ stats, setStats ] = useState(null)
  const [ queryParams, handleFilterChange, handleSort ] = useQueryParams()

  useEffect(() => {
    dispatch(fetchData(queryParams))
  }, [queryParams])

  useEffect(() => {
    const labelGroup = queryParams.group_by || 'month'
    getStats({ asc: 'true', ...queryParams })
      .then(stats => setStats(formatStats(stats), labelGroup))
      .catch(error => handleError(error))
  }, [queryParams])

  if (!stats) return null

  return (
    <>
      <h2>Filter data</h2>
      <DataFilters handleFilterChange={handleFilterChange} />
      <h2>Data points</h2>
      <DataPointTable
        data={data}
        handleFilterChange={handleFilterChange}
        handleSort={handleSort}
      />
      <h2>Stats</h2>
      <MetricValueChart options={chartOptions} stats={stats} />
    </>
  )
}

export default DataView
