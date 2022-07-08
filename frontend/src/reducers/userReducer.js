import userService from '../services/userService'

export const login = (credentials) => {
  return async (dispatch) => {
    const user = await userService.login(credentials)
    window.localStorage.setItem(
      'loggedUser', JSON.stringify(user)
    )
    dispatch(setUser(user))
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_USER',
      user: null
    })
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