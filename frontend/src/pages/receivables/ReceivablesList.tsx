import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

const receivables = [
  { customer: 'Njeri Mwangi', invoice: 'INV-1047', balance: 'KSh 52,000', due: 'Due in 3 days', status: 'overdue' },
  { customer: 'James Kibet', invoice: 'INV-1048', balance: 'KSh 18,250', due: 'Due in 8 days', status: 'pending' },
  { customer: 'David Oduor', invoice: 'INV-1051', balance: 'KSh 12,900', due: 'Due today', status: 'watch' },
]

export default function ReceivablesList() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Collections</p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.05em] text-slate-900">Receivables</h1>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Card>
            <p className="text-sm text-slate-500">Total receivables</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">KSh 348k</h2>
          </Card>
          <Card>
            <p className="text-sm text-slate-500">Collected this month</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">KSh 214k</h2>
          </Card>
          <Card>
            <p className="text-sm text-slate-500">At risk</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">12 accounts</h2>
          </Card>
        </div>

        <Card>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">Customer</th>
                  <th className="px-4 py-3 font-semibold">Invoice</th>
                  <th className="px-4 py-3 font-semibold">Balance</th>
                  <th className="px-4 py-3 font-semibold">Due</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {receivables.map((item) => (
                  <tr key={item.invoice} className="border-t border-slate-200 bg-white">
                    <td className="px-4 py-3 font-medium text-slate-800">{item.customer}</td>
                    <td className="px-4 py-3 text-slate-600">{item.invoice}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{item.balance}</td>
                    <td className="px-4 py-3 text-slate-600">{item.due}</td>
                    <td className="px-4 py-3">
                      <Badge tone={item.status === 'overdue' ? 'danger' : item.status === 'pending' ? 'warning' : 'neutral'}>
                        {item.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
