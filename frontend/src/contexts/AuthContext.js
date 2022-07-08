import { createContext, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, login as loginDispatch } from '../reducers/userReducer'
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const login = async (credentials) => {
    dispatch(loginDispatch(credentials))
  };

  const logout = () => {
    dispatch(setUser(null))
  };

  let value = { user, login, logout }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
  return useContext(AuthContext)
};