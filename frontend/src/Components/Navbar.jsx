import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import skyLogo from '../assets/skybeelogo.jpeg'

function Navbar() {
  const { itemCount } = useCart()
  const { admin, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f7d45d]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-350 items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={skyLogo} alt="Skybee logo" className="h-14 w-auto max-w-52 object-contain" />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold uppercase tracking-[0.24em] text-(--text-soft) md:flex">
          <NavLink to="/" className={({ isActive }) => `transition ${isActive ? 'text-(--brand-900)' : 'hover:text-(--brand-900)'}`}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `transition ${isActive ? 'text-(--brand-900)' : 'hover:text-(--brand-900)'}`}>
            About
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => `transition ${isActive ? 'text-(--brand-900)' : 'hover:text-(--brand-900)'}`}>
            Products
          </NavLink>
          <a href="#contact" className="transition hover:text-(--brand-900)">Contact</a>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="relative flex items-center text-sm font-semibold uppercase tracking-[0.24em] text-(--brand-900) transition hover:text-(--brand-700)"
          >
            Cart
            {itemCount > 0 && (
              <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-(--brand-900) px-1 text-xs font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>

          {admin?.role === 'admin' ? (
            <>
              <Link
                to="/admin/dashboard"
                className="text-sm font-semibold uppercase tracking-[0.24em] text-(--brand-900) transition hover:text-(--brand-700)"
              >
                Admin Dashboard
              </Link>
              <button
                type="button"
                onClick={logout}
                className="text-sm font-semibold uppercase tracking-[0.24em] text-(--brand-900) transition hover:text-(--brand-700)"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/products" className="text-sm font-semibold uppercase tracking-[0.24em] text-(--brand-900) transition hover:text-(--brand-700)">
              Shop now
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar