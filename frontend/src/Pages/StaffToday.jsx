import { useEffect, useState } from 'react'

const API_BASE = 'http://localhost:5000/api'

const formatCurrency = (value) => `KES ${Number(value || 0).toLocaleString()}`

function StaffToday() {
  const [activity, setActivity] = useState({ summary: { totalCustomers: 0, totalOrders: 0, totalPayments: 0, openOrders: 0 }, recentOrders: [], payments: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('vendoraStaffToken')
    const fetchActivity = async () => {
      try {
        const response = await fetch(`${API_BASE}/staff/dashboard`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Unable to load activity')
        }

        const data = await response.json()
        setActivity(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivity()
  }, [])

  if (loading) {
    return <div className="rounded-2xl bg-white p-6 text-[#12372a] shadow-sm border border-[#eee5d2]">Loading today’s activity...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-[#12372a]">Today’s activity</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
          <p className="text-sm text-[#4b5563]">Orders logged</p>
          <p className="mt-3 text-2xl font-bold text-[#12372a]">{activity.todayActivity?.[0]?.value || 0}</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
          <p className="text-sm text-[#4b5563]">Payments received</p>
          <p className="mt-3 text-2xl font-bold text-[#12372a]">{activity.todayActivity?.[1]?.value || 0}</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
          <p className="text-sm text-[#4b5563]">New customers</p>
          <p className="mt-3 text-2xl font-bold text-[#12372a]">{activity.todayActivity?.[2]?.value || 0}</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
          <h2 className="text-lg font-bold text-[#12372a]">Recent orders</h2>
          <div className="mt-4 space-y-3">
            {activity.recentOrders?.length ? activity.recentOrders.slice(0, 4).map((order) => (
              <div key={order.id} className="flex items-center justify-between rounded-xl bg-[#f8f6ef] p-3">
                <div>
                  <p className="font-semibold text-[#12372a]">{order.customerName}</p>
                  <p className="text-xs text-[#4b5563]">{order.meatType}</p>
                </div>
                <p className="font-semibold text-[#12372a]">{formatCurrency(order.totalAmount)}</p>
              </div>
            )) : <p className="text-sm text-[#4b5563]">No order activity yet.</p>}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
          <h2 className="text-lg font-bold text-[#12372a]">Recent payments</h2>
          <div className="mt-4 space-y-3">
            {activity.payments?.length ? activity.payments.slice(0, 4).map((payment) => (
              <div key={payment.id} className="flex items-center justify-between rounded-xl bg-[#f8f6ef] p-3">
                <div>
                  <p className="font-semibold text-[#12372a]">{payment.customerName}</p>
                  <p className="text-xs text-[#4b5563]">{payment.method}</p>
                </div>
                <p className="font-semibold text-[#12372a]">{formatCurrency(payment.amount)}</p>
              </div>
            )) : <p className="text-sm text-[#4b5563]">No payments today.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StaffToday
