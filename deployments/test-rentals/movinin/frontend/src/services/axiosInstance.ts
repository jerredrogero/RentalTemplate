import axios from 'axios'
import env from '@/config/env.config'

// Log the API host for debugging
console.log('Creating axios instance with API host:', env.API_HOST)

// Make sure we have a valid API host
const apiHost = env.API_HOST || 'https://test-rentals-api.onrender.com'

const axiosInstance = axios.create({ baseURL: apiHost })

// Add request interceptor to log requests in development
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`)
    return config
  },
  (error) => {
    console.error('API Request Error:', error)
    return Promise.reject(error)
  }
)

export default axiosInstance
