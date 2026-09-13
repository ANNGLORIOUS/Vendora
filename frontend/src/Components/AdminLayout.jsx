import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { admin, logout } = useAuth()
  const location = useLocation()

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { label: 'Products', path: '/admin/products', icon: '📦' },
    { label: 'Orders', path: '/admin/orders', icon: '🛒' },
    { label: 'Categories', path: '/admin/categories', icon: '🏷️' },
    { label: 'Discounts', path: '/admin/discounts', icon: '💰' },
    { label: 'Customers', path: '/admin/customers', icon: '👥' },
    { label: 'Settings', path: '/admin/settings', icon: '⚙️' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto bg-(--brand-900) text-white transition-transform duration-300 md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-(--brand-700) px-6 py-4">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            Skybee
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
                  ? 'bg-(--brand-700) text-white'
                  : 'text-(--brand-200) hover:bg-(--brand-800)'
              }`}
            >
              <span className="mr-2">{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-(--brand-700) px-4 py-6">
          <p className="text-xs text-(--brand-300)">Logged in as</p>
          <p className="mt-1 font-semibold text-white">{admin?.email}</p>
          <button
            onClick={() => {
              logout()
              window.location.href = '/admin/login'
            }}
            className="mt-4 w-full rounded-lg bg-(--brand-700) px-4 py-2 text-sm font-medium transition hover:bg-(--brand-600)"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Top Bar */}
        <div className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg bg-gray-200 p-2 text-gray-700 md:hidden"
          >
            ☰
          </button>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
            <Link to="/" className="rounded-full bg-(--brand-100) px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-(--brand-900) transition hover:bg-(--brand-200)">
              View Store
            </Link>
          </div>

          <Link to="/admin/dashboard" className="rounded-full border border-(--brand-300) px-3 py-1.5 text-sm font-medium text-(--brand-900) transition hover:bg-(--brand-50)">
            Back to Admin
          </Link>
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

      {/* Overlay */}
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
