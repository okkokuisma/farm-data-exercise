import React from 'react'
import SelectInput from '../inputs/SelectInput'
import { timeIntervalSelectOptions } from '../../contants'

const TimeIntervalFilter = ({ handleFilterChange }) => {
  return (
    <>
      <SelectInput
        options={timeIntervalSelectOptions}
        onChange={(e) => handleFilterChange({filter: 'group_by'}, e.target.value)}
      />
    </>
  )
}

export default TimeIntervalFilter