import React, { createContext, useContext, useMemo, useState } from 'react'
import { api, clearAuthToken, setAuthToken } from '../services/api'

type AuthContextValue = {
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem('vendora_access_token')
    return Boolean(token)
  })

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      login: async (username: string, password: string) => {
        try {
          const response = await api.post('/token/', {
            username,
            password,
          })

          const accessToken = response.data?.access
          const refreshToken = response.data?.refresh

          if (!accessToken) {
            throw new Error('Missing token from backend response')
          }

          setAuthToken(accessToken)
          if (refreshToken) {
            localStorage.setItem('vendora_refresh_token', refreshToken)
          }
          setIsAuthenticated(true)
        } catch (error) {
          setIsAuthenticated(false)
          clearAuthToken()
          // Try to normalize the backend error message for the UI
          const err: any = error
          let message = 'Login failed'
          if (err?.response?.data) {
            const data = err.response.data
            if (typeof data === 'string') message = data
            else if (data.detail) message = data.detail
            else if (Array.isArray(data)) message = data.join(', ')
            else if (typeof data === 'object') message = JSON.stringify(data)
          } else if (err?.message) {
            message = err.message
          }

          throw new Error(message)
        }
      },
      logout: () => {
        clearAuthToken()
        setIsAuthenticated(false)
      },
    }),
    [isAuthenticated]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
