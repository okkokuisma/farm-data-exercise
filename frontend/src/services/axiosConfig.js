import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3003/api/',
  timeout: 1000
})

export default axiosInstance