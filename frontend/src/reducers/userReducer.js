import userService from '../services/userService'
import { createNotification } from './notificationReducer'

export const login = (credentials) => {
  return (dispatch) => {
    return userService.login(credentials)
      .then((user) => {
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
        dispatch(setUser(user))

        const { tokenExpiry } = user
        setTimeout(() => {
          dispatch(logout())
          dispatch(createNotification({
            message: 'Your session timed out. Please log in again.',
            type: 'info',
            time: 3000
          }))
        }, new Date(tokenExpiry) - Date.now())
      })
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setUser(null))
  }
}

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_USER',
      user: user
    })
  }
}

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.user
  default:
    return state
  }
}

export default reducer