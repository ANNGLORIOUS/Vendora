import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'

const cards = [
  { label: 'Total customers', value: '2,480', tone: 'bg-emerald-50 text-emerald-700', change: '+12.4%' },
  { label: 'Orders today', value: '184', tone: 'bg-amber-50 text-amber-700', change: '+8.1%' },
  { label: 'Outstanding', value: 'KSh 846k', tone: 'bg-slate-100 text-slate-700', change: '-4.2%' },
]

const salesRows = [
  { customer: 'Njeri Mwangi', product: 'Holstein Cow', date: '12 Aug', amount: 'KSh 120,000', status: 'Paid' },
  { customer: 'James Kibet', product: 'Dairy Feed', date: '11 Aug', amount: 'KSh 36,500', status: 'Pending' },
  { customer: 'Mary Achieng', product: 'Vaccination', date: '10 Aug', amount: 'KSh 18,200', status: 'Paid' },
  { customer: 'David Oduor', product: 'Milk Cooler', date: '09 Aug', amount: 'KSh 48,000', status: 'Overdue' },
]

const activities = [
  'Invoice #1047 sent to James Kibet',
  'New order received from Mary Achieng',
  'Supplier payment approved for feed batch',
  'Customer reminder scheduled for David Oduor',
]

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Overview</p>
            <h1 className="mt-2 text-3xl font-bold tracking-[-0.05em] text-slate-900">Dashboard</h1>
          </div>
          <button className="rounded-lg bg-[#059669] px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-[#047857]">
            Export report
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
              <div className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${card.tone}`}>
                {card.change}
              </div>
              <p className="mt-4 text-sm text-slate-500">{card.label}</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{card.value}</h2>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Sales trends</h3>
              <span className="text-sm text-slate-500">Last 7 days</span>
            </div>

            <div className="flex h-56 items-end gap-3">
              {[42, 58, 50, 72, 68, 86, 92].map((value, index) => (
                <div key={index} className="flex flex-1 flex-col items-center gap-2">
                  <div className="w-full rounded-t-xl bg-gradient-to-t from-emerald-600 to-emerald-400" style={{ height: `${value}%` }} />
                  <span className="text-xs text-slate-400">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white shadow-[0_12px_28px_rgba(15,23,42,0.12)]">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Priority</p>
            <h3 className="mt-4 text-2xl font-bold">Receivables</h3>
            <div className="mt-6 space-y-4">
              <div>
                <div className="flex justify-between text-sm text-slate-300">
                  <span>Overdue</span>
                  <span>34%</span>
                </div>
                <div className="mt-2 h-2.5 rounded-full bg-slate-800">
                  <div className="h-2.5 w-[34%] rounded-full bg-amber-400" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-slate-300">
                  <span>Collected</span>
                  <span>68%</span>
                </div>
                <div className="mt-2 h-2.5 rounded-full bg-slate-800">
                  <div className="h-2.5 w-[68%] rounded-full bg-emerald-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Recent sales</h3>
              <button className="text-sm font-semibold text-emerald-700">View all</button>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Customer</th>
                    <th className="px-4 py-3 font-semibold">Product</th>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Amount</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {salesRows.map((row) => (
                    <tr key={row.customer} className="border-t border-slate-200 bg-white">
                      <td className="px-4 py-3 font-medium text-slate-800">{row.customer}</td>
                      <td className="px-4 py-3 text-slate-600">{row.product}</td>
                      <td className="px-4 py-3 text-slate-600">{row.date}</td>
                      <td className="px-4 py-3 font-semibold text-slate-800">{row.amount}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          row.status === 'Paid'
                            ? 'bg-emerald-100 text-emerald-700'
                            : row.status === 'Pending'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-red-100 text-red-700'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
            <h3 className="text-xl font-bold text-slate-900">Recent activity</h3>
            <div className="mt-5 space-y-4">
              {activities.map((activity) => (
                <div key={activity} className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-600" />
                  <p className="text-sm text-slate-600">{activity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
