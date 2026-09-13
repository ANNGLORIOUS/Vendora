import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const API_BASE = 'http://localhost:5000/api'

function CartPage() {
  const { cart, updateQty, removeFromCart, clearCart } = useCart()
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [checkoutMessage, setCheckoutMessage] = useState('')
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  async function handleCheckout() {
    if (cart.length === 0) return

    setIsCheckingOut(true)
    setCheckoutMessage('')

    try {
      const response = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((item) => ({ id: item.id, quantity: item.qty })),
          customer: customerName.trim() || 'Guest Customer',
          email: customerEmail.trim() || 'guest@example.com',
          total: `KSh ${total.toLocaleString()}`,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Unable to place order right now.')
      }

      clearCart()
      setCustomerName('')
      setCustomerEmail('')
      setCustomerPhone('')
      setCheckoutMessage('Order placed successfully. The admin can see it in the orders panel.')
    } catch (error) {
      setCheckoutMessage(error.message || 'Unable to place order right now.')
    } finally {
      setIsCheckingOut(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-(--brand-100) text-(--text-strong)">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-(--brand-900)">Your cart is empty</h1>
          <p className="mt-3 text-(--text-soft)">Browse our products and add a few favorites to get started.</p>
          <Link
            to="/products"
            className="mt-6 inline-block rounded-full bg-(--brand-900) px-6 py-3 text-sm font-semibold text-white transition hover:bg-(--brand-700)"
          >
            Shop Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-(--brand-100) text-(--text-strong)">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <h1 className="text-4xl font-semibold text-(--brand-900) sm:text-5xl">Your Cart</h1>

        <div className="mt-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-3xl border border-(--brand-300)/70 bg-(--surface) p-4"
            >
              <img src={item.image} alt={item.name} className="h-20 w-20 rounded-2xl object-cover" />

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-(--brand-900)">{item.name}</h3>
                <p className="text-sm text-(--text-soft)">{item.amount}</p>
                <p className="mt-1 text-sm font-semibold text-(--brand-700)">
                  Ksh {item.price.toLocaleString()}
                </p>
              </div>

              <input
                type="number"
                min="1"
                value={item.qty}
                onChange={(e) => updateQty(item.id, Number(e.target.value))}
                className="w-16 rounded-full border border-(--brand-300)/70 bg-(--brand-50) px-3 py-2 text-center text-sm"
              />

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-sm font-semibold text-(--text-soft) transition hover:text-(--brand-900)"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-(--brand-300)/70 bg-(--surface) p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xl font-semibold text-(--brand-900)">
              Total: Ksh {total.toLocaleString()}
            </p>

            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="rounded-full border border-(--brand-300)/70 px-5 py-2 text-sm font-semibold text-(--text-soft) transition hover:text-(--brand-900)"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="rounded-full bg-(--brand-900) px-6 py-2 text-sm font-semibold text-white transition hover:bg-(--brand-700) disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {isCheckingOut ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Your name"
              className="rounded-full border border-(--brand-300)/70 bg-(--brand-50) px-4 py-2 text-sm outline-none focus:border-(--brand-700)"
            />
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="Your email"
              className="rounded-full border border-(--brand-300)/70 bg-(--brand-50) px-4 py-2 text-sm outline-none focus:border-(--brand-700)"
            />
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="Your phone"
              className="rounded-full border border-(--brand-300)/70 bg-(--brand-50) px-4 py-2 text-sm outline-none focus:border-(--brand-700)"
            />
            </div>
          <div className="flex gap-3">
            <button
              onClick={clearCart}
              className="rounded-full border border-(--brand-300)/70 px-5 py-2 text-sm font-semibold text-(--text-soft) transition hover:text-(--brand-900)"
            >
              Clear Cart
            </button>
            {/* <button
              onClick={checkoutViaWhatsApp}
              className="rounded-full bg-(--brand-900) px-6 py-2 text-sm font-semibold text-white transition hover:bg-(--brand-700)"
            >
              Checkout 
            </button> */}
          </div>

          {checkoutMessage && (
            <p className={`mt-4 text-sm ${checkoutMessage.includes('success') ? 'text-green-700' : 'text-red-700'}`}>
              {checkoutMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartPage