import React, { useEffect, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { useParams } from 'react-router-dom'

import { getOne } from '../services/farmService'
import Farm from '../components/Farm'

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
      <Farm farm={farm} />
    </>
  )
}

export default SingleFarmView