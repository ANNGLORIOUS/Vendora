import { useEffect, useState } from 'react'

const API_BASE = 'http://localhost:5000/api'

function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [expandedOrderId, setExpandedOrderId] = useState(null)

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE}/orders`)
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Failed to fetch orders', error)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleStatusChange = async (orderId, status) => {
    try {
      await fetch(`${API_BASE}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      fetchOrders()
    } catch (error) {
      console.error('Failed to update order status', error)
    }
  }

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId((currentId) => (currentId === orderId ? null : orderId))
  }

  const getOrderItems = (order) => {
    if (Array.isArray(order.items)) {
      return order.items
    }

    if (typeof order.items === 'string') {
      try {
        const parsedItems = JSON.parse(order.items)
        return Array.isArray(parsedItems) ? parsedItems : []
      } catch (error) {
        return []
      }
    }

    return []
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Orders Management</h1>

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Order ID</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Customer</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Email</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Total</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Date</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Status</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const items = getOrderItems(order)
              const isExpanded = expandedOrderId === order.id

              return (
                <>
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-800">{order.id}</td>
                    <td className="px-6 py-4 text-gray-800">{order.customer}</td>
                    <td className="px-6 py-4 text-gray-800">{order.email}</td>
                    <td className="px-6 py-4 text-gray-800">{order.total}</td>
                    <td className="px-6 py-4 text-gray-800">{order.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => toggleOrderDetails(order.id)}
                          className="rounded border border-gray-300 px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-100"
                        >
                          {isExpanded ? 'Hide Items' : 'View Items'}
                        </button>
                        <button
                          onClick={() => handleStatusChange(order.id, order.status === 'Completed' ? 'Pending' : 'Completed')}
                          className="rounded bg-(--brand-900) px-3 py-1 text-xs font-semibold text-white hover:bg-(--brand-700)"
                        >
                          {order.status === 'Completed' ? 'Mark Pending' : 'Approve'}
                        </button>
                      </div>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <td colSpan="7" className="px-6 py-4">
                        <div className="space-y-2">
                          <h3 className="text-sm font-semibold text-gray-800">Ordered Items</h3>
                          {items.length > 0 ? (
                            <ul className="space-y-2 text-sm text-gray-700">
                              {items.map((item, index) => (
                                <li key={`${order.id}-${index}`} className="rounded border border-gray-200 bg-white px-3 py-2">
                                  <div className="flex items-center justify-between gap-4">
                                    <span className="font-medium">{item.name || item.productName || `Item ${index + 1}`}</span>
                                    <span className="text-gray-500">Qty: {item.quantity || 1}</span>
                                  </div>
                                  {item.price && <div className="mt-1 text-xs text-gray-500">Price: {item.price}</div>}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-500">No item details available for this order.</p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminOrders
