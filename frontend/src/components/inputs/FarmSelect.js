import React from 'react'
import { Select } from '../../styles'

const FarmSelect = ({farms, onChange}) => {
  return (
    <>
      <Select
        defaultValue=''
        onChange={onChange}
      >
        <option value=''>Select farm</option>
        {farms.map((farm, i) => (
          <option key={i} value={farm.name}>
            {farm.name}
          </option>
        ))}
      </Select>
    </>
  )
}

export default FarmSelect
