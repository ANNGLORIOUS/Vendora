import React from 'react'
import { Link } from 'react-router-dom'

const items = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Customers', path: '/customers' },
  { label: 'Orders', path: '/orders' },
  { label: 'Payments', path: '/payments' },
]

export default function MobileNavigation() {
  return (
    <nav className="mt-6 grid grid-cols-2 gap-3 md:hidden">
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-center text-sm font-medium text-slate-700"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
