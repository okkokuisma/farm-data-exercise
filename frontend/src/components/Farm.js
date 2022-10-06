import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import CreateDataPointForm from './forms/CreateDataPointForm'
import FileUploadForm from './forms/FileUploadForm'

const Farm = ({ farm }) => {
  const { user } = useAuth()
  const isOwnedByUser = farm.user.username === user.username
  console.log(farm)
  console.log(isOwnedByUser)

  return (
    <>
      <h1>
        {farm.name}
      </h1>
      { isOwnedByUser
        ?
        <>
          <CreateDataPointForm farmId={farm.id}/>
          <FileUploadForm farmId={farm.id}/>
        </>
        : null
      }
    </>
  )
}

export default Farm