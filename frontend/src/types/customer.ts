export type Customer = {
  id: number
  business_name: string
  contact_person: string
  phone: string
  email?: string
  location?: string
  status: 'active' | 'inactive'
  outstanding: number
}

export type CreateCustomerPayload = {
  business_name: string
  contact_person: string
  phone: string
  email?: string
  location?: string
  credit_limit?: number
  notes?: string
}
