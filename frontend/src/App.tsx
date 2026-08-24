import React from 'react'
import { Link } from 'react-router-dom'

const stats = [
  { label: 'Live customers', value: '2,480', trend: '+12.4%' },
  { label: 'Orders today', value: '184', trend: '+8.1%' },
  { label: 'Collections', value: 'KSh 1.8M', trend: '+6.9%' },
]

const features = [
  { title: 'Smart sales pipeline', text: 'Track customer activity, payments, and overdue balances in one place.' },
  { title: 'Fast operations', text: 'Move from orders to inventory and reconciliations without bottlenecks.' },
  { title: 'Client clarity', text: 'Give customers a clean portal to review invoices and repayment activity.' },
]

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#185cff] text-base font-black text-white shadow-[0_10px_20px_rgba(24,92,255,0.2)]">
              V
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">Vendora</h1>
            </div>
          </div>

          <nav className="hidden items-center gap-7 text-sm text-slate-600 md:flex">
            <Link to="/dashboard" className="transition hover:text-slate-900">Dashboard</Link>
            <Link to="/client" className="transition hover:text-slate-900">Client Portal</Link>
            <Link to="/login" className="transition hover:text-slate-900">Login</Link>
          </nav>

          <Link to="/dashboard" className="rounded-xl bg-[#185cff] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(24,92,255,0.18)] transition hover:bg-[#1248d8]">
            Open app
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <section className="grid items-center gap-10 lg:grid-cols-[1.12fr_0.88fr]">
          <div>
            <span className="inline-flex rounded-full border border-[#cfe0ff] bg-[#edf4ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
              Built for growth
            </span>
            <h2 className="mt-6 max-w-xl text-4xl font-bold tracking-[-0.06em] text-slate-900 md:text-6xl text-balance">
              Business software that feels focused, clear, and dependable.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Vendora helps small and growing businesses manage sales, inventory, payments, and customer relationships in one disciplined workspace.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/dashboard" className="rounded-xl bg-[#185cff] px-6 py-3 font-semibold text-white shadow-[0_10px_20px_rgba(24,92,255,0.18)] transition hover:bg-[#1248d8]">
                View dashboard
              </Link>
              <Link to="/client" className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:bg-slate-50">
                Client portal
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
            <div className="rounded-xl bg-[#0f172a] p-5 text-white shadow-inner shadow-slate-800/60">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Performance</p>
                  <h3 className="mt-2 text-4xl font-bold">KSh 6.4M</h3>
                </div>
                <div className="rounded-lg bg-[#185cff]/15 px-3 py-2 text-sm font-semibold text-[#cfe0ff]">
                  +24.8%
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {[55, 68, 82, 74, 90].map((bar, i) => (
                  <div key={i}>
                    <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                      <span>Week {i + 1}</span>
                      <span>{bar}%</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-800">
                      <div
                        className="h-2.5 rounded-full bg-gradient-to-r from-[#3d7cff] to-[#9fc0ff]"
                        style={{ width: `${bar}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-5 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
              <p className="text-sm text-slate-500">{stat.label}</p>
              <div className="mt-4 flex items-end justify-between gap-3">
                <h3 className="text-3xl font-bold tracking-tight text-slate-900">{stat.value}</h3>
                <span className="rounded-full bg-[#edf4ff] px-2.5 py-1 text-xs font-semibold text-[#1d4ed8]">
                  {stat.trend}
                </span>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf4ff] text-lg font-bold text-[#185cff]">
                ✦
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{feature.text}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}
