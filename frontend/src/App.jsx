import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import AdminLayout from './Components/AdminLayout'
import ProtectedRoute from './Components/ProtectedRoute'
import { CartProvider } from './context/CartContext'

import Hero from './Components/Hero'
import ProductsPage from './Pages/products'
import AboutPage from './Pages/About'
import ContactPage from './Pages/Contact'
import CartPage from './Pages/Cart'

import AdminLogin from './Pages/AdminLogin'
import AdminDashboard from './Pages/AdminDashboard'
import AdminProducts from './Pages/AdminProducts'
import AdminOrders from './Pages/AdminOrders'
import AdminCategories from './Pages/AdminCategories'
import AdminDiscounts from './Pages/AdminDiscounts'
import AdminCustomers from './Pages/AdminCustomers'
import AdminSettings from './Pages/AdminSettings'

function App() {
  return (
    <CartProvider>
      <Routes>
        {/* Public store routes */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Footer />
            </>
          }
        />

        {/* Admin routes */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Routes>
                  <Route path="/dashboard" element={<AdminDashboard />} />
                  <Route path="/products" element={<AdminProducts />} />
                  <Route path="/orders" element={<AdminOrders />} />
                  <Route path="/categories" element={<AdminCategories />} />
                  <Route path="/discounts" element={<AdminDiscounts />} />
                  <Route path="/customers" element={<AdminCustomers />} />
                  <Route path="/settings" element={<AdminSettings />} />
                  <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </CartProvider>
  )
}

export default App