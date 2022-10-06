import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import CreateDataPointForm from './forms/CreateDataPointForm'
import FileUploadForm from './forms/FileUploadForm'
import { StyledDivContainer } from '../styles'

const Farm = ({ farm }) => {
  const { user } = useAuth()
  const isOwnedByUser = farm.user.username === user.username
  console.log(farm)
  console.log(isOwnedByUser)

  return (
    <>
      <StyledDivContainer>
        <h1>{farm.name}</h1>
        <p>{farm.city}, {farm.address}</p>
      </StyledDivContainer>
      { isOwnedByUser
        ?
        <>
          <StyledDivContainer>
            <h1>Add a data point</h1>
            <CreateDataPointForm farmId={farm.id}/>
          </StyledDivContainer>
          <StyledDivContainer>
            <h1>Add data points by a csv file</h1>
            <FileUploadForm farmId={farm.id}/>
          </StyledDivContainer>
        </>
        : null
      }
    </>
  )
}

export default Farm