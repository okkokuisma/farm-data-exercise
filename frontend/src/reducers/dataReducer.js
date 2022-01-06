import dataService from '../services/dataService'

export const createDataPoint = (dataPoint) => {
  return async (dispatch) => {
    const createdDataPoint = await dataService.create(dataPoint)
    dispatch({
      type: 'CREATE',
      data: createdDataPoint
    })
  }
}

export const initData = () => {
  return async (dispatch) => {
    const data = await dataService.getAll()
    dispatch({
      type: 'INIT_DATA',
      data: data
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'CREATE':
    return [ ...state, action.data ]
  case 'INIT_DATA':
    return action.data
  default:
    return state
  }
}

export default reducer