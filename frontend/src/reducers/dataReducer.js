import dataService from '../services/dataService'
import filterData from '../reducers/filteredDataReducer'

export const createDataPoint = (dataPoint) => {
  return async (dispatch) => {
    const createdDataPoint = await dataService.create(dataPoint)
    dispatch({
      type: 'CREATE_DP',
      data: createdDataPoint
    })
  }
}

export const addData = (addedData) => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_DATA',
      data: addedData
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
    dispatch({
      type: 'FILTER',
      data: data
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'CREATE_DP':
    return [ ...state, action.data ]
  case 'INIT_DATA':
    return action.data
  case 'ADD_DATA':
    return [ ...state, ...action.data]
  default:
    return state
  }
}

export default reducer