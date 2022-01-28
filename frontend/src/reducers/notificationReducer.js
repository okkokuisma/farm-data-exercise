const uid = function(){
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export const createNotification = (notification) => {
  return async (dispatch) => {
    dispatch({
      type: 'CREATE_NOTIFICATION',
      data: {...notification, id: uid()}
    })
  }
}

export const deleteNotification = (notificationId) => {
  return async (dispatch) => {
    dispatch({
      type: 'DELETE_NOTIFICATION',
      data: notificationId
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'CREATE_NOTIFICATION':
    return [ ...state, action.data ]
  case 'DELETE_NOTIFICATION':
    return state.filter(n => n.id !== action.data)
  default:
    return state
  }
}

export default reducer