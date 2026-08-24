import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import Card from '../../components/ui/Card'

const metrics = [
  { label: 'Gross revenue', value: 'KSh 2.4M', delta: '+14.2%' },
  { label: 'Net margin', value: '28.4%', delta: '+2.1%' },
  { label: 'Collection rate', value: '91.7%', delta: '+5.3%' },
  { label: 'Refunds', value: 'KSh 62k', delta: '-1.8%' },
]

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Insights</p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.05em] text-slate-900">Reports</h1>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.label}>
              <p className="text-sm text-slate-500">{metric.label}</p>
              <div className="mt-3 flex items-end justify-between gap-3">
                <h2 className="text-2xl font-bold text-slate-900">{metric.value}</h2>
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">{metric.delta}</span>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <h2 className="text-xl font-bold text-slate-900">Revenue trend</h2>
            <div className="mt-6 flex h-56 items-end gap-3">
              {[42, 58, 50, 74, 68, 86, 91].map((height, index) => (
                <div key={index} className="flex flex-1 flex-col items-center gap-2">
                  <div className="w-full rounded-t-xl bg-gradient-to-t from-emerald-600 to-emerald-400" style={{ height: `${height}%` }} />
                  <span className="text-xs text-slate-400">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-slate-900">Operational notes</h2>
            <ul className="mt-5 space-y-4 text-sm text-slate-600">
              <li className="rounded-xl bg-slate-50 p-3">Collection efficiency improved by 5.3% against the last cycle.</li>
              <li className="rounded-xl bg-slate-50 p-3">Inventory stock turnover remains healthy across top-selling lines.</li>
              <li className="rounded-xl bg-slate-50 p-3">Three customers need payment follow-ups this week.</li>
            </ul>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
