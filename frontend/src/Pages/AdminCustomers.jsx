import { useEffect, useState } from 'react'

const API_BASE = 'http://localhost:5000/api'

function AdminCustomers() {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${API_BASE}/customers`)
        const data = await response.json()
        setCustomers(data)
      } catch (error) {
        console.error('Failed to fetch customers', error)
      }
    }

    fetchCustomers()
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Customers Management</h1>

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Name</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Email</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Phone</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Joined</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Orders</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-800">{customer.name}</td>
                <td className="px-6 py-4 text-gray-800">{customer.email}</td>
                <td className="px-6 py-4 text-gray-800">{customer.phone}</td>
                <td className="px-6 py-4 text-gray-800">{customer.joined}</td>
                <td className="px-6 py-4 text-gray-800 font-semibold">{customer.orders || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminCustomers
