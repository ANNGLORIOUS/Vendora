import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const API_BASE = 'http://localhost:5000/api'

function AdminSuppliers() {
  const [suppliers, setSuppliers] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    status: 'Active',
    totalPurchases: 0,
    outstandingBalance: 0,
    lastDeliveryAt: '',
    notes: '',
  })
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

  const resetForm = () => {
    setForm({ name: '', phone: '', email: '', location: '', status: 'Active', totalPurchases: 0, outstandingBalance: 0, lastDeliveryAt: '', notes: '' })
    setEditingId(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const payload = {
        ...form,
        totalPurchases: Number(form.totalPurchases || 0),
        outstandingBalance: Number(form.outstandingBalance || 0),
      }

      const method = editingId ? 'PUT' : 'POST'
      const url = editingId ? `${API_BASE}/suppliers/${editingId}` : `${API_BASE}/suppliers`

      await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      })

      resetForm()
      fetchSuppliers()
    } catch (error) {
      console.error('Failed to save supplier', error)
    }
  }

  const handleEdit = (supplier) => {
    setEditingId(supplier.id)
    setForm({
      name: supplier.name || '',
      phone: supplier.phone || '',
      email: supplier.email || '',
      location: supplier.location || '',
      status: supplier.status || 'Active',
      totalPurchases: supplier.totalPurchases || 0,
      outstandingBalance: supplier.outstandingBalance || 0,
      lastDeliveryAt: supplier.lastDeliveryAt ? new Date(supplier.lastDeliveryAt).toISOString().slice(0, 10) : '',
      notes: supplier.notes || '',
    })
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/suppliers/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      })
      fetchSuppliers()
    } catch (error) {
      console.error('Failed to delete supplier', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-[#12372a]">Suppliers</h1>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2] space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-[#12372a]">{editingId ? 'Edit supplier' : 'Add supplier'}</h2>
          {editingId && <button type="button" onClick={resetForm} className="text-sm font-semibold text-[#12372a]">Cancel</button>}
        </div>

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

        <div className="grid gap-4 md:grid-cols-3">
          <input name="totalPurchases" type="number" value={form.totalPurchases} onChange={handleChange} placeholder="Total purchases" className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" />
          <input name="outstandingBalance" type="number" value={form.outstandingBalance} onChange={handleChange} placeholder="Outstanding balance" className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" />
          <input name="lastDeliveryAt" type="date" value={form.lastDeliveryAt} onChange={handleChange} className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" />
        </div>

        <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Relationship notes" rows="3" className="w-full rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" />

        <button type="submit" className="rounded-lg bg-[#12372a] px-4 py-2 font-semibold text-white hover:bg-[#1f6f4a]">{editingId ? 'Update supplier' : 'Save supplier'}</button>
      </form>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm border border-[#eee5d2]">
        <table className="w-full text-sm">
          <thead className="border-b border-[#eee5d2] bg-[#f8f6ef]">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Name</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Phone</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Email</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Location</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Purchases</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Status</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id} className="border-b border-[#f2efe7] hover:bg-[#f8f6ef]">
                <td className="px-6 py-4 font-semibold text-[#12372a]">{supplier.name}</td>
                <td className="px-6 py-4 text-[#1f2933]">{supplier.phone || '—'}</td>
                <td className="px-6 py-4 text-[#1f2933]">{supplier.email || '—'}</td>
                <td className="px-6 py-4 text-[#1f2933]">{supplier.location || '—'}</td>
                <td className="px-6 py-4 text-[#1f2933]">{supplier.totalPurchases || 0}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    supplier.status === 'Active' ? 'bg-[#eaf3ec] text-[#2e7d32]' : supplier.status === 'VIP' ? 'bg-[#f8f1d8] text-[#d97706]' : 'bg-[#fde8e7] text-[#c0392b]'
                  }`}>
                    {supplier.status || 'Active'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button type="button" onClick={() => handleEdit(supplier)} className="rounded bg-[#eaf3ec] px-2 py-1 text-xs font-semibold text-[#12372a]">Edit</button>
                    <button type="button" onClick={() => handleDelete(supplier.id)} className="rounded bg-[#fde8e7] px-2 py-1 text-xs font-semibold text-[#c0392b]">Delete</button>
                  </div>
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
