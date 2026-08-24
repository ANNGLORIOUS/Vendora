import { z } from 'zod'

export const paymentSchema = z.object({
  customer_id: z.number().min(1),
  order_id: z.number().optional(),
  amount: z.coerce.number().min(1, 'Amount must be greater than zero'),
  method: z.enum(['Mpesa', 'Bank', 'Cash']),
  reference: z.string().optional(),
  notes: z.string().optional(),
})

export type PaymentFormValues = z.infer<typeof paymentSchema>
