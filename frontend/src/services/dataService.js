import axios from 'axios'
axios.defaults.withCredentials = true
const baseUrl = 'http://localhost:3003/api/data'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (dataPoint) => {
  const response = await axios.post(baseUrl, dataPoint)
  return response.data
}

const exportedObject =  { getAll, create }

export default exportedObject