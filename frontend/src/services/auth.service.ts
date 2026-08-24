import api from './api'

export async function loginUser(email: string, password: string) {
  const response = await api.post('/auth/login/', { email, password })
  return response.data
}

export async function logoutUser() {
  const response = await api.post('/auth/logout/')
  return response.data
}
