import { useEffect, useState } from 'react'

const API_BASE = 'http://localhost:5000/api'

const formatCurrency = (value) => `KES ${Number(value || 0).toLocaleString()}`

function StaffCustomers() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('vendoraStaffToken')

    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${API_BASE}/customers`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Unable to load customers')
        }

        const data = await response.json()
        setCustomers(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error(error)
        setCustomers([])
      } finally {
        setLoading(false)
      }
    }

    fetchCustomers()
  }, [])

  if (loading) {
    return <div className="rounded-2xl bg-white p-6 text-[#12372a] shadow-sm border border-[#eee5d2]">Loading customers...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-[#12372a]">Customers</h1>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm border border-[#eee5d2]">
        <table className="w-full text-sm">
          <thead className="border-b border-[#eee5d2] bg-[#f8f6ef]">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Name</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Phone</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Location</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Status</th>
              <th className="px-6 py-4 text-left font-semibold text-[#4b5563]">Outstanding</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-[#4b5563]">No customers found.</td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer.id} className="border-b border-[#f2efe7] hover:bg-[#f8f6ef]">
                  <td className="px-6 py-4 font-semibold text-[#12372a]">{customer.name}</td>
                  <td className="px-6 py-4 text-[#1f2933]">{customer.phone}</td>
                  <td className="px-6 py-4 text-[#1f2933]">{customer.location || '—'}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block rounded-full bg-[#f8f1d8] px-3 py-1 text-xs font-semibold text-[#d97706]">{customer.status || 'Active'}</span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-[#12372a]">{formatCurrency(customer.outstandingBalance)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StaffCustomers
