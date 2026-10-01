import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children }) {
  const { admin, isAuthenticated } = useAuth()

  if ((!admin || admin.role !== 'admin') && !isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default ProtectedRoute
