import farmService from '../services/farmService'

export const createFarm = (farm) => {
  return async (dispatch) => {
    const createdFarm = await farmService.create(farm)
    dispatch({
      type: 'CREATE_FARM',
      data: createdFarm
    })
  }
}

export const deleteFarm = (farmId) => {
  return async (dispatch) => {
    await farmService.deleteFarm(farmId)
    dispatch({
      type: 'DELETE_FARM',
      data: farmId
    })
  }
}

export const initFarms = () => {
  return async (dispatch) => {
    const farms = await farmService.getAll()
    dispatch({
      type: 'INIT_FARMS',
      data: farms
    })
  }
}

const reducer = (state = [], action) => {
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