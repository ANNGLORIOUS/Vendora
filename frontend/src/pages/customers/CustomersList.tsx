import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import DashboardLayout from '../../layouts/DashboardLayout'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { api } from '../../services/api'

type Customer = {
  id: number
  name: string
  email?: string
  phone?: string
  address?: string
  created_at?: string
}

const fetchCustomers = async (): Promise<Customer[]> => {
  const response = await api.get('/customers/')
  return response.data
}

export default function CustomersList() {
  const queryClient = useQueryClient()
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' })

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  })

  const createCustomer = useMutation({
    mutationFn: async (payload: typeof form) => {
      const response = await api.post('/customers/', payload)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      setForm({ name: '', email: '', phone: '', address: '' })
    },
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.name.trim()) return
    createCustomer.mutate(form)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Operations</p>
            <h1 className="mt-2 text-3xl font-bold tracking-[-0.05em] text-slate-900">Customers</h1>
          </div>
          <Button type="button">Add customer</Button>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="grid gap-4 border-b border-slate-200 pb-5 md:grid-cols-4">
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Customer name"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:bg-white"
            />
            <input
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="Email"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:bg-white"
            />
            <input
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
              placeholder="Phone"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:bg-white"
            />
            <div className="flex gap-2">
              <input
                value={form.address}
                onChange={(event) => setForm({ ...form, address: event.target.value })}
                placeholder="Address"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:bg-white"
              />
              <Button type="submit" className="whitespace-nowrap" disabled={createCustomer.isPending}>
                {createCustomer.isPending ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>

          {isLoading ? (
            <p className="mt-5 text-sm text-slate-500">Loading customers...</p>
          ) : isError ? (
            <p className="mt-5 text-sm text-red-600">Unable to load customers from the backend.</p>
          ) : (
            <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Phone</th>
                    <th className="px-4 py-3 font-semibold">Address</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((customer) => (
                    <tr key={customer.id} className="border-t border-slate-200 bg-white">
                      <td className="px-4 py-3 font-medium text-slate-800">{customer.name}</td>
                      <td className="px-4 py-3 text-slate-600">{customer.email || '—'}</td>
                      <td className="px-4 py-3 text-slate-600">{customer.phone || '—'}</td>
                      <td className="px-4 py-3 text-slate-600">{customer.address || '—'}</td>
                      <td className="px-4 py-3">
                        <Badge tone="success">Active</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  )
}
