import React from 'react'
import SelectInput from '../inputs/SelectInput'
import { metricTypeSelectOptions } from '../../contants'

const MetricTypeFilter = ({ handleFilterChange }) => {
  return (
    <>
      <SelectInput
        options={metricTypeSelectOptions}
        onChange={(e) => handleFilterChange({filter: 'metricType'}, e.target.value)}
      />
    </>
  )
}

export default MetricTypeFilter