import axiosInstance from './axiosConfig'
// const baseUrl = 'http://localhost:3003/api/farms'

export const getAll = async (queryParams) => {
  const response = await axiosInstance.get('/farms', { queryParams }, { withCredentials: true })
  return response.data
}

export const getOne = async (id) => {
  const response = await axiosInstance.get(`/farms/${id}`, { withCredentials: true })
  return response.data
}

export const create = async (farm) => {
  const response = await axiosInstance.post('/farms', farm, { withCredentials: true })
  return response.data
}

export const deleteFarm = async (id) => {
  const response = await axiosInstance.delete(`${'/farms'}/${id}`, { withCredentials: true })
  return response.data
}

const exportedObject =  { getAll, deleteFarm, create, getOne }

export default exportedObject