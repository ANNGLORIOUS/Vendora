import { useEffect, useState } from 'react'

const API_BASE = 'http://localhost:5000/api'

function AdminCowPurchases() {
  const [purchases, setPurchases] = useState([])
  const [form, setForm] = useState({ purchaseDate: new Date().toISOString().slice(0, 10), seller: '', cowCount: '', purchasePrice: '', weightKg: '', notes: '' })

  const fetchPurchases = async () => {
    try {
      const response = await fetch(`${API_BASE}/cow-purchases`)
      const data = await response.json()
      setPurchases(data)
    } catch (error) {
      console.error('Failed to fetch cow purchases', error)
    }
  }

  useEffect(() => {
    fetchPurchases()
  }, [])

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await fetch(`${API_BASE}/cow-purchases`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      setForm({ purchaseDate: new Date().toISOString().slice(0, 10), seller: '', cowCount: '', purchasePrice: '', weightKg: '', notes: '' })
      fetchPurchases()
    } catch (error) {
      console.error('Failed to add cow purchase', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-[#12372a]">Cow Purchases</h1>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2] space-y-4">
        <h2 className="text-lg font-bold text-[#12372a]">Add purchase</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          <input type="date" name="purchaseDate" value={form.purchaseDate} onChange={handleChange} className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" required />
          <input name="seller" value={form.seller} onChange={handleChange} placeholder="Seller" className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" required />
          <input type="number" name="cowCount" value={form.cowCount} onChange={handleChange} placeholder="Cow count" className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" required />
          <input type="number" name="purchasePrice" value={form.purchasePrice} onChange={handleChange} placeholder="Purchase price" className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" required />
          <input type="number" name="weightKg" value={form.weightKg} onChange={handleChange} placeholder="Weight (kg)" className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" />
          <button type="submit" className="rounded-lg bg-[#12372a] px-4 py-2 font-semibold text-white hover:bg-[#1f6f4a]">Save purchase</button>
        </div>
        <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" className="min-h-24 w-full rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" />
      </form>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm border border-[#eee5d2]">
        <table className="w-full text-sm">
          <thead className="border-b border-[#eee5d2] bg-[#f8f6ef]">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Date</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Seller</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Cows</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Unit Cost</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Total Cost</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Weight</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Notes</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase.id} className="border-b border-[#f2efe7] hover:bg-[#f8f6ef]">
                <td className="px-6 py-4 text-[#1f2933]">{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-[#1f2933]">{purchase.seller}</td>
                <td className="px-6 py-4 text-[#1f2933]">{purchase.cowCount}</td>
                <td className="px-6 py-4 text-[#1f2933]">KES {Number(purchase.purchasePrice || 0).toLocaleString()}</td>
                <td className="px-6 py-4 font-semibold text-[#12372a]">KES {Number(purchase.totalCost || 0).toLocaleString()}</td>
                <td className="px-6 py-4 text-[#1f2933]">{purchase.weightKg ? `${purchase.weightKg} kg` : '—'}</td>
                <td className="px-6 py-4 text-[#1f2933]">{purchase.notes || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminCowPurchases
