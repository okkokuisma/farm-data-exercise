import farmService from '../services/farmService'

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
  default:
    return state
  }
}

export default reducer