import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/farms'

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const deleteFarm = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

const exportedObject =  { getAll, deleteFarm }

export default exportedObject