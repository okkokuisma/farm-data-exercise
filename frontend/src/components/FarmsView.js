import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Farm from './Farm'
import { List } from '../styles'

const FarmsView = () => {
  const [selectedFarm, setSelectedFarm] = useState(null)
  const farms = useSelector(state => state.farms)

  return (
    <div>
      {/* <select
        value={selectedFarm ? selectedFarm.name : 'Choose farm'}
        onChange={e => {
          setSelectedFarm(farms.find(farm => farm.name === e.target.value) || null)
        }}
      >
        <option value="">Choose farm</option>
        {farms.map(farm => (
          <option key={farm.id} value={farm.name}>
            {farm.name}
          </option>
        ))}
      </select> */}
      <List>
        {farms.map(farm => (
          <li className='farm' key={farm.id}>
            <button onClick={() => setSelectedFarm(farm)}>{farm.name}</button>
          </li>
        ))}
      </List>
      {selectedFarm
        ? <Farm key={ selectedFarm.id } farm={ selectedFarm }/>
        : null
      }
    </div>
  )
}

export default FarmsView
