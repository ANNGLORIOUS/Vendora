import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'

const API_BASE = 'http://localhost:5000/api'
const BACKEND_BASE = 'http://localhost:5000'

const categoryCatalog = [
  {
    name: 'Beauty & Personal Care',
    items: ['Colognes', 'Skincare Products', 'Natural Hair Products'],
  },
  {
    name: 'Stationery & Desk Essentials',
    items: ['Notebooks, Journals and Diaries', 'Pens', 'Desk Organizers', 'Cardholders and Pen Holders', 'Books (Hardcopy & E-books)'],
  },
  {
    name: 'Drinkware',
    items: ['Water Bottles', 'Mugs (ceramic)', 'Thermal Mugs and Flasks', 'Hip Flasks'],
  },
  {
    name: 'Tech & Gadgets',
    items: ['Flash Disks', 'Powerbanks', 'Phone Covers', 'Glasses (Blue light / Sunglasses?)'],
  },
  {
    name: 'Bags, Apparel & Everyday Carry',
    items: ['Jute Bags', 'Key Holders', 'Jerseys', 'Reflectors'],
  },
  {
    name: 'Home & Gifting',
    items: ['Flower Bouquets', 'Vases'],
  },
  {
    name: 'Branding & Customization Services',
    items: ['General Branding', 'Laptop Branding', 'Mug branding', 'Bottle branding'],
    isService: true,
  },
]

const getImageUrl = (image) => {
  if (!image) return '/hero-visual.png'
  if (image.startsWith('http://') || image.startsWith('https://')) return image
  if (image.startsWith('/uploads/')) return `${BACKEND_BASE}${image}`
  return image
}

function ProductsPage() {
  const [products, setProducts] = useState([])
  const [message, setMessage] = useState('')
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE}/products`)
        const contentType = response.headers.get('content-type') || ''

        if (!response.ok) {
          throw new Error('Unable to load products right now.')
        }

        if (!contentType.includes('application/json')) {
          throw new Error('The server returned an unexpected response.')
        }

        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Failed to fetch products', error)
        setMessage(error.message || 'Unable to load products right now.')
      }
    }

    fetchProducts()
  }, [])

  const groupedProducts = categoryCatalog
    .map((category) => {
      const matchedProducts = products.filter((product) => product.category === category.name)
      const displayItems = matchedProducts.length > 0 ? matchedProducts : category.items.map((item, index) => ({
        id: `${category.name}-${index}`,
        name: item,
        description: category.isService ? 'Customization and branding service' : 'Product category item',
        price: 0,
        stock: 0,
        discount: 0,
        category: category.name,
        image: '/hero-visual.png',
      }))

      return {
        categoryName: category.name,
        items: displayItems,
        catalogItems: category.items,
        isService: category.isService,
      }
    })

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      amount: product.category,
      price: product.price,
      image: getImageUrl(product.image),
    })
    setMessage(`${product.name} added to cart.`)
  }

  return (
    <div className="min-h-screen bg-(--brand-50) text-(--text-strong)">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-(--brand-700)">Skybee</p>
          <h1 className="mt-2 text-4xl font-semibold text-(--brand-900) sm:text-5xl">Curated lifestyle collections</h1>
          <p className="mt-3 max-w-3xl text-lg text-(--text-soft)">
            Browse by category to find the products that fit your routine, gifting needs, and everyday essentials.
          </p>
        </div>

        {message && (
          <div className={`mb-6 rounded-2xl border px-4 py-3 text-sm ${message.includes('added') ? 'border-green-200 bg-green-50 text-green-700' : 'border-red-200 bg-red-50 text-red-700'}`}>
            {message}
          </div>
        )}

        <div className="space-y-10">
          {groupedProducts.map((group) => (
            <section key={group.categoryName} className="rounded-3xl border border-(--brand-300)/70 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6 flex items-center justify-between gap-3">
                <h2 className="text-2xl font-bold text-(--brand-900)">{group.categoryName}</h2>
                <span className="rounded-full bg-(--brand-100) px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-(--brand-900)">
                  {group.isService ? 'Service' : `${group.items.length} items`}
                </span>
              </div>

              {group.isService ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {group.items.map((service) => (
                    <div key={service.id} className="rounded-3xl border border-(--brand-300)/70 bg-(--brand-50) p-5 shadow-sm">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-(--brand-900) text-sm font-bold text-white">
                        {service.name.charAt(0).toUpperCase()}
                      </div>
                      <h3 className="text-lg font-semibold text-(--brand-900)">{service.name}</h3>
                      <p className="mt-2 text-sm text-(--text-soft)">{service.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                  {group.items.map((product) => (
                    <article key={product.id} className="flex flex-col overflow-hidden rounded-3xl border border-(--brand-300)/70 bg-(--brand-50)">
                      <img src={getImageUrl(product.image)} alt={product.name} className="h-44 w-full object-cover" />
                      <div className="flex flex-1 flex-col p-4">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-lg font-semibold text-(--brand-900)">{product.name}</h3>
                          {product.discount > 0 && (
                            <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
                              {product.discount}% off
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-sm text-(--text-soft)">{product.category}</p>
                        <p className="mt-2 text-sm text-(--text-soft)">{product.description}</p>
                        <p className="mt-4 text-xl font-semibold text-(--brand-700)">{product.price > 0 ? `Ksh ${product.price.toLocaleString()}` : 'Price on request'}</p>
                        {product.stock > 0 && <p className="mt-1 text-sm text-(--text-soft)">Stock: {product.stock}</p>}
                        {product.price > 0 && (
                          <button
                            onClick={() => handleAddToCart(product)}
                            disabled={product.stock <= 0}
                            className="mt-5 rounded-full bg-(--brand-900) px-4 py-2 text-sm font-semibold text-white transition hover:bg-(--brand-700) disabled:cursor-not-allowed disabled:bg-gray-400"
                          >
                            {product.stock > 0 ? 'Add to Cart' : 'Out of stock'}
                          </button>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductsPage