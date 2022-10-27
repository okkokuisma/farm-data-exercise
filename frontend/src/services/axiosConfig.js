import axios from 'axios'

// eslint-disable-next-line no-undef
const backendUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3003/api'
  : '/api'

const axiosInstance = axios.create({
  baseURL: backendUrl,
  timeout: 1000,
})

export default axiosInstance