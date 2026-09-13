import { Link } from 'react-router-dom'
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
} from 'react-icons/fa'

function Footer() {
  return (
    <footer className="mt-16 bg-(--brand-900) px-6 py-16 text-white sm:px-8 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <div>
          <h3 className="mb-4 text-xl font-bold">Skybee</h3>
          <p className="leading-7 text-(--brand-300)">
            Curated gifting, beauty essentials, and elevated lifestyle finds made for everyday joy.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-bold">Quick Links</h3>

          <ul className="space-y-3">
            <li><Link to="/" className="text-(--brand-300) transition hover:text-white">Home</Link></li>
            <li><Link to="/about" className="text-(--brand-300) transition hover:text-white">About Us</Link></li>
            <li><Link to="/products" className="text-(--brand-300) transition hover:text-white">Products</Link></li>
            <li><Link to="/contact" className="text-(--brand-300) transition hover:text-white">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-bold">Follow Us</h3>

          <div className="mt-4 flex gap-4">
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-(--brand-700) text-white transition hover:-translate-y-1 hover:bg-(--brand-500)"><FaFacebookF /></a>
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-(--brand-700) text-white transition hover:-translate-y-1 hover:bg-(--brand-500)"><FaInstagram /></a>
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-(--brand-700) text-white transition hover:-translate-y-1 hover:bg-(--brand-500)"><FaWhatsapp /></a>
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-(--brand-700) text-white transition hover:-translate-y-1 hover:bg-(--brand-500)"><FaTiktok /></a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 border-t border-(--brand-700) pt-6 text-center text-sm text-(--brand-300)">
        © {new Date().getFullYear()} Skybee. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer