import React, { useEffect, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { useParams } from 'react-router-dom'
import { getOne } from '../services/farmService'

const SingleFarmView = () => {
  const [ farm, setFarm ] = useState(null)
  const handleError = useErrorHandler()
  let { id } = useParams()

  useEffect(() => {
    getOne(id)
      .then(farm => setFarm(farm))
      .catch(error => handleError(error))
  }, [])

  if (!farm) return null

  return (
    <>
      {farm.name}
    </>
  )
}

export default SingleFarmView