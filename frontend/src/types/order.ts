export type OrderItem = {
  id: number
  product_name: string
  quantity: number
  unit_price: number
  subtotal: number
}

export type Order = {
  id: number
  customer_name: string
  status: 'Paid' | 'Pending' | 'Overdue'
  total: number
  created_at: string
  items: OrderItem[]
}

export type CreateOrderPayload = {
  customer_id: number
  items: Array<{
    product_id: number
    quantity: number
    unit_price: number
  }>
  notes?: string
}
