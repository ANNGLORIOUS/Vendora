import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { customerSchema, type CustomerFormValues } from '../../schemas/customer.schema'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function CustomerForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
  })

  const onSubmit = (data: CustomerFormValues) => {
    console.log('Customer form submitted:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Business name</label>
          <Input {...register('business_name')} placeholder="Mama Mboga Trading" />
          {errors.business_name && <p className="mt-1 text-xs text-red-600">{errors.business_name.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Contact person</label>
          <Input {...register('contact_person')} placeholder="Jane Muriuki" />
          {errors.contact_person && <p className="mt-1 text-xs text-red-600">{errors.contact_person.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Phone</label>
          <Input {...register('phone')} placeholder="0712 345 678" />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
          <Input {...register('email')} type="email" placeholder="customer@example.com" />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Location</label>
        <Input {...register('location')} placeholder="Nairobi" />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary">Cancel</Button>
        <Button type="submit">Save customer</Button>
      </div>
    </form>
  )
}
