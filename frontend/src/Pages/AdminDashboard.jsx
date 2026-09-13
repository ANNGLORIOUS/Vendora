import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const API_BASE = 'http://localhost:5000/api'

function AdminDashboard() {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, ordersRes, customersRes] = await Promise.all([
          fetch(`${API_BASE}/products`),
          fetch(`${API_BASE}/orders`),
          fetch(`${API_BASE}/customers`),
        ])

        const [productsData, ordersData, customersData] = await Promise.all([
          productsRes.json(),
          ordersRes.json(),
          customersRes.json(),
        ])

        setProducts(productsData)
        setOrders(ordersData)
        setCustomers(customersData)
      } catch (error) {
        console.error('Failed to load dashboard data', error)
      }
    }

    fetchData()
  }, [])

  const stats = [
    { label: 'Total Products', value: products.length.toString(), icon: '📦', color: 'bg-blue-100 text-blue-600' },
    { label: 'Total Orders', value: orders.length.toString(), icon: '🛒', color: 'bg-green-100 text-green-600' },
    { label: 'Total Customers', value: customers.length.toString(), icon: '👥', color: 'bg-purple-100 text-purple-600' },
    { label: 'Total Revenue', value: `KSh ${orders.reduce((sum, order) => sum + Number(order.total.replace(/[^0-9]/g, '')), 0).toLocaleString()}`, icon: '💰', color: 'bg-orange-100 text-orange-600' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Welcome back!</h1>
        <p className="mt-1 text-gray-600">Here's what's happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="rounded-lg bg-white p-6 shadow">
            <div className={`inline-block rounded-lg p-3 ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="mt-4 text-sm text-gray-600">{stat.label}</p>
            <p className="mt-2 text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>
          <Link to="/admin/orders" className="text-sm text-(--brand-700) hover:text-(--brand-900)">
            View all →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Order ID</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Customer</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Amount</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 3).map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800">{order.id}</td>
                  <td className="px-4 py-3 text-gray-800">{order.customer}</td>
                  <td className="px-4 py-3 text-gray-800">{order.total}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
