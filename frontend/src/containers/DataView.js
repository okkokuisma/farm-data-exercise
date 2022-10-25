import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DataPointTable from '../components/tables/DataPointTable'
import MetricValueChart from '../components/charts/MetricValueChart'
import { fetchData } from '../reducers/dataReducer'
import { fetchStats, selectFormattedStats } from '../reducers/statReducer'
import useQueryParams from '../hooks/useQueryParams'
import { chartOptions } from '../contants'
import { Filters } from '../styles'
import DateFilter from '../components/filters/DateFilter'
import MetricTypeFilter from '../components/filters/MetricTypeFilter'
import FarmSearchFilter from '../components/filters/FarmSearchFilter'
import TimeIntervalFilter from '../components/filters/TimeIntervalFilter'
import useErrorHandler from '../hooks/useErrorHandler'

const DataView = () => {
  const dispatch = useDispatch()
  const handleError = useErrorHandler()
  const [ queryParams, handleFilterChange, handleSort ] = useQueryParams()
  const data = useSelector(state => state.data)
  const farms = useSelector(state => state.farms)
  const stats = useSelector((state) => selectFormattedStats(state, queryParams.group_by || 'month'))

  useEffect(() => {
    dispatch(fetchData(queryParams))
      .catch((error) => handleError(error))
  }, [queryParams])

  useEffect(() => {
    dispatch(fetchStats({ asc: 'true', ...queryParams }))
      .catch((error) => handleError(error))
  }, [queryParams, farms])

  if (!stats) return null

  return (
    <>
      <h2>Data points</h2>
      <Filters>
        <FarmSearchFilter handleFilterChange={handleFilterChange} />
        <MetricTypeFilter handleFilterChange={handleFilterChange} />
        <DateFilter handleFilterChange={handleFilterChange} />
      </Filters>
      <DataPointTable
        data={data}
        handleFilterChange={handleFilterChange}
        handleSort={handleSort}
      />
      <h2>Stats</h2>
      <Filters>
        <TimeIntervalFilter handleFilterChange={handleFilterChange} />
      </Filters>
      <MetricValueChart options={chartOptions} stats={stats} />
    </>
  )
}

export default DataView
