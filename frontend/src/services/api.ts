import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api'

export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('vendora_access_token', token)
  } else {
    localStorage.removeItem('vendora_access_token')
  }
}

export const clearAuthToken = () => {
  localStorage.removeItem('vendora_access_token')
  localStorage.removeItem('vendora_refresh_token')
}

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('vendora_access_token')
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthToken()
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api
