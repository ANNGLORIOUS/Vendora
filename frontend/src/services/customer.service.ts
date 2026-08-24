import api from './api'

export async function getCustomers() {
  const response = await api.get('/customers/')
  return response.data
}

export async function getCustomer(id: string | number) {
  const response = await api.get(`/customers/${id}/`)
  return response.data
}
