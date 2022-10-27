import axiosInstance from './axiosConfig'

const login = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials)
  return response.data
}

export const signup = async (credentials) => {
  const response = await axiosInstance.post('/users', credentials)
  return response.data
}

const exportedObject =  { login, signup }

export default exportedObject