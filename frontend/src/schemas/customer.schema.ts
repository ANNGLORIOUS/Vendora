import { z } from 'zod'

export const customerSchema = z.object({
  business_name: z.string().min(2, 'Business name is required'),
  contact_person: z.string().min(2, 'Contact person is required'),
  phone: z.string().min(8, 'Phone number is required'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  location: z.string().optional(),
  credit_limit: z.coerce.number().min(0).optional(),
  notes: z.string().optional(),
})

export type CustomerFormValues = z.infer<typeof customerSchema>
