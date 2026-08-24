import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { paymentSchema, type PaymentFormValues } from '../../schemas/payment.schema'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function PaymentForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
  })

  const onSubmit = (data: PaymentFormValues) => {
    console.log('Payment form submitted:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Customer ID</label>
          <Input type="number" {...register('customer_id', { valueAsNumber: true })} />
          {errors.customer_id && <p className="mt-1 text-xs text-red-600">{errors.customer_id.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Amount</label>
          <Input type="number" {...register('amount', { valueAsNumber: true })} />
          {errors.amount && <p className="mt-1 text-xs text-red-600">{errors.amount.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Payment method</label>
          <select {...register('method')} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100">
            <option value="Mpesa">Mpesa</option>
            <option value="Bank">Bank</option>
            <option value="Cash">Cash</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Reference</label>
          <Input {...register('reference')} placeholder="TXN-001" />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary">Cancel</Button>
        <Button type="submit">Record payment</Button>
      </div>
    </form>
  )
}
