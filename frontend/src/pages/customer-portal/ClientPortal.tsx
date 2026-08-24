import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'

const invoices = [
  { name: 'Invoice #1042', status: 'Paid', amount: 'KSh 42,500' },
  { name: 'Invoice #1047', status: 'Pending', amount: 'KSh 18,250' },
  { name: 'Invoice #1051', status: 'Overdue', amount: 'KSh 12,900' },
]

const payments = [
  { label: 'Last payment', value: 'KSh 60,000', date: '03 Aug 2026' },
  { label: 'Remaining balance', value: 'KSh 18,250', date: 'Due 24 Aug' },
  { label: 'Payment score', value: '94%', date: 'Excellent' },
]

export default function ClientPortal() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="rounded-2xl bg-[#0f172a] p-7 text-white shadow-[0_12px_30px_rgba(15,23,42,0.12)]">
          <p className="text-[11px] uppercase tracking-[0.24em] text-emerald-300">Customer portal</p>
          <h1 className="mt-3 text-3xl font-bold tracking-[-0.05em]">Hello, Jane</h1>
          <p className="mt-2 max-w-xl text-slate-300">Your account is up to date. Your current balance is KSh 18,250.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {payments.map((payment) => (
            <div key={payment.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
              <p className="text-sm text-slate-500">{payment.label}</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{payment.value}</h2>
              <p className="mt-2 text-[11px] uppercase tracking-[0.15em] text-slate-400">{payment.date}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Invoices</h3>
              <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700">Pay now</button>
            </div>

            <div className="mt-5 space-y-3">
              {invoices.map((invoice) => (
                <div key={invoice.name} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div>
                    <p className="font-semibold text-slate-800">{invoice.name}</p>
                    <p className="text-sm text-slate-500">{invoice.amount}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    invoice.status === 'Paid'
                      ? 'bg-emerald-100 text-emerald-700'
                      : invoice.status === 'Pending'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                  }`}>
                    {invoice.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
            <h3 className="text-xl font-bold text-slate-900">Account summary</h3>
            <div className="mt-5 space-y-4">
              <div className="rounded-xl bg-emerald-50 p-4">
                <p className="text-sm font-medium text-emerald-700">Next due</p>
                <p className="mt-1 text-xl font-bold text-emerald-900">KSh 18,250</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-medium text-slate-600">Payment history</p>
                <p className="mt-1 text-xl font-bold text-slate-900">12 successful</p>
              </div>
              <div className="rounded-xl bg-amber-50 p-4">
                <p className="text-sm font-medium text-amber-700">Alerts</p>
                <p className="mt-1 text-xl font-bold text-amber-900">1 reminder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
