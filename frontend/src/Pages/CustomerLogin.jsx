import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VendoraLogo from '../Components/VendoraLogo'

const API_BASE = 'http://localhost:5000/api'

function CustomerLogin() {
  const [email, setEmail] = useState('customer@vendora.co')
  const [password, setPassword] = useState('customer123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('vendoraCustomerToken')) {
      navigate('/customer/portal', { replace: true })
    }
  }, [navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE}/customer/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Login failed')
      }

      localStorage.setItem('vendoraCustomerToken', data.token)
      localStorage.setItem('customerData', JSON.stringify(data.customer))
      navigate('/customer/portal', { replace: true })
    } catch (err) {
      setError(err.message || 'Unable to sign in right now')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f6ef] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-[#e7dcc4]">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4a72c]">Customer portal</p>
          <div className="my-2 flex justify-center"><VendoraLogo /></div>
          <p className="text-sm text-[#4b5563]">Secure billing and order access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#12372a]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              className="mt-2 w-full rounded-lg border border-[#d4a72c] bg-white px-4 py-2 text-sm outline-none focus:border-[#1f6f4a]"
              required
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-lg bg-[#12372a] px-4 py-2 font-semibold text-white hover:bg-[#1f6f4a] disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 border-t border-[#e7dcc4] pt-5 text-center text-xs text-[#4b5563]">
          Demo portal access:<br />
          Email: customer@vendora.co<br />
          Password: customer123
        </div>
      </div>
    </div>
  )
}

export default CustomerLogin
