import React from 'react'
import { Select } from '../../../styles'

const SelectColumnFilter = ({ options, setSelected, selected }) => {
  return (
    <Select
      value={selected}
      onChange={e => {
        setSelected(e.target.value || undefined)
      }}
    >
      <option value="all">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </Select>
  )
}

export default SelectColumnFilter