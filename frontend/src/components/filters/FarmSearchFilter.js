import React from 'react'
import { StyledInput } from '../../styles'

const FarmSearchFilter = ({ handleFilterChange }) => {
  return (
    <>
      <StyledInput
        type='text'
        placeholder='Filter by farm'
        onChange={(e) => handleFilterChange({filter: 'search'}, e.target.value)}
      />
    </>
  )
}

export default FarmSearchFilter