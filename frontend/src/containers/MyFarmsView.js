import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import FarmList from '../components/lists/FarmList'
import CreateFarmForm from '../components/forms/CreateFarmForm'
import { useAuth } from '../contexts/AuthContext'
import { selectFarmNodes, selectUserOwnedFarmNodes } from '../reducers/farmReducer'
import { StyledDivContainer } from '../styles'
import { initFarms, deleteFarm } from '../reducers/farmReducer'

const MyFarmsView = () => {
  const { user } = useAuth()
  const dispatch = useDispatch()

  const farms = useSelector(selectFarmNodes)
  const userOwnedFarms = useSelector((state) => selectUserOwnedFarmNodes(state, user.username))
  console.log(userOwnedFarms)
  useEffect(() => {
    dispatch(initFarms({}))
  }, [])

  const handleFarmDelete = (id) => {
    dispatch(deleteFarm(id))
      .then(console.log('deleted'))
      .catch(error => console.log(error))
  }

  return (
    <>
      <StyledDivContainer>
        <h1>My farms</h1>
        <FarmList handleFarmDelete={handleFarmDelete} farms={userOwnedFarms} />
      </StyledDivContainer>
      <StyledDivContainer>
        <h1>Create a new farm</h1>
        <CreateFarmForm farms={farms} />
      </StyledDivContainer>
    </>
  )
}

export default MyFarmsView
