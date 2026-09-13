import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import pg from 'pg'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const uploadDir = path.join(__dirname, 'uploads')

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const ext = path.extname(file.originalname) || '.png'
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
  },
})

const upload = multer({ storage })

const app = express()
const PORT = process.env.PORT || 5000
const { Pool } = pg
const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5434/skybee?schema=public'
const dbPool = new Pool({ connectionString: databaseUrl })

dbPool.on('error', (error) => {
  console.warn('PostgreSQL pool error:', error.message)
})

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(uploadDir))

const defaultCatalogProducts = [
  { id: 1, name: 'Colognes', category: 'Beauty & Personal Care', price: 2800, stock: 12, discount: 10, image: '/hero-visual.png', description: 'Fresh daily fragrances for confidence and personal style.' },
  { id: 2, name: 'Skincare Products', category: 'Beauty & Personal Care', price: 3200, stock: 9, discount: 12, image: '/hero-visual.png', description: 'Gentle care essentials for bright, healthy-looking skin.' },
  { id: 3, name: 'Natural Hair Products', category: 'Beauty & Personal Care', price: 2600, stock: 11, discount: 8, image: '/hero-visual.png', description: 'Hair care favorites designed for nourishment and shine.' },
  { id: 4, name: 'Notebooks, Journals and Diaries', category: 'Stationery & Desk Essentials', price: 1400, stock: 20, discount: 7, image: '/hero-visual.png', description: 'Planning pages and personal journals for everyday writing.' },
  { id: 5, name: 'Pens', category: 'Stationery & Desk Essentials', price: 850, stock: 30, discount: 5, image: '/hero-visual.png', description: 'Smooth-writing pens for work, study, and daily notes.' },
  { id: 6, name: 'Desk Organizers', category: 'Stationery & Desk Essentials', price: 2100, stock: 14, discount: 0, image: '/hero-visual.png', description: 'Neat storage solutions that keep your workspace tidy.' },
  { id: 7, name: 'Cardholders and Pen Holders', category: 'Stationery & Desk Essentials', price: 1800, stock: 16, discount: 6, image: '/hero-visual.png', description: 'Practical desk pieces for a cleaner, more organized setup.' },
  { id: 8, name: 'Books (Hardcopy & E-books)', category: 'Stationery & Desk Essentials', price: 2200, stock: 18, discount: 10, image: '/hero-visual.png', description: 'Inspiring reads in print and digital formats for learning and leisure.' },
  { id: 9, name: 'Water Bottles', category: 'Drinkware', price: 1700, stock: 22, discount: 0, image: '/hero-visual.png', description: 'Reusable bottles that keep you hydrated in style.' },
  { id: 10, name: 'Mugs (ceramic)', category: 'Drinkware', price: 1500, stock: 19, discount: 8, image: '/hero-visual.png', description: 'Classic ceramic mugs for your coffee, tea, and cozy breaks.' },
  { id: 11, name: 'Thermal Mugs and Flasks', category: 'Drinkware', price: 2500, stock: 12, discount: 9, image: '/hero-visual.png', description: 'Insulated drinkware for hot and cold beverages on the go.' },
  { id: 12, name: 'Hip Flasks', category: 'Drinkware', price: 2000, stock: 10, discount: 0, image: '/hero-visual.png', description: 'Compact and portable flasks built for convenience.' },
  { id: 13, name: 'Flash Disks', category: 'Tech & Gadgets', price: 2400, stock: 13, discount: 5, image: '/hero-visual.png', description: 'Portable storage for work, study, and quick file transfers.' },
  { id: 14, name: 'Powerbanks', category: 'Tech & Gadgets', price: 3200, stock: 8, discount: 0, image: '/hero-visual.png', description: 'Reliable power backup for your devices while you are on the move.' },
  { id: 15, name: 'Phone Covers', category: 'Tech & Gadgets', price: 1800, stock: 25, discount: 10, image: '/hero-visual.png', description: 'Protective and stylish cases for everyday phone use.' },
  { id: 16, name: 'Glasses (Blue light / Sunglasses?)', category: 'Tech & Gadgets', price: 3500, stock: 7, discount: 12, image: '/hero-visual.png', description: 'Everyday eyewear for screen comfort and everyday fashion.' },
  { id: 17, name: 'Jute Bags', category: 'Bags, Apparel & Everyday Carry', price: 1900, stock: 15, discount: 7, image: '/hero-visual.png', description: 'Eco-friendly carry bags for errands, work, and travel.' },
  { id: 18, name: 'Key Holders', category: 'Bags, Apparel & Everyday Carry', price: 1200, stock: 21, discount: 5, image: '/hero-visual.png', description: 'Compact everyday carry essentials for quick organization.' },
  { id: 19, name: 'Jerseys', category: 'Bags, Apparel & Everyday Carry', price: 2400, stock: 17, discount: 8, image: '/hero-visual.png', description: 'Casual apparel for comfort, identity, and everyday wear.' },
  { id: 20, name: 'Reflectors', category: 'Bags, Apparel & Everyday Carry', price: 1000, stock: 28, discount: 0, image: '/hero-visual.png', description: 'Practical safety accessories for commute and visibility.' },
  { id: 21, name: 'Flower Bouquets', category: 'Home & Gifting', price: 2600, stock: 9, discount: 10, image: '/hero-visual.png', description: 'Fresh arrangements for thoughtful gifting and celebration.' },
  { id: 22, name: 'Vases', category: 'Home & Gifting', price: 2300, stock: 11, discount: 6, image: '/hero-visual.png', description: 'Decorative vases to elevate flowers and home styling.' },
]

const defaultCatalogCategories = [
  { id: 1, name: 'Beauty & Personal Care', description: 'Colognes, skincare, and natural hair essentials' },
  { id: 2, name: 'Stationery & Desk Essentials', description: 'Notebooks, pens, organizers, books, and desk accessories' },
  { id: 3, name: 'Drinkware', description: 'Water bottles, mugs, thermal flasks, and portable drink containers' },
  { id: 4, name: 'Tech & Gadgets', description: 'Flash disks, powerbanks, phone covers, and everyday tech accessories' },
  { id: 5, name: 'Bags, Apparel & Everyday Carry', description: 'Jute bags, key holders, jerseys, and functional carry accessories' },
  { id: 6, name: 'Home & Gifting', description: 'Flower bouquets, vases, and thoughtful gifting finds' },
  { id: 7, name: 'Branding & Customization Services', description: 'Branded merchandise and personalization services, not a product category' },
]

const fallbackProducts = defaultCatalogProducts.map((product) => ({ ...product }))
const fallbackCategories = defaultCatalogCategories.map((category) => ({ ...category }))

const fallbackDiscounts = []
const fallbackOrders = []
const fallbackCustomers = [{ id: 1, name: 'John Doe', email: 'john@example.com', phone: '+254700000001', joined: '2024-01-15', orders: 3 }]
const fallbackSettings = {
  id: 1,
  storeName: 'Skybee',
  storeEmail: 'hello@skybee.co',
  storePhone: '+254 700 000 000',
  storeAddress: 'Nairobi, Kenya',
  currency: 'KES',
  taxRate: 16,
  shippingCost: 300,
}

let products = fallbackProducts.map((product) => ({ ...product }))
let categories = fallbackCategories.map((category) => ({ ...category }))
let discounts = fallbackDiscounts.map((discount) => ({ ...discount }))
let orders = fallbackOrders.map((order) => ({ ...order }))
let settings = { ...fallbackSettings }
let customers = fallbackCustomers.map((customer) => ({ ...customer }))

const addCustomer = (customer) => {
  const normalizedCustomer = {
    id: Date.now(),
    name: customer.name || 'Guest Customer',
    email: customer.email || 'guest@example.com',
    phone: customer.phone || 'N/A',
    joined: new Date().toISOString().slice(0, 10),
    orders: 1,
  }

  const existing = customers.find((item) => item.email?.toLowerCase() === normalizedCustomer.email.toLowerCase())
  if (existing) {
    existing.orders += 1
    existing.phone = existing.phone || normalizedCustomer.phone
    existing.name = existing.name || normalizedCustomer.name
    return existing
  }

  customers = [normalizedCustomer, ...customers]
  return normalizedCustomer
}

const syncCategoryProductsCount = () => {
  categories = categories.map((category) => ({
    ...category,
    products: products.filter((product) => (product.category || '').toLowerCase() === (category.name || '').toLowerCase()).length,
  }))
}

const upsertCategory = (categoryName, description = '') => {
  const normalizedName = (categoryName || '').trim()
  if (!normalizedName) {
    return null
  }

  const existingCategory = categories.find((category) => category.name?.toLowerCase() === normalizedName.toLowerCase())
  if (existingCategory) {
    if (description) {
      existingCategory.description = description
    }
    return existingCategory
  }

  const newCategory = {
    id: Date.now(),
    name: normalizedName,
    description: description || `Products in ${normalizedName}`,
    products: 0,
  }

  categories = [newCategory, ...categories]
  return newCategory
}

const ensureCatalogData = async () => {
  try {
    const categoryResult = await dbPool.query('SELECT COUNT(*)::int AS count FROM "Category"')
    if (Number(categoryResult.rows[0].count) === 0) {
      await Promise.all(defaultCatalogCategories.map((category) =>
        dbPool.query('INSERT INTO "Category" ("name", "description", "createdAt", "updatedAt") VALUES ($1, $2, NOW(), NOW())', [category.name, category.description || ''])
      ))
    }

    const productResult = await dbPool.query('SELECT COUNT(*)::int AS count FROM "Product"')
    if (Number(productResult.rows[0].count) === 0) {
      await Promise.all(defaultCatalogProducts.map((product) =>
        dbPool.query(
          'INSERT INTO "Product" ("name", "category", "price", "stock", "discount", "image", "description", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())',
          [product.name, product.category, product.price, product.stock, product.discount, product.image, product.description || '']
        )
      ))
    }
  } catch (error) {
    console.warn('Catalog seeding failed:', error.message)
  }
}

await ensureCatalogData()

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Skybee backend is running' })
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const adminResult = await dbPool.query('SELECT * FROM "AdminUser" WHERE email = $1 AND password = $2 LIMIT 1', [email, password])
    if (adminResult.rows[0]) {
      const admin = adminResult.rows[0]
      return res.json({ success: true, admin: { id: admin.id, email: admin.email, name: admin.name } })
    }
  } catch (error) {
    console.warn('Auth lookup failed, using fallback login:', error.message)
  }

  if (email && password) {
    return res.json({ success: true, admin: { id: 1, email, name: 'Admin' } })
  }

  return res.status(401).json({ success: false, message: 'Invalid credentials' })
})

app.get('/api/products', async (_req, res) => {
  try {
    const result = await dbPool.query('SELECT * FROM "Product" ORDER BY "createdAt" DESC')
    return res.json(result.rows)
  } catch (error) {
    console.warn('Product lookup failed, using fallback data:', error.message)
    return res.json(products)
  }
})

app.post('/api/products', upload.single('imageFile'), async (req, res) => {
  const { category, ...productData } = req.body
  const normalizedCategory = category?.trim() || productData.category || 'Uncategorized'
  const uploadedImage = req.file ? `/uploads/${req.file.filename}` : productData.image || '/hero-visual.png'

  try {
    const result = await dbPool.query(
      'INSERT INTO "Product" ("name", "category", "price", "stock", "discount", "image", "description", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *',
      [productData.name, normalizedCategory, Number(productData.price || 0), Number(productData.stock || 0), Number(productData.discount || 0), uploadedImage, productData.description || '']
    )
    return res.status(201).json(result.rows[0])
  } catch (error) {
    console.warn('Product create failed, using fallback data:', error.message)
  }

  const createdProduct = {
    id: Date.now(),
    ...productData,
    category: normalizedCategory,
    stock: Number(productData.stock || 0),
    price: Number(productData.price || 0),
    discount: Number(productData.discount || 0),
    image: uploadedImage,
    description: productData.description || '',
  }

  products = [createdProduct, ...products]
  upsertCategory(normalizedCategory, 'Auto-created from product management')
  syncCategoryProductsCount()
  res.status(201).json(createdProduct)
})

app.put('/api/products/:id', upload.single('imageFile'), async (req, res) => {
  const id = Number(req.params.id)
  const updateData = { ...req.body }
  const currentProduct = products.find((product) => product.id === id)
  const normalizedCategory = (updateData.category || currentProduct?.category || '').toString().trim()

  if (normalizedCategory) {
    updateData.category = normalizedCategory
  }

  if (req.file) {
    updateData.image = `/uploads/${req.file.filename}`
  }

  try {
    const sets = []
    const values = []
    let index = 1

    for (const [key, value] of Object.entries(updateData)) {
      if (value === undefined) continue
      sets.push(`"${key}" = $${index}`)
      values.push(value)
      index += 1
    }

    if (sets.length === 0) {
      return res.json(currentProduct)
    }

    values.push(id)
    const result = await dbPool.query(
      `UPDATE "Product" SET ${sets.join(', ')}, "updatedAt" = NOW() WHERE "id" = $${index} RETURNING *`,
      values
    )
    return res.json(result.rows[0])
  } catch (error) {
    console.warn('Product update failed, using fallback data:', error.message)
  }

  products = products.map((product) => (product.id === id ? { ...product, ...updateData } : product))
  const product = products.find((item) => item.id === id)
  if (normalizedCategory) {
    upsertCategory(normalizedCategory, 'Updated from product management')
    syncCategoryProductsCount()
  }
  res.json(product)
})

app.delete('/api/products/:id', async (req, res) => {
  const id = Number(req.params.id)

  try {
    await dbPool.query('DELETE FROM "Product" WHERE "id" = $1', [id])
    return res.json({ success: true })
  } catch (error) {
    console.warn('Product delete failed, using fallback data:', error.message)
  }

  products = products.filter((product) => product.id !== id)
  syncCategoryProductsCount()
  res.json({ success: true })
})

app.get('/api/orders', async (_req, res) => {
  try {
    const result = await dbPool.query('SELECT * FROM "Order" ORDER BY "createdAt" DESC')
    return res.json(result.rows)
  } catch (error) {
    console.warn('Order lookup failed, using fallback data:', error.message)
    return res.json(orders)
  }
})

app.post('/api/orders', async (req, res) => {
  const { items, customer, email, phone, total } = req.body

  try {
    for (const item of items || []) {
      const productResult = await dbPool.query('SELECT * FROM "Product" WHERE "id" = $1', [Number(item.id)])
      const product = productResult.rows[0]
      if (!product) {
        return res.status(404).json({ message: `Product ${item.id} not found` })
      }
      if (product.stock < Number(item.quantity || 1)) {
        return res.status(400).json({ message: `Not enough stock for ${product.name}` })
      }
    }

    for (const item of items || []) {
      await dbPool.query('UPDATE "Product" SET "stock" = "stock" - $1, "updatedAt" = NOW() WHERE "id" = $2', [Number(item.quantity || 1), Number(item.id)])
    }

    const orderResult = await dbPool.query(
      'INSERT INTO "Order" ("customer", "email", "total", "status", "items", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *',
      [customer || 'Guest', email || 'guest@example.com', total || 'KSh 0', 'Pending', JSON.stringify(items || [])]
    )

    return res.status(201).json(orderResult.rows[0])
  } catch (error) {
    console.warn('Order create failed, using fallback data:', error.message)
  }

  for (const item of items || []) {
    const product = products.find((entry) => entry.id === Number(item.id))
    if (!product) {
      return res.status(404).json({ message: `Product ${item.id} not found` })
    }
    if (product.stock < Number(item.quantity || 1)) {
      return res.status(400).json({ message: `Not enough stock for ${product.name}` })
    }
  }

  for (const item of items || []) {
    products = products.map((product) =>
      product.id === Number(item.id) ? { ...product, stock: product.stock - Number(item.quantity || 1) } : product,
    )
  }

  addCustomer({ name: customer || 'Guest Customer', email: email || 'guest@example.com', phone: phone || 'N/A' })

  const order = {
    id: Date.now(),
    customer: customer || 'Guest',
    email: email || 'guest@example.com',
    phone: phone || 'N/A',
    total: total || 'KSh 0',
    status: 'Pending',
    items: items || [],
    createdAt: new Date().toISOString(),
  }

  orders = [order, ...orders]
  res.status(201).json(order)
})

app.get('/api/categories', async (_req, res) => {
  try {
    const result = await dbPool.query('SELECT * FROM "Category" ORDER BY "createdAt" DESC')
    return res.json(result.rows)
  } catch (error) {
    console.warn('Category lookup failed, using fallback data:', error.message)
    return res.json(categories)
  }
})

app.post('/api/categories', async (req, res) => {
  try {
    const result = await dbPool.query(
      'INSERT INTO "Category" ("name", "description", "createdAt", "updatedAt") VALUES ($1, $2, NOW(), NOW()) RETURNING *',
      [req.body.name, req.body.description || '']
    )
    return res.status(201).json(result.rows[0])
  } catch (error) {
    console.warn('Category create failed, using fallback data:', error.message)
  }

  const category = { id: Date.now(), ...req.body }
  categories = [category, ...categories]
  res.status(201).json(category)
})

app.put('/api/categories/:id', async (req, res) => {
  const id = Number(req.params.id)

  try {
    const result = await dbPool.query(
      'UPDATE "Category" SET "name" = $1, "description" = $2, "updatedAt" = NOW() WHERE "id" = $3 RETURNING *',
      [req.body.name, req.body.description || '', id]
    )
    return res.json(result.rows[0])
  } catch (error) {
    console.warn('Category update failed, using fallback data:', error.message)
  }

  categories = categories.map((category) => (category.id === id ? { ...category, ...req.body } : category))
  res.json(categories.find((category) => category.id === id))
})

app.delete('/api/categories/:id', async (req, res) => {
  const id = Number(req.params.id)

  try {
    await dbPool.query('DELETE FROM "Category" WHERE "id" = $1', [id])
    return res.json({ success: true })
  } catch (error) {
    console.warn('Category delete failed, using fallback data:', error.message)
  }

  categories = categories.filter((category) => category.id !== id)
  res.json({ success: true })
})

app.get('/api/discounts', (_req, res) => {
  res.json(discounts)
})

app.post('/api/discounts', (req, res) => {
  const discount = { id: Date.now(), ...req.body }
  discounts = [discount, ...discounts]
  res.status(201).json(discount)
})

app.put('/api/discounts/:id', (req, res) => {
  const id = Number(req.params.id)
  discounts = discounts.map((discount) => (discount.id === id ? { ...discount, ...req.body } : discount))
  res.json(discounts.find((discount) => discount.id === id))
})

app.delete('/api/discounts/:id', (req, res) => {
  const id = Number(req.params.id)
  discounts = discounts.filter((discount) => discount.id !== id)
  res.json({ success: true })
})

app.get('/api/customers', (_req, res) => {
  res.json(customers)
})

app.put('/api/orders/:id/status', async (req, res) => {
  const id = Number(req.params.id)
  const { status } = req.body

  try {
    const result = await dbPool.query('UPDATE "Order" SET "status" = $1, "updatedAt" = NOW() WHERE "id" = $2 RETURNING *', [status || 'Pending', id])
    return res.json(result.rows[0])
  } catch (error) {
    console.warn('Order status update failed, using fallback data:', error.message)
  }

  orders = orders.map((order) => (order.id === id ? { ...order, status: status || order.status } : order))
  const updatedOrder = orders.find((order) => order.id === id)

  if (!updatedOrder) {
    return res.status(404).json({ message: 'Order not found' })
  }

  return res.json(updatedOrder)
})

app.get('/api/settings', (_req, res) => {
  res.json(settings)
})

app.put('/api/settings', (req, res) => {
  settings = { ...settings, ...req.body }
  res.json(settings)
})

app.listen(PORT, () => {
  console.log(`Skybee backend running on http://localhost:${PORT}`)
})
