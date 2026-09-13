import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const API_BASE = 'http://localhost:5000/api'

function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [form, setForm] = useState({ customerName: '', meatType: 'Beef', quantity: 0, unitPrice: 0, amountPaid: 0, notes: '', orderStatus: 'Pending', paymentStatus: 'Outstanding' })
  const { getAuthHeaders } = useAuth()

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE}/orders`, { headers: getAuthHeaders() })
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Failed to fetch orders', error)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(form),
      })

      setForm({ customerName: '', meatType: 'Beef', quantity: 0, unitPrice: 0, amountPaid: 0, notes: '', orderStatus: 'Pending', paymentStatus: 'Outstanding' })
      fetchOrders()
    } catch (error) {
      console.error('Failed to add order', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-[#12372a]">Order Book</h1>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2] space-y-4">
        <h2 className="text-lg font-bold text-[#12372a]">Create order</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          <input name="customerName" value={form.customerName} onChange={handleChange} placeholder="Customer name" className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" required />
          <select name="meatType" value={form.meatType} onChange={handleChange} className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]">
            <option value="Beef">Beef</option>
            <option value="Goat">Goat</option>
            <option value="Mutton">Mutton</option>
            <option value="Chicken">Chicken</option>
          </select>
          <input type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="Qty" className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" required />
          <input type="number" name="unitPrice" value={form.unitPrice} onChange={handleChange} placeholder="Unit price" className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" required />
          <input type="number" name="amountPaid" value={form.amountPaid} onChange={handleChange} placeholder="Paid" className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" />
          <select name="orderStatus" value={form.orderStatus} onChange={handleChange} className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]">
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" className="min-h-24 w-full rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" />
        <button type="submit" className="rounded-lg bg-[#12372a] px-4 py-2 font-semibold text-white hover:bg-[#1f6f4a]">Save order</button>
      </form>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm border border-[#eee5d2]">
        <table className="w-full text-sm">
          <thead className="border-b border-[#eee5d2] bg-[#f8f6ef]">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Order</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Customer</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Meat</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Qty</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Total</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Paid</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Balance</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-[#f2efe7] hover:bg-[#f8f6ef]">
                <td className="px-6 py-4 font-semibold text-[#12372a]">{order.id}</td>
                <td className="px-6 py-4 text-[#1f2933]">{order.customerName}</td>
                <td className="px-6 py-4 text-[#1f2933]">{order.meatType}</td>
                <td className="px-6 py-4 text-[#1f2933]">{order.quantity}</td>
                <td className="px-6 py-4 font-semibold text-[#12372a]">KES {Number(order.totalAmount || 0).toLocaleString()}</td>
                <td className="px-6 py-4 text-[#1f2933]">KES {Number(order.amountPaid || 0).toLocaleString()}</td>
                <td className="px-6 py-4 text-[#1f2933]">KES {Number(order.balance || 0).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    order.paymentStatus === 'Paid' ? 'bg-[#eaf3ec] text-[#2e7d32]' :
                    order.paymentStatus === 'Partially Paid' ? 'bg-[#f8f1d8] text-[#d97706]' :
                    'bg-[#fde8e7] text-[#c0392b]'
                  }`}>
                    {order.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminOrders
