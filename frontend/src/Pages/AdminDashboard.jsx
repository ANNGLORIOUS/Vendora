import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const API_BASE = 'http://localhost:5000/api'

function AdminDashboard() {
  const [orders, setOrders] = useState([])
  const [customers, setCustomers] = useState([])
  const [payments, setPayments] = useState([])
  const [cowPurchases, setCowPurchases] = useState([])
  const { getAuthHeaders } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, customersRes, paymentsRes, cowsRes] = await Promise.all([
          fetch(`${API_BASE}/orders`, { headers: getAuthHeaders() }),
          fetch(`${API_BASE}/customers`, { headers: getAuthHeaders() }),
          fetch(`${API_BASE}/payments`, { headers: getAuthHeaders() }),
          fetch(`${API_BASE}/cow-purchases`, { headers: getAuthHeaders() }),
        ])

        const [ordersData, customersData, paymentsData, cowsData] = await Promise.all([
          ordersRes.json(),
          customersRes.json(),
          paymentsRes.json(),
          cowsRes.json(),
        ])

        setOrders(ordersData)
        setCustomers(customersData)
        setPayments(paymentsData)
        setCowPurchases(cowsData)
      } catch (error) {
        console.error('Failed to load Vendora dashboard data', error)
      }
    }

    fetchData()
  }, [])

  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0)
  const totalPaid = payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0)
  const totalOutstanding = customers.reduce((sum, customer) => sum + Number(customer.outstandingBalance || 0), 0)
  const totalCowSpend = cowPurchases.reduce((sum, purchase) => sum + Number(purchase.totalCost || 0), 0)

  const stats = [
    { label: 'Total Customers', value: customers.length.toString(), icon: '👥', color: 'bg-[#e6f0ea] text-[#12372a]' },
    { label: 'Open Orders', value: orders.filter((order) => order.orderStatus !== 'Delivered').length.toString(), icon: '🥩', color: 'bg-[#f8f1d8] text-[#a26c00]' },
    { label: 'Outstanding', value: `KES ${totalOutstanding.toLocaleString()}`, icon: '💰', color: 'bg-[#fde8e7] text-[#c0392b]' },
    { label: 'Revenue', value: `KES ${totalRevenue.toLocaleString()}`, icon: '📈', color: 'bg-[#eaf3ec] text-[#1f6f4a]' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#12372a]">Welcome back</h1>
        <p className="mt-1 text-[#4b5563]">Here&apos;s what&apos;s happening with Vendora today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
            <div className={`inline-flex rounded-xl p-3 ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="mt-4 text-sm text-[#4b5563]">{stat.label}</p>
            <p className="mt-2 text-2xl font-bold text-[#12372a]">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#12372a]">Recent Orders</h2>
            <Link to="/admin/orders" className="text-sm font-semibold text-[#1f6f4a] hover:text-[#12372a]">
              View all →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-[#eee5d2]">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-[#4b5563]">Order</th>
                  <th className="px-4 py-3 text-left font-semibold text-[#4b5563]">Customer</th>
                  <th className="px-4 py-3 text-left font-semibold text-[#4b5563]">Amount</th>
                  <th className="px-4 py-3 text-left font-semibold text-[#4b5563]">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 4).map((order) => (
                  <tr key={order.id} className="border-b border-[#f2efe7]">
                    <td className="px-4 py-3 font-semibold text-[#12372a]">{order.id}</td>
                    <td className="px-4 py-3 text-[#1f2933]">{order.customerName}</td>
                    <td className="px-4 py-3 text-[#1f2933]">KES {Number(order.totalAmount || 0).toLocaleString()}</td>
                    <td className="px-4 py-3">
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

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eee5d2]">
          <h2 className="text-lg font-bold text-[#12372a]">Quick Summary</h2>
          <div className="mt-5 space-y-4">
            <div className="rounded-xl bg-[#f8f6ef] p-4">
              <p className="text-sm text-[#4b5563]">Total collected</p>
              <p className="mt-2 text-2xl font-bold text-[#12372a]">KES {totalPaid.toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-[#f8f6ef] p-4">
              <p className="text-sm text-[#4b5563]">Cow purchases</p>
              <p className="mt-2 text-2xl font-bold text-[#12372a]">KES {totalCowSpend.toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-[#f8f6ef] p-4">
              <p className="text-sm text-[#4b5563]">Orders in pipeline</p>
              <p className="mt-2 text-2xl font-bold text-[#12372a]">{orders.filter((order) => order.orderStatus !== 'Delivered').length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
