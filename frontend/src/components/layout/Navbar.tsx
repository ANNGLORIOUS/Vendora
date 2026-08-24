import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#059669] text-base font-black text-white shadow-sm">
            V
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Operations</p>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Vendora</h1>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-slate-600 md:flex">
          <Link to="/dashboard" className="transition hover:text-slate-900">Dashboard</Link>
          <Link to="/customers" className="transition hover:text-slate-900">Customers</Link>
          <Link to="/orders" className="transition hover:text-slate-900">Orders</Link>
          <Link to="/payments" className="transition hover:text-slate-900">Payments</Link>
          <Link to="/client" className="transition hover:text-slate-900">Portal</Link>
        </nav>

        <Link to="/login" className="rounded-lg bg-[#059669] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#047857]">
          Open app
        </Link>
      </div>
    </header>
  )
}
