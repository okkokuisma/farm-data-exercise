import dataService from '../services/dataService'

export const createDataPoint = (dataPoint) => {
  return (dispatch) => {
    return dataService.create(dataPoint)
      .then(() => dispatch(fetchData({})))
  }
}

export const fetchData = (query) => {
  return (dispatch) => {
    return dataService.getAll(query)
      .then((data) => {
        dispatch({
          type: 'FETCH_DATA',
          data
        })
      })
  }
}

const reducer = (state = {edges: []}, action) => {
  switch (action.type) {
  case 'FETCH_DATA':
    return action.data
  case 'DELETE_FARM':
    return { ...state, edges: state.edges.filter(e => e.node.farm.id !== action.data)}
  default:
    return state
  }
}

export default reducer