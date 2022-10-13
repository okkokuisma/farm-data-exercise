import React, { useEffect, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { useParams } from 'react-router-dom'

import { getOne } from '../services/farmService'
import { getStats, formatStats } from '../services/statService'
import Farm from '../components/Farm'
import useQueryParams from '../hooks/useQueryParams'
import dayjs from 'dayjs'

const SingleFarmView = () => {
  const [ queryParams, handleFilterChange ] = useQueryParams()
  const [ farm, setFarm ] = useState(null)
  const [ stats, setStats ] = useState(null)
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
      const { from, to } = queryParams
      const validTo = to
        ? to
        : dayjs(farm.latestDataPoint)
      const validFrom = from
        ? from
        : dayjs(farm.earliestDataPoint)

      const params = dayjs(validTo).diff(dayjs(validFrom), 'month') < 2
        ? { group_by: 'day', ...queryParams }
        : dayjs(validTo).diff(dayjs(validFrom), 'month') < 24
          ? { group_by: 'month', ...queryParams }
          : { group_by: 'year', ...queryParams }
      const labelGroup = queryParams.group_by || 'month'
      getStats({ farmId: id, asc: 'true', ...params })
        .then(stats => setStats(formatStats(stats), labelGroup))
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