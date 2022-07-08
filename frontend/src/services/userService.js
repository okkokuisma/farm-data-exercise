import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/auth'

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  return response.data
}

const exportedObject =  { login }

export default exportedObject