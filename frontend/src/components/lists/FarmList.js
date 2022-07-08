import React from 'react'
import { ListItem } from '../../styles'
import VirtualizedList from './VirtualizedList'

const FarmList = ({farms, handleDelete}) => {

  const Row = ({ index, style }) => {
    const farm = farms[index]
    return (
      <ListItem style={style}>
        <span className='itemName'>{farm.name}</span>
        <button onClick={() => handleDelete(farm.id)} className='pushedRight'>delete</button>
      </ListItem>
    )
  }

  return (
    <>
      <VirtualizedList
        row={Row}
        height={200}
        itemCount={farms.length}
        itemSize={35}
        width={'30%'}
      />
    </>
  )
}

export default FarmList
