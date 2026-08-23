const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api'

export async function fetchDashboard() {
  const res = await fetch(`${API_BASE}/customers/`)
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

export default { fetchDashboard }
