import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_BASE = 'http://localhost:5000/api'

const defaultDashboard = {
  summary: { totalCustomers: 0, totalOrders: 0, totalPayments: 0, openOrders: 0 },
  recentOrders: [],
  pendingOrders: [],
  payments: [],
  customers: [],
  todayActivity: [],
  permissions: {
    allowed: ['Orders', 'Customers', 'Payments', "Today's activity", 'Pending orders', 'Quick actions'],
    restricted: ['Business Settings', 'Financial configuration', 'User management', 'Sensitive reports'],
  },
}

const formatCurrency = (value) => `KES ${Number(value || 0).toLocaleString()}`

const formatDate = (value) => {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('en-KE', { month: 'short', day: 'numeric', year: 'numeric' })
}

function StaffDashboard() {
  const [dashboard, setDashboard] = useState(defaultDashboard)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('vendoraStaffToken')
    if (!token) {
      navigate('/staff/login', { replace: true })
      return
    }

    const fetchDashboard = async () => {
      try {
        const response = await fetch(`${API_BASE}/staff/dashboard`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('vendoraStaffToken')
          localStorage.removeItem('staffData')
          navigate('/staff/login', { replace: true })
          return
        }

        const data = await response.json()
        if (data?.success) {
          setDashboard({ ...defaultDashboard, ...data })
        }
      } catch (error) {
        console.error('Failed to load staff dashboard', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('vendoraStaffToken')
    localStorage.removeItem('staffData')
    navigate('/staff/login', { replace: true })
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-[#12372a]">Loading staff dashboard...</div>
  }

  return (
    <div className="min-h-screen bg-[#f8f6ef] p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#d4a72c]">Staff dashboard</p>
            <h1 className="mt-2 text-3xl font-bold text-[#12372a]">Operations overview</h1>
          </div>
          <button onClick={handleLogout} className="rounded-lg bg-[#d4a72c] px-4 py-2 text-sm font-semibold text-[#12372a] hover:bg-[#e4b32d]">Logout</button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
            <p className="text-sm text-[#4b5563]">Customers</p>
            <p className="mt-3 text-2xl font-bold text-[#12372a]">{dashboard.summary.totalCustomers}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
            <p className="text-sm text-[#4b5563]">Orders</p>
            <p className="mt-3 text-2xl font-bold text-[#12372a]">{dashboard.summary.totalOrders}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
            <p className="text-sm text-[#4b5563]">Payments</p>
            <p className="mt-3 text-2xl font-bold text-[#12372a]">{formatCurrency(dashboard.summary.totalPayments)}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
            <p className="text-sm text-[#4b5563]">Open orders</p>
            <p className="mt-3 text-2xl font-bold text-[#12372a]">{dashboard.summary.openOrders}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#12372a]">Recent orders</h2>
              <span className="rounded-full bg-[#f8f6ef] px-2 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#12372a]">Operations</span>
            </div>

            <div className="space-y-3">
              {dashboard.recentOrders.length === 0 ? (
                <p className="text-sm text-[#4b5563]">No recent orders yet.</p>
              ) : (
                dashboard.recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between gap-3 rounded-xl bg-[#f8f6ef] p-3">
                    <div>
                      <p className="font-semibold text-[#12372a]">{order.customerName}</p>
                      <p className="text-xs text-[#4b5563]">{order.meatType} • {formatDate(order.orderDate)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[#12372a]">{formatCurrency(order.totalAmount)}</p>
                      <p className="text-xs text-[#4b5563]">{order.orderStatus}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
            <h2 className="text-lg font-bold text-[#12372a]">Quick actions</h2>
            <div className="mt-4 space-y-3">
              <button className="w-full rounded-xl bg-[#12372a] px-4 py-3 text-left text-sm font-semibold text-white hover:bg-[#1f6f4a]">Create new order</button>
              <button className="w-full rounded-xl border border-[#d4a72c] bg-[#fffaf0] px-4 py-3 text-left text-sm font-semibold text-[#12372a] hover:bg-[#f9f0d0]">Add customer</button>
              <button className="w-full rounded-xl border border-[#e7dcc4] bg-white px-4 py-3 text-left text-sm font-semibold text-[#12372a] hover:bg-[#f8f6ef]">Record payment</button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
            <h2 className="text-lg font-bold text-[#12372a]">Pending orders</h2>
            <div className="mt-4 space-y-3">
              {dashboard.pendingOrders.length === 0 ? (
                <p className="text-sm text-[#4b5563]">No pending work.</p>
              ) : (
                dashboard.pendingOrders.map((order) => (
                  <div key={order.id} className="rounded-xl bg-[#f8f6ef] p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-[#12372a]">{order.customerName}</p>
                      <span className="rounded-full bg-[#fff4d1] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12372a]">{order.orderStatus}</span>
                    </div>
                    <p className="mt-2 text-sm text-[#4b5563]">{order.meatType} • {formatCurrency(order.balance)}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
            <h2 className="text-lg font-bold text-[#12372a]">Customers</h2>
            <div className="mt-4 space-y-3">
              {dashboard.customers.length === 0 ? (
                <p className="text-sm text-[#4b5563]">No customers available.</p>
              ) : (
                dashboard.customers.map((customer) => (
                  <div key={customer.id} className="rounded-xl bg-[#f8f6ef] p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-[#12372a]">{customer.name}</p>
                      <span className="text-xs text-[#4b5563]">{customer.status}</span>
                    </div>
                    <p className="mt-1 text-xs text-[#4b5563]">{customer.location || 'Location not set'} • {customer.phone}</p>
                    <p className="mt-2 text-xs text-[#12372a]">Outstanding: {formatCurrency(customer.outstandingBalance)}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
            <h2 className="text-lg font-bold text-[#12372a]">Today's activity</h2>
            <div className="mt-4 space-y-3">
              {dashboard.todayActivity.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-xl bg-[#f8f6ef] p-3">
                  <span className="text-sm text-[#4b5563]">{item.label}</span>
                  <span className="text-xl font-bold text-[#12372a]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
          <h2 className="text-lg font-bold text-[#12372a]">Latest payments</h2>
          <div className="mt-4 space-y-3">
            {dashboard.payments.length === 0 ? (
              <p className="text-sm text-[#4b5563]">No payments recorded.</p>
            ) : (
              dashboard.payments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between gap-3 rounded-xl bg-[#f8f6ef] p-3">
                  <div>
                    <p className="font-semibold text-[#12372a]">{payment.customerName}</p>
                    <p className="text-xs text-[#4b5563]">{payment.method} • {formatDate(payment.paymentDate)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#12372a]">{formatCurrency(payment.amount)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StaffDashboard
