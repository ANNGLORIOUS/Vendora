import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { orderSchema, type OrderFormValues } from '../../schemas/order.schema'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function OrderForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      items: [{ product_id: 1, quantity: 1, unit_price: 500 }],
    },
  })

  const onSubmit = (data: OrderFormValues) => {
    console.log('Order form submitted:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Customer ID</label>
          <Input type="number" {...register('customer_id', { valueAsNumber: true })} />
          {errors.customer_id && <p className="mt-1 text-xs text-red-600">{errors.customer_id.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Product ID</label>
          <Input type="number" {...register('items.0.product_id', { valueAsNumber: true })} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Quantity</label>
          <Input type="number" {...register('items.0.quantity', { valueAsNumber: true })} />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Unit price</label>
          <Input type="number" {...register('items.0.unit_price', { valueAsNumber: true })} />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary">Cancel</Button>
        <Button type="submit">Create order</Button>
      </div>
    </form>
  )
}
