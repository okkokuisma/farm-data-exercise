import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 1000,
})

export default axiosInstance