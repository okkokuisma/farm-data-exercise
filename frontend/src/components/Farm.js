import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import CreateDataPointForm from './forms/CreateDataPointForm'
import FileUploadForm from './forms/FileUploadForm'
import { StyledDivContainer } from '../styles'
import MetricValueChart from './charts/MetricValueChart'

const Farm = ({ farm, handleFilterChange, stats }) => {
  const { user } = useAuth()
  const isOwnedByUser = farm.user.username === user.username

  if (!farm || !stats) return null

  return (
    <>
      <StyledDivContainer>
        <div className='header'>
          <h1>{farm.name}</h1>
          <p>{farm.city}, {farm.address}</p>
        </div>
      </StyledDivContainer>
      { isOwnedByUser
        ?
        <>
          <CreateDataPointForm farmId={farm.id}/>
          <FileUploadForm farmId={farm.id}/>
        </>
        : null
      }
      <StyledDivContainer>
        <h1 className='header'>Statistics</h1>
        <MetricValueChart stats={stats} handleFilterChange={handleFilterChange} />
      </StyledDivContainer>
    </>
  )
}

export default Farm