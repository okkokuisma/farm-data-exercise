import React from 'react'
import { Link } from 'react-router-dom'
import { StyledListItem, StyledButton } from '../../styles'

const Row = ({ farm }) => {
  return (
    <StyledListItem>
      <Link to={`/farms/${farm.id}`}>{farm.name}</Link>
      <StyledButton className='pushedRight'>delete</StyledButton>
    </StyledListItem>
  )
}

const FarmList = ({farms}) => {
  if (!farms) return (
    <>

    </>
  )

  return (
    <>
      <ul style={{padding: '0 10px', width: '50%'}}>
        {farms.map(farm => (
          <Row key={farm.id} farm={farm}/>
        ))}
      </ul>
    </>
  )
}

export default FarmList
