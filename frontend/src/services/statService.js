import axios from 'axios'

axios.defaults.withCredentials = true
const baseUrl = 'http://localhost:3003/api/stats'

export const getStats = async (params) => {
  const response = await axios.get(baseUrl, { params })
  return response.data
}

export default { getStats }