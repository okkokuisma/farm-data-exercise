import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DataPointTable from '../components/tables/DataPointTable'
import MetricValueChart from '../components/charts/MetricValueChart'
import { fetchData } from '../reducers/dataReducer'
import { fetchStats, selectFormattedStats } from '../reducers/statReducer'
import useQueryParams from '../hooks/useQueryParams'
import { chartOptions } from '../contants'
import { StyledDivContainer } from '../styles'
// import TimeIntervalFilter from '../components/filters/TimeIntervalFilter'
import useErrorHandler from '../hooks/useErrorHandler'

const DataView = () => {
  const dispatch = useDispatch()
  const handleError = useErrorHandler()
  const [ tableQueryParams, handleTableFilterChange, handleTableSort ] = useQueryParams()
  const [ chartQueryParams, handleChartFilterChange ] = useQueryParams()
  const data = useSelector(state => state.data)
  const farms = useSelector(state => state.farms)
  const stats = useSelector((state) => selectFormattedStats(state, chartQueryParams.group_by || 'month'))

  useEffect(() => {
    dispatch(fetchData(tableQueryParams))
      .catch((error) => handleError(error))
  }, [tableQueryParams])

  useEffect(() => {
    dispatch(fetchStats({ asc: 'true', ...chartQueryParams }))
      .catch((error) => handleError(error))
  }, [chartQueryParams, farms])

  if (!stats) return null

  return (
    <>
      <StyledDivContainer>
        <h1 className='header'>Data points</h1>
        <DataPointTable
          data={data}
          handleFilterChange={handleTableFilterChange}
          handleSort={handleTableSort}
        />
      </StyledDivContainer>
      <StyledDivContainer>
        <h1 className='header'>Stats</h1>
        <MetricValueChart options={chartOptions} stats={stats} handleFilterChange={handleChartFilterChange} />
      </StyledDivContainer>
    </>
  )
}

export default DataView
