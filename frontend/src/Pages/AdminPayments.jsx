import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const API_BASE = 'http://localhost:5000/api'

function AdminPayments() {
  const [payments, setPayments] = useState([])
  const [form, setForm] = useState({ orderId: '', customerName: '', amount: '', paymentDate: new Date().toISOString().slice(0, 10), method: 'Mpesa', notes: '' })
  const { getAuthHeaders } = useAuth()

  const fetchPayments = async () => {
    try {
      const response = await fetch(`${API_BASE}/payments`, { headers: getAuthHeaders() })
      const data = await response.json()
      setPayments(data)
    } catch (error) {
      console.error('Failed to fetch payments', error)
    }
  }

  useEffect(() => {
    fetchPayments()
  }, [])

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await fetch(`${API_BASE}/payments`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(form),
      })

      setForm({ orderId: '', customerName: '', amount: '', paymentDate: new Date().toISOString().slice(0, 10), method: 'Mpesa', notes: '' })
      fetchPayments()
    } catch (error) {
      console.error('Failed to add payment', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-[#12372a]">Payment Ledger</h1>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2] space-y-4">
        <h2 className="text-lg font-bold text-[#12372a]">Record payment</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <input name="orderId" value={form.orderId} onChange={handleChange} placeholder="Order ID" className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" required />
          <input name="customerName" value={form.customerName} onChange={handleChange} placeholder="Customer" className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" required />
          <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" required />
          <input type="date" name="paymentDate" value={form.paymentDate} onChange={handleChange} className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" required />
          <select name="method" value={form.method} onChange={handleChange} className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]">
            <option value="Mpesa">Mpesa</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cash">Cash</option>
          </select>
        </div>
        <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" className="min-h-24 w-full rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" />
        <button type="submit" className="rounded-lg bg-[#12372a] px-4 py-2 font-semibold text-white hover:bg-[#1f6f4a]">Save payment</button>
      </form>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm border border-[#eee5d2]">
        <table className="w-full text-sm">
          <thead className="border-b border-[#eee5d2] bg-[#f8f6ef]">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Date</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Order</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Customer</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Amount</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Method</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Notes</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b border-[#f2efe7] hover:bg-[#f8f6ef]">
                <td className="px-6 py-4 text-[#1f2933]">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 font-semibold text-[#12372a]">{payment.orderId}</td>
                <td className="px-6 py-4 text-[#1f2933]">{payment.customerName}</td>
                <td className="px-6 py-4 font-semibold text-[#12372a]">KES {Number(payment.amount || 0).toLocaleString()}</td>
                <td className="px-6 py-4 text-[#1f2933]">{payment.method}</td>
                <td className="px-6 py-4 text-[#1f2933]">{payment.notes || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminPayments
