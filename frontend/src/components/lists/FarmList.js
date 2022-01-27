import React from 'react'
import farmService from '../../services/farmService'
import { useDispatch } from 'react-redux'
import { ListItem } from '../../styles'
import { deleteFarm } from '../../reducers/farmReducer'
import VirtualizedList from './VirtualizedList'

const FarmList = ({farms}) => {
  const dispatch = useDispatch()

  const handleDelete = async (id) => {
    farmService.deleteFarm(id)
    dispatch(deleteFarm(id))
  }

  const Row = ({ index, style }) => {
    const farm = farms[index]
    return (
      <ListItem style={style}>
        {farm.name}
        <button onClick={() => handleDelete(farm.id)} className='pushedRight'>delete</button>
      </ListItem>
    )
  }

  return (
    <>
      <VirtualizedList
        row={Row}
        height={100}
        itemCount={farms.length}
        itemSize={35}
        width={1000}
      />
    </>
  )
}

export default FarmList
