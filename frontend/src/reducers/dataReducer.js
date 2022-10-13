import dataService from '../services/dataService'
import { logout } from './userReducer'

export const createDataPoint = (dataPoint) => {
  return async (dispatch) => {
    try {
      await dataService.create(dataPoint)
      // dispatch({
      //   type: 'CREATE_DP',
      //   data: createdDataPoint
      // })
    } catch (error) {
      console.log(error)
      if (error.response.status === 401) {
        dispatch(logout())
      }
    }
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

export const fetchData = (query) => {
  return async (dispatch) => {
    try {
      const data = await dataService.getAll(query)
      dispatch({
        type: 'FETCH_DATA',
        data
      })
    } catch (error) {
      console.log(error)
      if (error.response.status === 401) {
        dispatch(logout())
      }
    }
  }
}
// export const fetchData = (query) => {
//   return (dispatch) => {
//     return dataService.getAll(query)
//       .then((data) => {
//         dispatch({
//           type: 'FETCH_DATA',
//           data
//         })
//       },
//       (error) => {
//         if (error.response.status === 401) {
//           dispatch(logout())
//         }
//       })
//   }
// }

const reducer = (state = {}, action) => {
  switch (action.type) {
  // case 'CREATE_DP':
  //   console.log(state)
  //   return [ ...state, action.data ]
  case 'FETCH_DATA':
    return action.data
  case 'ADD_DATA':
    return [ ...state, ...action.data]
  case 'DELETE_FARM':
    return state.filter(dp => dp.farm.id !== action.data)
  default:
    return state
  }
}

export default reducer