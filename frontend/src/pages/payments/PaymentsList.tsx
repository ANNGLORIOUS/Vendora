import React from 'react'
import { useQuery } from '@tanstack/react-query'
import DashboardLayout from '../../layouts/DashboardLayout'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { api } from '../../services/api'

type Payment = {
  id: number
  customer: number
  order: number
  amount: number | string
  method: string
  reference?: string
  created_at?: string
}

const fetchPayments = async (): Promise<Payment[]> => {
  const response = await api.get('/payments/')
  return response.data
}

export default function PaymentsList() {
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['payments'],
    queryFn: fetchPayments,
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Collections</p>
            <h1 className="mt-2 text-3xl font-bold tracking-[-0.05em] text-slate-900">Payments</h1>
          </div>
          <Button type="button">Record payment</Button>
        </div>

        <Card>
          {isLoading ? (
            <p className="text-sm text-slate-500">Loading payments...</p>
          ) : isError ? (
            <p className="text-sm text-red-600">Unable to load payments from the backend.</p>
          ) : (
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Reference</th>
                    <th className="px-4 py-3 font-semibold">Customer</th>
                    <th className="px-4 py-3 font-semibold">Method</th>
                    <th className="px-4 py-3 font-semibold">Amount</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((payment) => (
                    <tr key={payment.id} className="border-t border-slate-200 bg-white">
                      <td className="px-4 py-3 font-medium text-slate-800">{payment.reference || `TXN-${payment.id}`}</td>
                      <td className="px-4 py-3 text-slate-600">Customer #{payment.customer}</td>
                      <td className="px-4 py-3 text-slate-600">{payment.method}</td>
                      <td className="px-4 py-3 font-semibold text-slate-800">KSh {Number(payment.amount || 0).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <Badge tone="success">Confirmed</Badge>
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
