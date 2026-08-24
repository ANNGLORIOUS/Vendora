import React from 'react'
import { useQuery } from '@tanstack/react-query'
import DashboardLayout from '../../layouts/DashboardLayout'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { api } from '../../services/api'

type Order = {
  id: number
  customer: number
  status: string
  total: number | string
  discount?: number | string
  notes?: string
  created_at?: string
}

const fetchOrders = async (): Promise<Order[]> => {
  const response = await api.get('/orders/')
  return response.data
}

export default function OrdersList() {
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Sales</p>
            <h1 className="mt-2 text-3xl font-bold tracking-[-0.05em] text-slate-900">Orders</h1>
          </div>
          <Button type="button">Create order</Button>
        </div>

        <Card>
          {isLoading ? (
            <p className="text-sm text-slate-500">Loading orders...</p>
          ) : isError ? (
            <p className="text-sm text-red-600">Unable to load orders from the backend.</p>
          ) : (
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Order</th>
                    <th className="px-4 py-3 font-semibold">Customer</th>
                    <th className="px-4 py-3 font-semibold">Total</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((order) => (
                    <tr key={order.id} className="border-t border-slate-200 bg-white">
                      <td className="px-4 py-3 font-medium text-slate-800">#{order.id}</td>
                      <td className="px-4 py-3 text-slate-600">Customer #{order.customer}</td>
                      <td className="px-4 py-3 font-semibold text-slate-800">KSh {Number(order.total || 0).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <Badge
                          tone={
                            order.status === 'PAID' || order.status === 'Paid'
                              ? 'success'
                              : order.status === 'PENDING' || order.status === 'Pending'
                                ? 'warning'
                                : 'danger'
                          }
                        >
                          {order.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{order.notes || '—'}</td>
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
