import { createContext, useState, useContext } from 'react'

const AuthContext = createContext()
const API_BASE = 'http://localhost:5000/api'

const getStoredAdmin = () => {
  try {
    const savedAdmin = localStorage.getItem('adminData')
    return savedAdmin ? JSON.parse(savedAdmin) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => getStoredAdmin())

  const getAuthHeaders = () => {
    const token = localStorage.getItem('vendoraToken')
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }
  }

  const login = async (credentials) => {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()
      if (!response.ok || !data.success) {
        return false
      }

      const adminData = { ...data.admin, role: 'admin' }
      setAdmin(adminData)
      localStorage.setItem('adminData', JSON.stringify(adminData))
      if (data.token) {
        localStorage.setItem('vendoraToken', data.token)
      }
      return true
    } catch (error) {
      console.error('Login failed', error)
      return false
    }
  }

  const logout = () => {
    setAdmin(null)
    localStorage.removeItem('adminData')
    localStorage.removeItem('vendoraToken')
  }

  const isAuthenticated = Boolean(localStorage.getItem('vendoraToken') || admin?.role === 'admin')

  return (
    <AuthContext.Provider value={{ admin, login, logout, getAuthHeaders, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
