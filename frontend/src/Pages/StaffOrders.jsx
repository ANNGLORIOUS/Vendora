import { useEffect, useState } from 'react'

const API_BASE = 'http://localhost:5000/api'

const formatCurrency = (value) => `KES ${Number(value || 0).toLocaleString()}`

function StaffOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('vendoraStaffToken')
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_BASE}/orders`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Unable to load orders')
        }

        const data = await response.json()
        setOrders(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error(error)
        setOrders([])
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (loading) {
    return <div className="rounded-2xl bg-white p-6 text-[#12372a] shadow-sm border border-[#eee5d2]">Loading orders...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-[#12372a]">Orders</h1>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm border border-[#eee5d2]">
        <table className="w-full text-sm">
          <thead className="border-b border-[#eee5d2] bg-[#f8f6ef]">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Customer</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Meat</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Qty</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Total</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Paid</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-[#4b5563]">No orders found.</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b border-[#f2efe7] hover:bg-[#f8f6ef]">
                  <td className="px-6 py-4 font-semibold text-[#12372a]">{order.customerName}</td>
                  <td className="px-6 py-4 text-[#1f2933]">{order.meatType}</td>
                  <td className="px-6 py-4 text-[#1f2933]">{order.quantity}</td>
                  <td className="px-6 py-4 font-semibold text-[#12372a]">{formatCurrency(order.totalAmount)}</td>
                  <td className="px-6 py-4 text-[#1f2933]">{formatCurrency(order.amountPaid)}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block rounded-full bg-[#eefaf3] px-3 py-1 text-xs font-semibold text-[#2e7d32]">{order.orderStatus || 'Pending'}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StaffOrders
