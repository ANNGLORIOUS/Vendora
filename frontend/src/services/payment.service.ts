import api from './api'

export async function getPayments() {
  const response = await api.get('/payments/')
  return response.data
}

export async function createPayment(payload: Record<string, unknown>) {
  const response = await api.post('/payments/', payload)
  return response.data
}
