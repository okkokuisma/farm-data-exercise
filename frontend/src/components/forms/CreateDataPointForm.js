import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createDataPoint } from '../../reducers/dataReducer'
import FarmSelect from '../inputs/FarmSelect'
import MetricTypeSelect from '../inputs/MetricTypeSelect'
import { Button } from '../../styles'

const CreateDataPointForm = ({farms}) => {
  const dispatch = useDispatch()
  const [selectedFarm, setSelectedFarm] = useState(null)
  const [date, setDate] = useState('')
  const [metricType, setMetricType] = useState('rainFall')
  const [metricValue, setMetricValue] = useState(0)
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)

  const minMaxValues = {
    rainFall: [0, 500],
    pH: [0, 14],
    temperature: [-50, 100]
  }

  useEffect(() => {
    setMin(minMaxValues[metricType][0])
    setMax(minMaxValues[metricType][1])
  }, [metricType])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(selectedFarm)
    // console.log(date)
    // console.log(metricType)
    // console.log(metricValue)

    dispatch(createDataPoint({
      farmId: selectedFarm.id,
      dateTime: date,
      metricType: metricType,
      metricValue: metricValue
    }))
  }

  if (!farms) return null

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FarmSelect
          farms={farms}
          onChange={e => {
            setSelectedFarm(farms.find(farm => farm.name === e.target.value))
          }}
        />
        <MetricTypeSelect
          onChange={e => {
            setMetricType(e.target.value || undefined)
          }}
        />
        <input
          value={date || ''}
          type='datetime-local'
          onChange={e => setDate(e.target.value)}
          style={{
            width: '170px',
            marginRight: '0.5rem'
          }}
        />
        <input
          value={metricValue}
          type='number'
          step='0.01'
          min={min}
          max={max}
          onChange={e => setMetricValue(e.target.value)}
        />

        <Button type="submit">Send</Button>
      </form>
    </>
  )
}

export default CreateDataPointForm
