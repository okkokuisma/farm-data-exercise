import React from 'react'
import { Link } from 'react-router-dom'
import { StyledListItem } from '../../styles'

const FarmList = ({farms}) => {

  const Row = ({ farm }) => {
    return (
      <StyledListItem>
        <Link to={`/farms/${farm.id}`}>{farm.name}</Link>
        <button className='pushedRight'>delete</button>
      </StyledListItem>
    )
  }

  return (
    <>
      <ul>
        {farms.map(farm => (
          <Row key={farm.id} farm={farm}/>
        ))}
      </ul>
    </>
  )
}

export default FarmList
