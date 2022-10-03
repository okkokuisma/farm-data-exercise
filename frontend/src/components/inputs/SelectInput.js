import React from 'react'

import { StyledSelect } from '../../styles'

const SelectInput = ({ options, onChange, id, ...props }) => {
  return (
    <StyledSelect
      id={id}
      onChange={onChange}
      {...props}
    >
      {options.map((option, i) => (
        <option key={i} value={option.value}>
          {option.name}
        </option>
      ))}
    </StyledSelect>
  )
}

export default SelectInput