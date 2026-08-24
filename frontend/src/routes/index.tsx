import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import App from '../App'
import Dashboard from '../pages/dashboard/Dashboard'
import ClientPortal from '../pages/customer-portal/ClientPortal'
import Login from '../pages/auth/Login'
import CustomersList from '../pages/customers/CustomersList'
import OrdersList from '../pages/orders/OrdersList'
import PaymentsList from '../pages/payments/PaymentsList'
import ProductsList from '../pages/products/ProductsList'
import ReceivablesList from '../pages/receivables/ReceivablesList'
import ReportsPage from '../pages/reports/ReportsPage'
import SettingsPage from '../pages/settings/SettingsPage'
import ProtectedRoute from './ProtectedRoute'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/client" element={<ClientPortal />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/customers" element={<ProtectedRoute><CustomersList /></ProtectedRoute>} />
      <Route path="/products" element={<ProtectedRoute><ProductsList /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><OrdersList /></ProtectedRoute>} />
      <Route path="/payments" element={<ProtectedRoute><PaymentsList /></ProtectedRoute>} />
      <Route path="/receivables" element={<ProtectedRoute><ReceivablesList /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
