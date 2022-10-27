import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import CreateDataPointForm from './forms/CreateDataPointForm'
import FileUploadForm from './forms/FileUploadForm'
import { StyledDivContainer } from '../styles'
// import SelectInput from './inputs/SelectInput'
// import { metricTypeSelectOptions, timeIntervalSelectOptions } from '../contants'
import MetricValueChart from './charts/MetricValueChart'

const Farm = ({ farm, handleFilterChange, stats }) => {
  const { user } = useAuth()
  const isOwnedByUser = farm.user.username === user.username

  if (!farm || !stats) return null

  return (
    <>
      <StyledDivContainer>
        <h1>{farm.name}</h1>
        <p>{farm.city}, {farm.address}</p>
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
        <h2>Statistics</h2>
        {/* <Filters>
          <SelectInput
            options={metricTypeSelectOptions}
            onChange={(e) => handleFilterChange({filter: 'metricType'}, e.target.value)}
          />
          <StyledInput
            type='date'
            onChange={e => handleFilterChange({filter: 'from'}, e.target.value)}
            min={farm.earliestDataPoint || ''}
            max={farm.latestDataPoint || ''}
          />
          <StyledInput
            type='date'
            onChange={e => handleFilterChange({filter: 'to'}, e.target.value)}
            min={farm.earliestDataPoint || ''}
            max={farm.latestDataPoint || ''}
          />
          <SelectInput
            options={timeIntervalSelectOptions}
            onChange={(e) => handleFilterChange({filter: 'group_by'}, e.target.value)}
          />
        </Filters> */}
        <MetricValueChart stats={stats} handleFilterChange={handleFilterChange} />
      </StyledDivContainer>
    </>
  )
}

export default Farm