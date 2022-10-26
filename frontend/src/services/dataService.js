import axiosInstance from './axiosConfig'

axiosInstance.defaults.withCredentials = true

const getAll = async (params) => {
  const response = await axiosInstance.get('/data', { params })
  console.log(response.data)
  return response.data
}

const create = async (dataPoint) => {
  const response = await axiosInstance.post('/data', dataPoint)
  return response.data
}

const exportedObject =  { getAll, create }

export default exportedObject