import { useEffect, useState } from 'react'

const API_BASE = 'http://localhost:5000/api'

function AdminProducts() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE}/products`)
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Failed to fetch products', error)
    }
  }

  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    discount: '',
    description: '',
  })
  const [imageFile, setImageFile] = useState(null)

  const handleAdd = () => {
    setEditingId(null)
    setFormData({ name: '', category: '', price: '', stock: '', discount: '', description: '' })
    setImageFile(null)
    setShowModal(true)
  }

  const handleEdit = (product) => {
    setEditingId(product.id)
    setFormData({
      name: product.name || '',
      category: product.category || '',
      price: product.price || '',
      stock: product.stock || '',
      discount: product.discount || '',
      description: product.description || '',
    })
    setImageFile(null)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' })
        fetchProducts()
      } catch (error) {
        console.error('Failed to delete product', error)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId
        ? `${API_BASE}/products/${editingId}`
        : `${API_BASE}/products`

      const payload = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value)
      })

      if (imageFile) {
        payload.append('imageFile', imageFile)
      }

      await fetch(url, {
        method,
        body: payload,
      })

      fetchProducts()
      setShowModal(false)
    } catch (error) {
      console.error('Failed to save product', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Products Management</h1>
        <button
          onClick={handleAdd}
          className="rounded-lg bg-(--brand-900) px-4 py-2 font-semibold text-white transition hover:bg-(--brand-700)"
        >
          + Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Name</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Category</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Price</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Stock</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Discount</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-800">{product.name}</td>
                <td className="px-6 py-4 text-gray-800">{product.category}</td>
                <td className="px-6 py-4 text-gray-800">KSh {product.price}</td>
                <td className="px-6 py-4 text-gray-800">{product.stock}</td>
                <td className="px-6 py-4 text-gray-800">{product.discount}%</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
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
              {editingId ? 'Edit Product' : 'Add Product'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-(--brand-700)"
                required
              />

              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-(--brand-700)"
                required
              />

              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-(--brand-700)"
                required
              />

              <input
                type="number"
                placeholder="Stock"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-(--brand-700)"
                required
              />

              <input
                type="number"
                placeholder="Discount %"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-(--brand-700)"
              />

              <label className="block text-sm font-medium text-gray-700">
                Product Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-(--brand-700)"
                />
              </label>

              <textarea
                placeholder="Description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="min-h-24 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-(--brand-700)"
              />

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

export default AdminProducts
