import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const API_BASE = 'http://localhost:5000/api'

function AdminSuppliers() {
  const [suppliers, setSuppliers] = useState([])
  const [form, setForm] = useState({ name: '', phone: '', email: '', location: '', status: 'Active' })
  const { getAuthHeaders } = useAuth()

  const fetchSuppliers = async () => {
    try {
      const response = await fetch(`${API_BASE}/suppliers`, { headers: getAuthHeaders() })
      const data = await response.json()
      setSuppliers(data)
    } catch (error) {
      console.error('Failed to fetch suppliers', error)
    }
  }

  useEffect(() => {
    fetchSuppliers()
  }, [])

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await fetch(`${API_BASE}/suppliers`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(form),
      })

      setForm({ name: '', phone: '', email: '', location: '', status: 'Active' })
      fetchSuppliers()
    } catch (error) {
      console.error('Failed to add supplier', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-[#12372a]">Suppliers</h1>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2] space-y-4">
        <h2 className="text-lg font-bold text-[#12372a]">Add supplier</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Supplier name" className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" required />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" />
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" />
          <select name="status" value={form.status} onChange={handleChange} className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]">
            <option value="Active">Active</option>
            <option value="VIP">VIP</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button type="submit" className="rounded-lg bg-[#12372a] px-4 py-2 font-semibold text-white hover:bg-[#1f6f4a]">Save supplier</button>
      </form>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm border border-[#eee5d2]">
        <table className="w-full text-sm">
          <thead className="border-b border-[#eee5d2] bg-[#f8f6ef]">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Name</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Phone</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Email</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Location</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Status</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id} className="border-b border-[#f2efe7] hover:bg-[#f8f6ef]">
                <td className="px-6 py-4 font-semibold text-[#12372a]">{supplier.name}</td>
                <td className="px-6 py-4 text-[#1f2933]">{supplier.phone || '—'}</td>
                <td className="px-6 py-4 text-[#1f2933]">{supplier.email || '—'}</td>
                <td className="px-6 py-4 text-[#1f2933]">{supplier.location || '—'}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    supplier.status === 'Active' ? 'bg-[#eaf3ec] text-[#2e7d32]' : supplier.status === 'VIP' ? 'bg-[#f8f1d8] text-[#d97706]' : 'bg-[#fde8e7] text-[#c0392b]'
                  }`}>
                    {supplier.status || 'Active'}
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

export default AdminSuppliers
