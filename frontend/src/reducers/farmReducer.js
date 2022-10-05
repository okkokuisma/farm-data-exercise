import farmService from '../services/farmService'
import { logout } from './userReducer'

export const createFarm = (farm) => {
  return async (dispatch) => {
    try {
      const createdFarm = await farmService.create(farm)
      dispatch({
        type: 'CREATE_FARM',
        data: createdFarm
      })
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(logout())
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
      if (error.response.status === 401) {
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
      if (error.response.status === 401) {
        dispatch(logout())
      }
    }
  }
}

const reducer = (state = {}, action) => {
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