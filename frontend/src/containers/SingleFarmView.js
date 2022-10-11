import React, { useEffect, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { useParams } from 'react-router-dom'

import { getOne } from '../services/farmService'
import { getStats } from '../services/statService'
import Farm from '../components/Farm'
import useQueryParams from '../hooks/useQueryParams'
// import dayjs from 'dayjs'

const SingleFarmView = () => {
  const [ queryParams, handleFilterChange ] = useQueryParams()
  const [ farm, setFarm ] = useState(null)
  const [ stats, setStats ] = useState(null)
  const handleError = useErrorHandler()
  let { id } = useParams()
  console.log(queryParams)
  const formatStats = (stats) => {
    const initialValue = {labels: [], min: [], max: [], mean: []}
    if (stats) {
      return stats.reduce((b, a) => {
        const { month, min, max, mean } = a
        const label = new Date(month).toLocaleString('default', { month: 'long', year: 'numeric' })
        b.labels.push(label)
        b.min.push(min)
        b.max.push(max)
        b.mean.push(mean)
        return b
      }, initialValue)
    } else return initialValue
  }

  useEffect(() => {
    // const { from, to } = queryParams
    // const params = dayjs(to).diff(dayjs(from), 'month') > 2
    //   ? { group_by: 'day', ...queryParams }
    //   : { group_by: 'month', ...queryParams }
    // const validTo = to
    //   ? to
    //   : dayjs()
    // console.log(validTo)
    // console.log(dayjs(validTo).diff(dayjs(from), 'month'))
    getStats({ farmId: id, asc: 'true', ...queryParams })
      .then(stats => setStats(formatStats(stats)))
      .catch(error => handleError(error))
  }, [queryParams])

  useEffect(() => {
    getOne(id)
      .then(farm => setFarm(farm))
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