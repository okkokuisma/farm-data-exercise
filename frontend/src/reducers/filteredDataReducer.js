export const filterData = (filteredData) => {
  return async (dispatch) => {
    dispatch({
      type: 'FILTER',
      data: filteredData
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'FILTER':
    return action.data
  default:
    return state
  }
}

export default reducer