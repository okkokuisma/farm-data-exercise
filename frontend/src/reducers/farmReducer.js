import farmService from '../services/farmService'
import { logout } from './userReducer'
import { createNotification } from './notificationReducer'

export const createFarm = (farm) => {
  return async (dispatch) => {
    try {
      const createdFarm = await farmService.create(farm)
      dispatch({
        type: 'CREATE_FARM',
        data: createdFarm
      })
      dispatch(createNotification({
        message: 'New farm created successfully.',
        type: 'success',
        time: 3000
      }))
    } catch (error) {
      if (error?.response?.status === 401) {
        dispatch(logout())
        dispatch(createNotification({
          message: 'Your session timed out. Please log in again.',
          type: 'info',
          time: 3000
        }))
      } else {
        dispatch(createNotification({
          message: 'Error while creating a new farm.',
          type: 'error',
          time: 3000
        }))
      }
    }
  }
}

export const deleteFarm = (farmId) => {
  return async (dispatch) => {
    try {
      await farmService.deleteFarm(farmId)
      dispatch({
        type: 'DELETE_FARM',
        data: farmId
      })
    } catch (error) {
      if (error?.response?.status === 401) {
        dispatch(logout())
      }
    }
  }
}

export const initFarms = (queryParams) => {
  return async (dispatch) => {
    try {
      const farms = await farmService.getAll(queryParams)
      console.log(farms)
      dispatch({
        type: 'INIT_FARMS',
        data: farms
      })
    } catch (error) {
      console.log(error)
      if (error?.response?.status === 401) {
        dispatch(logout())
      }
    }
  }
}

export const selectFarmNodes = state => state.farms.edges.map(e => e.node)
export const selectUserOwnedFarmNodes = (state, username) => {
  return state.farms.edges
    .map(e => e.node)
    .filter(n => n.user.username === username)
}

const reducer = (state = { edges:[] }, action) => {
  switch (action.type) {
  case 'INIT_FARMS':
    return action.data
  case 'CREATE_FARM':
    return [ ...state, action.data ]
  case 'DELETE_FARM':
    return state.filter(farm => farm.id !== action.data)
  default:
    return state
  }
}

export default reducer