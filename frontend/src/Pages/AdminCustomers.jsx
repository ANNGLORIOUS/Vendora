import { useEffect, useState } from 'react'

const API_BASE = 'http://localhost:5000/api'

function AdminCustomers() {
  const [customers, setCustomers] = useState([])
  const [form, setForm] = useState({ name: '', contactPerson: '', phone: '', location: '', status: 'Active' })

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${API_BASE}/customers`)
      const data = await response.json()
      setCustomers(data)
    } catch (error) {
      console.error('Failed to fetch customers', error)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await fetch(`${API_BASE}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      setForm({ name: '', contactPerson: '', phone: '', location: '', status: 'Active' })
      fetchCustomers()
    } catch (error) {
      console.error('Failed to add customer', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-[#12372a]">Customer Ledger</h1>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2] space-y-4">
        <h2 className="text-lg font-bold text-[#12372a]">Add customer</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Customer name" className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" required />
          <input name="contactPerson" value={form.contactPerson} onChange={handleChange} placeholder="Contact person" className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone number" className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" required />
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" />
          <select name="status" value={form.status} onChange={handleChange} className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]">
            <option value="Active">Active</option>
            <option value="VIP">VIP</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button type="submit" className="rounded-lg bg-[#12372a] px-4 py-2 font-semibold text-white hover:bg-[#1f6f4a]">Save customer</button>
      </form>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm border border-[#eee5d2]">
        <table className="w-full text-sm">
          <thead className="border-b border-[#eee5d2] bg-[#f8f6ef]">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Name</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Contact</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Phone</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Location</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Status</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Outstanding</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Orders</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-[#f2efe7] hover:bg-[#f8f6ef]">
                <td className="px-6 py-4 text-[#12372a] font-semibold">{customer.name}</td>
                <td className="px-6 py-4 text-[#1f2933]">{customer.contactPerson || '—'}</td>
                <td className="px-6 py-4 text-[#1f2933]">{customer.phone}</td>
                <td className="px-6 py-4 text-[#1f2933]">{customer.location || '—'}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    customer.status === 'Active' ? 'bg-[#eaf3ec] text-[#2e7d32]' : customer.status === 'VIP' ? 'bg-[#f8f1d8] text-[#d97706]' : 'bg-[#fde8e7] text-[#c0392b]'
                  }`}>
                    {customer.status || 'Active'}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold text-[#12372a]">KES {Number(customer.outstandingBalance || 0).toLocaleString()}</td>
                <td className="px-6 py-4 text-[#1f2933] font-semibold">{customer.totalOrders || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminCustomers
