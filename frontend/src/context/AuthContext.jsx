import { createContext, useState, useContext } from 'react'

const AuthContext = createContext()
const API_BASE = 'http://localhost:5000/api'

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    try {
      const savedAdmin = localStorage.getItem('adminData')
      return savedAdmin ? JSON.parse(savedAdmin) : null
    } catch {
      return null
    }
  })

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
      return true
    } catch (error) {
      console.error('Login failed', error)
      return false
    }
  }

  const logout = () => {
    setAdmin(null)
    localStorage.removeItem('adminData')
  }

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
