export type Product = {
  id: number
  name: string
  description?: string
  unit: string
  selling_price: number
  is_active: boolean
}

export type CreateProductPayload = {
  name: string
  description?: string
  unit: string
  selling_price: number
  is_active?: boolean
}
