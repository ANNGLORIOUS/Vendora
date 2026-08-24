export type Payment = {
  id: number
  customer_name: string
  amount: number
  method: 'Mpesa' | 'Bank' | 'Cash'
  reference?: string
  paid_at: string
}

export type CreatePaymentPayload = {
  customer_id: number
  order_id?: number
  amount: number
  method: 'Mpesa' | 'Bank' | 'Cash'
  reference?: string
  notes?: string
}
