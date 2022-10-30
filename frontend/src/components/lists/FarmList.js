import React from 'react'
import { Link } from 'react-router-dom'
import { StyledList, StyledListItem, StyledButton } from '../../styles'

const Row = ({ farm, handleFarmDelete }) => {
  return (
    <StyledListItem>
      <Link to={`/farms/${farm.id}`}>{farm.name}</Link>
      <StyledButton
        className='pushedRight'
        onClick={() => handleFarmDelete(farm.id)}
      >
        delete
      </StyledButton>
    </StyledListItem>
  )
}

const FarmList = ({ farms, handleFarmDelete }) => {
  if (!farms) return null

  return (
    <>
      <StyledList>
        {farms.map(farm => (
          <Row key={farm.id} farm={farm} handleFarmDelete={handleFarmDelete} />
        ))}
      </StyledList>
    </>
  )
}

export default FarmList
