import React from 'react'

type StatsCardProps = {
  label: string
  value: string
  change: string
  tone: string
}

export default function StatsCard({ label, value, change, tone }: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
      <div className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>{change}</div>
      <p className="mt-4 text-sm text-slate-500">{label}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</h2>
    </div>
  )
}
