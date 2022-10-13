import React from 'react'
import { Filters, StyledInput } from '../../styles'
import SelectInput from './SelectInput'
import { metricTypeSelectOptions } from '../../contants'

const DataFilters = ({ handleFilterChange }) => {
  return (
    <>
      <Filters>
        <StyledInput
          type='text'
          placeholder='Filter by farm'
          onChange={(e) => handleFilterChange({filter: 'search'}, e.target.value)}
        />
        <SelectInput
          options={metricTypeSelectOptions}
          onChange={(e) => handleFilterChange({filter: 'metricType'}, e.target.value)}
        />
        <StyledInput
          type='date'
          onChange={e => handleFilterChange({filter: 'from'}, e.target.value)}
        />
        <StyledInput
          type='date'
          onChange={e => handleFilterChange({filter: 'to'}, e.target.value)}
        />
      </Filters>
    </>
  )
}

export default DataFilters