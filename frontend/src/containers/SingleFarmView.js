import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getOne } from '../services/farmService'
import { fetchStats, selectFormattedStats } from '../reducers/statReducer'
import Farm from '../components/Farm'
import useQueryParams from '../hooks/useQueryParams'
import dayjs from 'dayjs'
import { getMetricValueChartTimeInterval } from '../utils'
import useErrorHandler from '../hooks/useErrorHandler'

const SingleFarmView = () => {
  const dispatch = useDispatch()
  const [ queryParams, handleFilterChange ] = useQueryParams()
  const stats = useSelector((state) => selectFormattedStats(state, queryParams.group_by || 'month'))
  const [ farm, setFarm ] = useState(null)
  const handleError = useErrorHandler()
  let { id } = useParams()

  useEffect(() => {
    getOne(id)
      .then(farm => {
        setFarm({
          ...farm,
          earliestDataPoint: dayjs(farm.earliestDataPoint).format('YYYY-MM-DD'),
          latestDataPoint: dayjs(farm.latestDataPoint).format('YYYY-MM-DD'),
        })
      })
      .catch(error => handleError(error))
  }, [])

  useEffect(() => {
    if (farm) {
      const timeInterval = getMetricValueChartTimeInterval(queryParams, [farm])
      dispatch(fetchStats({
        farmId: id, asc: 'true', group_by: timeInterval, ...queryParams
      }))
        .catch(error => handleError(error))
    }
  }, [queryParams, farm])

  if (!farm || !stats) return null

  return (
    <>
      <Farm
        farm={farm}
        handleFilterChange={handleFilterChange}
        stats={stats}
      />
    </>
  )
}

export default SingleFarmView