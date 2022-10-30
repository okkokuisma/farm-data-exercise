import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import FarmList from '../components/lists/FarmList'
import CreateFarmForm from '../components/forms/CreateFarmForm'
import { useAuth } from '../contexts/AuthContext'
import { selectFarmNodes, selectUserOwnedFarmNodes } from '../reducers/farmReducer'
import { StyledDivContainer } from '../styles'
import { initFarms, deleteFarm } from '../reducers/farmReducer'
import useErrorHandler from '../hooks/useErrorHandler'
import { createNotification } from '../reducers/notificationReducer'

const MyFarmsView = () => {
  const { user } = useAuth()
  const dispatch = useDispatch()
  const handleError = useErrorHandler()

  const farms = useSelector(selectFarmNodes)
  const userOwnedFarms = useSelector((state) => selectUserOwnedFarmNodes(state, user.username))
  useEffect(() => {
    dispatch(initFarms({}))
      .catch(error => handleError(error))
  }, [])

  const handleFarmDelete = (id) => {
    dispatch(deleteFarm(id))
      .then(() => dispatch(createNotification({
        message: 'Farm deleted successfully.',
        type: 'success',
        time: 3000
      })))
      .catch(() => dispatch(createNotification({
        message: 'Something went wrong. Please try again later.',
        type: 'error',
        time: 3000
      })))
  }

  return (
    <>
      <StyledDivContainer>
        <h1 className='header'>My farms</h1>
        <FarmList handleFarmDelete={handleFarmDelete} farms={userOwnedFarms} />
      </StyledDivContainer>
      <CreateFarmForm farms={farms} />
    </>
  )
}

export default MyFarmsView
