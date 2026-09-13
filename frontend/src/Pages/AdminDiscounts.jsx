import { useState } from 'react'

function AdminDiscounts() {
  const [discounts, setDiscounts] = useState([
    { id: 1, name: 'Summer Sale', code: 'SUMMER20', discount: 20, products: 5, active: true },
    { id: 2, name: 'New Customer', code: 'WELCOME10', discount: 10, products: 'All', active: true },
    { id: 3, name: 'Loyalty', code: 'LOYAL15', discount: 15, products: 3, active: false },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    discount: '',
    products: '',
    active: true,
  })

  const handleAdd = () => {
    setEditingId(null)
    setFormData({ name: '', code: '', discount: '', products: '', active: true })
    setShowModal(true)
  }

  const handleEdit = (discount) => {
    setEditingId(discount.id)
    setFormData(discount)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this discount?')) {
      setDiscounts(discounts.filter(d => d.id !== id))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingId) {
      setDiscounts(discounts.map(d => d.id === editingId ? { ...formData, id: editingId } : d))
    } else {
      setDiscounts([...discounts, { ...formData, id: Date.now() }])
    }
    setShowModal(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Discounts & Promotions</h1>
        <button
          onClick={handleAdd}
          className="rounded-lg bg-(--brand-900) px-4 py-2 font-semibold text-white transition hover:bg-(--brand-700)"
        >
          + Add Discount
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Name</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Code</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Discount</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Products</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Status</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount) => (
              <tr key={discount.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-800">{discount.name}</td>
                <td className="px-6 py-4 font-mono text-gray-800">{discount.code}</td>
                <td className="px-6 py-4 text-gray-800">{discount.discount}%</td>
                <td className="px-6 py-4 text-gray-800">{discount.products}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    discount.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {discount.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(discount)}
                      className="rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(discount.id)}
                      className="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              {editingId ? 'Edit Discount' : 'Add Discount'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Promotion Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-(--brand-700)"
                required
              />

              <input
                type="text"
                placeholder="Coupon Code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-(--brand-700)"
                required
              />

              <input
                type="number"
                placeholder="Discount %"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-(--brand-700)"
                required
              />

              <input
                type="text"
                placeholder="Products (number or 'All')"
                value={formData.products}
                onChange={(e) => setFormData({ ...formData, products: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-(--brand-700)"
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="rounded"
                />
                <span className="text-gray-700">Active</span>
              </label>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-(--brand-900) px-4 py-2 font-semibold text-white hover:bg-(--brand-700)"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDiscounts
