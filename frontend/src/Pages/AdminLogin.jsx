import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, admin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (admin?.role === 'admin') {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [admin, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const success = await login({ email, password })
      if (success) {
        navigate('/admin/dashboard')
      } else {
        setError('Invalid email or password')
      }
    } catch {
      setError('Unable to login right now. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-(--brand-100) px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-(--brand-900)">Skybee</h1>
          <p className="mt-2 text-sm text-(--text-soft)">Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-(--brand-900)">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@skybee.co"
              className="mt-2 w-full rounded-lg border border-(--brand-300) bg-white px-4 py-2 text-sm outline-none focus:border-(--brand-700) focus:ring-2 focus:ring-(--brand-700)/20"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-(--brand-900)">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-2 w-full rounded-lg border border-(--brand-300) bg-white px-4 py-2 text-sm outline-none focus:border-(--brand-700) focus:ring-2 focus:ring-(--brand-700)/20"
              required
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-(--brand-900) px-4 py-2 font-semibold text-white transition hover:bg-(--brand-700) disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 border-t border-(--brand-300) pt-6">
          <p className="text-center text-xs text-(--text-soft)">
            Demo Credentials:<br />
            Email: admin@skybee.co<br />
            Password: admin123
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
