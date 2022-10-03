import axiosInstance from './axiosConfig'
// const baseUrl = 'http://localhost:3003/api/farms'

export const getAll = async () => {
  const response = await axiosInstance.get('/farms', { withCredentials: true })
  return response.data
}

export const create = async (farm) => {
  const response = await axiosInstance.post('/farms', farm)
  return response.data
}

export const deleteFarm = async (id) => {
  const response = await axiosInstance.delete(`${'/farms'}/${id}`)
  return response.data
}

const exportedObject =  { getAll, deleteFarm, create }

export default exportedObject