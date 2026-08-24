import React from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Customers', path: '/customers' },
  { label: 'Orders', path: '/orders' },
  { label: 'Products', path: '/products' },
  { label: 'Payments', path: '/payments' },
  { label: 'Receivables', path: '/receivables' },
  { label: 'Reports', path: '/reports' },
  { label: 'Settings', path: '/settings' },
]

export default function Sidebar() {
  return (
    <aside className="w-72 border-r border-[color:var(--border)] bg-[color:var(--panel)] px-5 py-6 text-[color:var(--muted)] shadow-[var(--shadow-card)]">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--primary)] text-lg font-black text-white shadow-[var(--shadow-soft)]">
          <img src="/src/assets/logo.png" alt="Vendora" className="h-7 w-7 object-contain" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--muted)]">Operations</p>
          <h2 className="text-xl font-bold text-[color:var(--text)]">Vendora</h2>
        </div>
      </div>

      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive ? 'bg-[color:var(--primary-light)] text-[color:var(--primary-dark)]' : 'text-[color:var(--muted)] hover:bg-[color:var(--panel-soft)] hover:text-[color:var(--text)]'
              }`
            }
          >
            <span>{link.label}</span>
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--border)] transition group-hover:bg-[color:var(--primary)]" />
          </NavLink>
        ))}
      </nav>
      <div className="mt-8 rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel-soft)] p-4 shadow-[var(--shadow-soft)]">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[color:var(--primary-dark)]">This month</p>
        <p className="mt-2 text-3xl font-bold text-[color:var(--text)]">KSh 1.8M</p>
        <p className="mt-1 text-xs font-medium text-[color:var(--primary-dark)]">+18.2% from last month</p>
      </div>
    </aside>
  )
}
