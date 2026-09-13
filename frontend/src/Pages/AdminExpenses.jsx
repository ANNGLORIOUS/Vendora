import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const API_BASE = 'http://localhost:5000/api'

function AdminExpenses() {
  const [expenses, setExpenses] = useState([])
  const [form, setForm] = useState({ category: 'Feed', amount: '', description: '', vendor: '', incurredDate: new Date().toISOString().slice(0, 10) })
  const { getAuthHeaders } = useAuth()

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`${API_BASE}/expenses`, { headers: getAuthHeaders() })
      const data = await response.json()
      setExpenses(data)
    } catch (error) {
      console.error('Failed to fetch expenses', error)
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await fetch(`${API_BASE}/expenses`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(form),
      })

      setForm({ category: 'Feed', amount: '', description: '', vendor: '', incurredDate: new Date().toISOString().slice(0, 10) })
      fetchExpenses()
    } catch (error) {
      console.error('Failed to add expense', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-[#12372a]">Expenses</h1>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2] space-y-4">
        <h2 className="text-lg font-bold text-[#12372a]">Add expense</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <select name="category" value={form.category} onChange={handleChange} className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]">
            <option value="Feed">Feed</option>
            <option value="Transport">Transport</option>
            <option value="Labor">Labor</option>
            <option value="Vet">Vet</option>
            <option value="Other">Other</option>
          </select>
          <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" required />
          <input name="vendor" value={form.vendor} onChange={handleChange} placeholder="Vendor" className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" />
          <input type="date" name="incurredDate" value={form.incurredDate} onChange={handleChange} className="rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" required />
          <button type="submit" className="rounded-lg bg-[#12372a] px-4 py-2 font-semibold text-white hover:bg-[#1f6f4a]">Save expense</button>
        </div>
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="min-h-24 w-full rounded-lg border border-[#d9d0ba] px-3 py-2 outline-none focus:border-[#1f6f4a]" />
      </form>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm border border-[#eee5d2]">
        <table className="w-full text-sm">
          <thead className="border-b border-[#eee5d2] bg-[#f8f6ef]">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Date</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Category</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Vendor</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Description</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="border-b border-[#f2efe7] hover:bg-[#f8f6ef]">
                <td className="px-6 py-4 text-[#1f2933]">{new Date(expense.incurredDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-[#1f2933]">{expense.category}</td>
                <td className="px-6 py-4 text-[#1f2933]">{expense.vendor || '—'}</td>
                <td className="px-6 py-4 text-[#1f2933]">{expense.description || '—'}</td>
                <td className="px-6 py-4 font-semibold text-[#12372a]">KES {Number(expense.amount || 0).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminExpenses
