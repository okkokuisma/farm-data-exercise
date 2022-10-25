import React from 'react'
import { StyledInput } from '../../styles'

const DateFilter = ({ handleFilterChange }) => {
  return (
    <>
      <StyledInput
        type='date'
        onChange={e => handleFilterChange({filter: 'from'}, e.target.value)}
      />
      <StyledInput
        type='date'
        onChange={e => handleFilterChange({filter: 'to'}, e.target.value)}
      />
    </>
  )
}

export default DateFilter