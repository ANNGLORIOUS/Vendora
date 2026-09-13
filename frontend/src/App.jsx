import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './Components/AdminLayout'
import ProtectedRoute from './Components/ProtectedRoute'

import AdminLogin from './Pages/AdminLogin'
import AdminDashboard from './Pages/AdminDashboard'
import AdminOrders from './Pages/AdminOrders'
import AdminCustomers from './Pages/AdminCustomers'
import AdminPayments from './Pages/AdminPayments'
import AdminCowPurchases from './Pages/AdminCowPurchases'
import AdminSuppliers from './Pages/AdminSuppliers'
import AdminExpenses from './Pages/AdminExpenses'
import AdminReports from './Pages/AdminReports'
import AdminSms from './Pages/AdminSms'
import AdminSettings from './Pages/AdminSettings'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Routes>
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/customers" element={<AdminCustomers />} />
                <Route path="/orders" element={<AdminOrders />} />
                <Route path="/payments" element={<AdminPayments />} />
                <Route path="/cows" element={<AdminCowPurchases />} />
                <Route path="/suppliers" element={<AdminSuppliers />} />
                <Route path="/expenses" element={<AdminExpenses />} />
                <Route path="/reports" element={<AdminReports />} />
                <Route path="/sms" element={<AdminSms />} />
                <Route path="/settings" element={<AdminSettings />} />
                <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  )
}

export default App