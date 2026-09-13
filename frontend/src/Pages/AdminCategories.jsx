import { useEffect, useState } from 'react'

const API_BASE = 'http://localhost:5000/api'

function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  })

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE}/categories`)
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Failed to fetch categories', error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleAdd = () => {
    setEditingId(null)
    setFormData({ name: '', description: '' })
    setShowModal(true)
  }

  const handleEdit = (category) => {
    setEditingId(category.id)
    setFormData({ name: category.name, description: category.description })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        await fetch(`${API_BASE}/categories/${id}`, { method: 'DELETE' })
        fetchCategories()
      } catch (error) {
        console.error('Failed to delete category', error)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const url = editingId ? `${API_BASE}/categories/${editingId}` : `${API_BASE}/categories`
      const method = editingId ? 'PUT' : 'POST'

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      fetchCategories()
      setShowModal(false)
    } catch (error) {
      console.error('Failed to save category', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Categories Management</h1>
        <button
          onClick={handleAdd}
          className="rounded-lg bg-(--brand-900) px-4 py-2 font-semibold text-white transition hover:bg-(--brand-700)"
        >
          + Add Category
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.length === 0 ? (
          <div className="rounded-lg bg-white p-6 shadow text-sm text-gray-600 md:col-span-2 lg:col-span-3">
            No categories yet. Add one or create a product with a new category.
          </div>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-lg font-bold text-gray-800">{category.name}</h3>
              <p className="mt-2 text-sm text-gray-600">{category.description}</p>
              <p className="mt-4 text-sm text-gray-500">{category.products || 0} products</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="flex-1 rounded bg-blue-100 px-3 py-2 text-xs font-medium text-blue-700 hover:bg-blue-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="flex-1 rounded bg-red-100 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              {editingId ? 'Edit Category' : 'Add Category'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Category Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-(--brand-700)"
                required
              />

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-(--brand-700)"
                rows="4"
                required
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

export default AdminCategories
