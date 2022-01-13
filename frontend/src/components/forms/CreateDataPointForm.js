import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Select } from '../../styles'
import { createDataPoint } from '../../reducers/dataReducer'

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
    console.log(selectedFarm)
    console.log(date)
    console.log(metricType)
    console.log(metricValue)

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
        <Select
          defaultValue=''
          onChange={e => {
            setSelectedFarm(farms.find(farm => farm.name === e.target.value))
          }}
        >
          <option value=''>Select farm</option>
          {farms.map((farm, i) => (
            <option key={i} value={farm.name}>
              {farm.name}
            </option>
          ))}
        </Select>
        <Select
          value={metricType}
          onChange={e => {
            setMetricType(e.target.value || undefined)
          }}
        >
          <option value='rainFall'>
            Rain fall
          </option>
          <option value='temperature'>
            Temperature
          </option>
          <option value='pH'>
            pH
          </option>
        </Select>
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

        <button type="submit">Send</button>
      </form>
    </>
  )
}

export default CreateDataPointForm
