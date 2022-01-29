import React from 'react'
import { Select } from '../../styles'

const MetricTypeSelect = ({ onChange, id }) => {
  return (
    <>
      <Select
        id={id}
        onChange={onChange}
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
    </>
  )
}

export default MetricTypeSelect
