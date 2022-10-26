import axiosInstance from './axiosConfig'

const login = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials)
  return response.data
}

const exportedObject =  { login }

export default exportedObject