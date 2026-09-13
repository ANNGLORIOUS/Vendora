import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { admin, logout } = useAuth()
  const location = useLocation()

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { label: 'Customers', path: '/admin/customers', icon: '👥' },
    { label: 'Orders', path: '/admin/orders', icon: '🥩' },
    { label: 'Payments', path: '/admin/payments', icon: '💰' },
    { label: 'Cow Purchases', path: '/admin/cows', icon: '🐄' },
    { label: 'Settings', path: '/admin/settings', icon: '⚙️' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="flex min-h-screen bg-[#f8f6ef]">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto bg-[#12372a] text-white transition-transform duration-300 md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-[#1f6f4a] px-6 py-4">
          <Link to="/admin/dashboard" className="flex items-center gap-2 text-xl font-bold tracking-wide">
            VENDORA
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">✕</button>
        </div>

        <nav className="space-y-2 px-4 py-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`block rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive(item.path)
                  ? 'bg-[#1f6f4a] text-white'
                  : 'text-[#e7f0ea] hover:bg-[#1b4f3d]'
              }`}
            >
              <span className="mr-2">{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-[#1f6f4a] px-4 py-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[#d4a72c]">Logged in as</p>
          <p className="mt-2 font-semibold text-white">{admin?.email || 'admin@vendora.co'}</p>
          <button
            onClick={() => {
              logout()
              window.location.href = '/admin/login'
            }}
            className="mt-4 w-full rounded-lg bg-[#d4a72c] px-4 py-2 text-sm font-semibold text-[#12372a] transition hover:bg-[#e7b92e]"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <div className="sticky top-0 z-40 flex items-center justify-between border-b border-[#e6dfd0] bg-white/90 px-6 py-4 shadow-sm backdrop-blur">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg bg-[#f3efe5] p-2 text-[#12372a] md:hidden"
          >
            ☰
          </button>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-[#12372a]">Business Dashboard</h1>
          </div>

          <Link to="/admin/dashboard" className="rounded-full border border-[#d4a72c] px-3 py-1.5 text-sm font-medium text-[#12372a] transition hover:bg-[#f8f6ef]">
            Vendora admin
          </Link>
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}
    </div>
  )
}

export default AdminLayout
