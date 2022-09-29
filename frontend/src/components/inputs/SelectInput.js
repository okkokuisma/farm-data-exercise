import React from 'react'

import { Select } from '../../styles'

const SelectInput = ({ options, onChange, id, ...props }) => {
  return (
    <Select
      id={id}
      onChange={onChange}
      {...props}
    >
      {options.map((option, i) => (
        <option key={i} value={option.value}>
          {option.name}
        </option>
      ))}
    </Select>
  )
}

export default SelectInput