import React, { useState, useEffect } from 'react'
import FarmSelect from '../inputs/FarmSelect'
import MetricTypeSelect from '../inputs/MetricTypeSelect'
import { Button } from '../../styles'

const CreateDataPointForm = ({farms, handler}) => {
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

  const validateValues = () => {
    return (metricValue >= min && metricValue <= max)
      && !(/^\s*$/.test(date))
      && (metricType && !(/^\s*$/.test(metricType)))
      && (typeof selectedFarm !== 'undefined' && selectedFarm !== null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateValues()) {
      handler(selectedFarm, date, metricType, metricValue)
    } else {
      alert('Invalid values. Please check you have set a value to every input field and that the given values are within the valid min and max values.')
    }
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
