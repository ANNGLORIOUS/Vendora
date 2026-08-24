import { z } from 'zod'

export const orderItemSchema = z.object({
  product_id: z.number().min(1),
  quantity: z.number().min(1),
  unit_price: z.number().min(0),
})

export const orderSchema = z.object({
  customer_id: z.number().min(1),
  items: z.array(orderItemSchema).min(1),
  notes: z.string().optional(),
})

export type OrderFormValues = z.infer<typeof orderSchema>
