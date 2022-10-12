import React, { useEffect, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { useParams } from 'react-router-dom'

import { getOne } from '../services/farmService'
import { getStats } from '../services/statService'
import Farm from '../components/Farm'
import useQueryParams from '../hooks/useQueryParams'
import dayjs from 'dayjs'

const SingleFarmView = () => {
  const [ queryParams, handleFilterChange ] = useQueryParams()
  const [ farm, setFarm ] = useState(null)
  const [ stats, setStats ] = useState(null)
  const handleError = useErrorHandler()
  let { id } = useParams()
  console.log(queryParams)
  const formatStats = (stats, labelGroup) => {
    const initialValue = {labels: [], min: [], max: [], mean: []}
    if (stats) {
      return stats.reduce((b, a) => {
        const { time, min, max, mean } = a
        const label = labelGroup === 'month'
          ? new Date(time).toLocaleString('default', { month: 'long', year: 'numeric' })
          : labelGroup === 'year'
            ? new Date(time).toLocaleString('default', { year: 'numeric' })
            : new Date(time).toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' })
        b.labels.push(label)
        b.min.push(min)
        b.max.push(max)
        b.mean.push(mean)
        return b
      }, initialValue)
    } else return initialValue
  }

  useEffect(() => {
    const { from, to } = queryParams
    const validTo = to
      ? to
      : dayjs(farm?.latestDataPoint)
    const validFrom = from
      ? from
      : dayjs(farm?.earliestDataPoint)
    console.log(dayjs(validTo).diff(dayjs(validFrom), 'month'))
    const params = dayjs(validTo).diff(dayjs(validFrom), 'month') < 2
      ? { group_by: 'day', ...queryParams }
      : dayjs(validTo).diff(dayjs(validFrom), 'month') < 24
        ? { group_by: 'month', ...queryParams }
        : { group_by: 'year', ...queryParams }
    getStats({ farmId: id, asc: 'true', ...params })
      .then(stats => setStats(formatStats(stats)))
      .catch(error => handleError(error))
  }, [queryParams])

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

  if (!farm) return null

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