import { useEffect, useState } from 'react'

const API_BASE = 'http://localhost:5000/api'

const formatCurrency = (value) => `KES ${Number(value || 0).toLocaleString()}`

function StaffPending() {
  const [pendingOrders, setPendingOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('vendoraStaffToken')
    const fetchPending = async () => {
      try {
        const response = await fetch(`${API_BASE}/staff/dashboard`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Unable to load pending orders')
        }

        const data = await response.json()
        setPendingOrders(Array.isArray(data.pendingOrders) ? data.pendingOrders : [])
      } catch (error) {
        console.error(error)
        setPendingOrders([])
      } finally {
        setLoading(false)
      }
    }

    fetchPending()
  }, [])

  if (loading) {
    return <div className="rounded-2xl bg-white p-6 text-[#12372a] shadow-sm border border-[#eee5d2]">Loading pending work...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-[#12372a]">Pending orders</h1>
      </div>

      <div className="space-y-4">
        {pendingOrders.length === 0 ? (
          <div className="rounded-2xl bg-white p-6 text-[#4b5563] shadow-sm border border-[#eee5d2]">No pending orders to follow up.</div>
        ) : (
          pendingOrders.map((order) => (
            <div key={order.id} className="rounded-2xl bg-white p-5 shadow-sm border border-[#eee5d2]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-bold text-[#12372a]">{order.customerName}</p>
                  <p className="text-sm text-[#4b5563]">{order.meatType} • {order.quantity} units</p>
                </div>
                <span className="rounded-full bg-[#fff4d1] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#12372a]">{order.orderStatus}</span>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-3 text-sm text-[#1f2933]">
                <div>Balance: <span className="font-semibold text-[#12372a]">{formatCurrency(order.balance)}</span></div>
                <div>Amount paid: <span className="font-semibold text-[#12372a]">{formatCurrency(order.amountPaid)}</span></div>
                <div>Due: <span className="font-semibold text-[#12372a]">{order.paymentStatus}</span></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default StaffPending
