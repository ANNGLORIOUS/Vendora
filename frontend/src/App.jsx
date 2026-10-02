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
import CustomerLogin from './Pages/CustomerLogin'
import CustomerPortal from './Pages/CustomerPortal'
import StaffLogin from './Pages/StaffLogin'
import StaffDashboard from './Pages/StaffDashboard'
import StaffOrders from './Pages/StaffOrders'
import StaffCustomers from './Pages/StaffCustomers'
import StaffPayments from './Pages/StaffPayments'
import StaffToday from './Pages/StaffToday'
import StaffPending from './Pages/StaffPending'
import StaffProtectedRoute from './Components/StaffProtectedRoute'
import StaffLayout from './Components/StaffLayout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/staff" element={<Navigate to="/staff/login" replace />} />
      <Route path="/staff/login" element={<StaffLogin />} />
      <Route path="/customer" element={<Navigate to="/customer/login" replace />} />
      <Route path="/customer/login" element={<CustomerLogin />} />

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

      <Route
        path="/staff/*"
        element={
          <StaffProtectedRoute>
            <StaffLayout>
              <Routes>
                <Route path="/dashboard" element={<StaffDashboard />} />
                <Route path="/orders" element={<StaffOrders />} />
                <Route path="/customers" element={<StaffCustomers />} />
                <Route path="/payments" element={<StaffPayments />} />
                <Route path="/today" element={<StaffToday />} />
                <Route path="/pending" element={<StaffPending />} />
                <Route path="*" element={<Navigate to="/staff/dashboard" replace />} />
              </Routes>
            </StaffLayout>
          </StaffProtectedRoute>
        }
      />

      <Route path="/customer/*" element={<CustomerPortal />} />

      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  )
}

export default App