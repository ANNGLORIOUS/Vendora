import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_BASE = 'http://localhost:5000/api'

function StaffDashboard() {
  const [summary, setSummary] = useState({ totalCustomers: 0, totalOrders: 0, totalPayments: 0, openOrders: 0 })
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
          setSummary(data.summary)
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
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#d4a72c]">Staff dashboard</p>
            <h1 className="mt-2 text-3xl font-bold text-[#12372a]">Operations overview</h1>
          </div>
          <button onClick={handleLogout} className="rounded-lg bg-[#d4a72c] px-4 py-2 text-sm font-semibold text-[#12372a] hover:bg-[#e4b32d]">Logout</button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
            <p className="text-sm text-[#4b5563]">Customers</p>
            <p className="mt-3 text-2xl font-bold text-[#12372a]">{summary.totalCustomers}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
            <p className="text-sm text-[#4b5563]">Orders</p>
            <p className="mt-3 text-2xl font-bold text-[#12372a]">{summary.totalOrders}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
            <p className="text-sm text-[#4b5563]">Payments</p>
            <p className="mt-3 text-2xl font-bold text-[#12372a]">KES {Number(summary.totalPayments || 0).toLocaleString()}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
            <p className="text-sm text-[#4b5563]">Open orders</p>
            <p className="mt-3 text-2xl font-bold text-[#12372a]">{summary.openOrders}</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
          <h2 className="text-lg font-bold text-[#12372a]">Staff access</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-[#f8f6ef] p-4 text-sm text-[#12372a]">Customers</div>
            <div className="rounded-xl bg-[#f8f6ef] p-4 text-sm text-[#12372a]">Orders</div>
            <div className="rounded-xl bg-[#f8f6ef] p-4 text-sm text-[#12372a]">Payments</div>
          </div>
          <p className="mt-4 text-sm text-[#4b5563]">Staff access is limited to day-to-day operations and does not include full business settings and audit controls.</p>
        </div>
      </div>
    </div>
  )
}

export default StaffDashboard
