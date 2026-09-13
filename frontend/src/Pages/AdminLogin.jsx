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
    <div className="flex min-h-screen items-center justify-center bg-[#f8f6ef] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-[#e7dcc4]">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black tracking-widest text-[#12372a]">VENDORA</h1>
          <p className="mt-2 text-sm text-[#4b5563]">Business dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#12372a]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@vendora.co"
              className="mt-2 w-full rounded-lg border border-[#d4a72c] bg-white px-4 py-2 text-sm outline-none focus:border-[#1f6f4a]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#12372a]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-2 w-full rounded-lg border border-[#d4a72c] bg-white px-4 py-2 text-sm outline-none focus:border-[#1f6f4a]"
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
            className="mt-6 w-full rounded-lg bg-[#12372a] px-4 py-2 font-semibold text-white transition hover:bg-[#1f6f4a] disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 border-t border-[#e7dcc4] pt-6">
          <p className="text-center text-xs text-[#4b5563]">
            Demo Credentials:<br />
            Email: admin@vendora.co<br />
            Password: admin123
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
