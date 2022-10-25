import { getStats, formatStats } from '../services/statService'

export const fetchStats = (query) => {
  return (dispatch) => {
    return getStats(query)
      .then((data) => {
        dispatch({
          type: 'FETCH_STATS',
          data
        })
      })
  }
}

export const selectFormattedStats = (state, labelGroup) => {
  return formatStats(state.stats, labelGroup)
}

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'FETCH_STATS':
    return action.data
  default:
    return state
  }
}

export default reducer