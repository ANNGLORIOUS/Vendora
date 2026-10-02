import { Navigate } from 'react-router-dom'

function StaffProtectedRoute({ children }) {
  const token = localStorage.getItem('vendoraStaffToken')

  if (!token) {
    return <Navigate to="/staff/login" replace />
  }

  return children
}

export default StaffProtectedRoute
