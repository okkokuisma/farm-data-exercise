import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import CreateDataPointForm from './forms/CreateDataPointForm'
import FileUploadForm from './forms/FileUploadForm'
import { StyledDivContainer, StyledInput, Filters } from '../styles'
import SelectInput from './inputs/SelectInput'
import { metricTypeSelectOptions, timeIntervalSelectOptions } from '../contants'
import LineChart from './charts/LineChart'

const Farm = ({ farm, handleFilterChange, stats }) => {
  const { user } = useAuth()
  const isOwnedByUser = farm.user.username === user.username
  const { labels, min, max, mean } = stats

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Min',
        data: min,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Max',
        data: max,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Average',
        data: mean,
        borderColor: 'rgb(175, 63, 212)',
        backgroundColor: 'rgba(175, 63, 212, 0.5)',
      },
    ],
  }

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
          <StyledDivContainer>
            <h2>Add a data point</h2>
            <CreateDataPointForm farmId={farm.id}/>
          </StyledDivContainer>
          <StyledDivContainer>
            <h2>Add data points by a csv file</h2>
            <FileUploadForm farmId={farm.id}/>
          </StyledDivContainer>
        </>
        : null
      }
      <StyledDivContainer>
        <h2>Statistics</h2>
        <Filters>
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
        </Filters>
        <LineChart options={chartOptions} data={chartData} />
      </StyledDivContainer>
    </>
  )
}

export default Farm