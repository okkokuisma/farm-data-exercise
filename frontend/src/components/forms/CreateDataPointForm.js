import React, { useState, useEffect } from 'react'
import FarmSelect from '../inputs/FarmSelect'
import MetricTypeSelect from '../inputs/MetricTypeSelect'
import { Button, FormInput } from '../../styles'
import {newNotification} from '../../services/notificationService'
import dayjs from 'dayjs'

const CreateDataPointForm = ({farms, handler}) => {
  const [selectedFarm, setSelectedFarm] = useState(null)
  const [date, setDate] = useState(dayjs(Date()).format('YYYY-MM-DDTHH:mm'))
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
      newNotification({
        message: 'Invalid values.',
        type: 'error',
        time: 3000
      })
    }
  }

  if (!farms) return null

  return (
    <div className='formDiv'>
      <form onSubmit={handleSubmit}>
        <FormInput>
          <label htmlFor='farm'>Farm</label>
          <FarmSelect
            id='farm'
            farms={farms}
            onChange={e => {
              setSelectedFarm(farms.find(farm => farm.name === e.target.value))
            }}
          />
        </FormInput>
        <FormInput>
          <label htmlFor='metricType'>Metric type</label>
          <MetricTypeSelect
            id='metricType'
            onChange={e => {
              setMetricType(e.target.value || undefined)
            }}
          />
        </FormInput>
        <FormInput>
          <label htmlFor='date'>Date and time</label>
          <input
            id='date'
            value={date}
            type='datetime-local'
            onChange={e => setDate(e.target.value)}
            style={{
              width: '170px',
              marginRight: '0.5rem'
            }}
          />
        </FormInput>
        <FormInput>
          <label htmlFor='metricValue'>Metric value</label>
          <input
            id='metricValue'
            value={metricValue}
            type='number'
            step='0.01'
            min={min}
            max={max}
            onChange={e => setMetricValue(e.target.value)}
          />
        </FormInput>

        <Button type="submit">Send</Button>
      </form>
    </div>
  )
}

export default CreateDataPointForm
