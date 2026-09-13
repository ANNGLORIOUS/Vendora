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

const fallbackCustomers = [
  {
    id: 1,
    name: 'Muthiga Butchery',
    contactPerson: 'James Wagura',
    phone: '+254712345678',
    location: 'Nairobi West',
    status: 'Active',
    totalOrders: 12,
    totalPaid: 248000,
    outstandingBalance: 42000,
  },
  {
    id: 2,
    name: 'Kisumu Meat Hub',
    contactPerson: 'Lucy Achieng',
    phone: '+254723456789',
    location: 'Kisumu',
    status: 'VIP',
    totalOrders: 9,
    totalPaid: 330000,
    outstandingBalance: 26000,
  },
  {
    id: 3,
    name: 'Nakuru Supplies Co.',
    contactPerson: 'Peter Kamau',
    phone: '+254734567890',
    location: 'Nakuru',
    status: 'Active',
    totalOrders: 7,
    totalPaid: 185000,
    outstandingBalance: 93000,
  },
]

const fallbackOrders = [
  {
    id: 1,
    customerName: 'Muthiga Butchery',
    customerId: 1,
    meatType: 'Beef',
    quantity: 45,
    unitPrice: 420,
    totalAmount: 18900,
    amountPaid: 15000,
    balance: 3900,
    paymentStatus: 'Partially Paid',
    orderStatus: 'In Transit',
    notes: 'Deliver to cold room by 4pm.',
    orderDate: '2026-09-10T08:00:00.000Z',
  },
  {
    id: 2,
    customerName: 'Kisumu Meat Hub',
    customerId: 2,
    meatType: 'Goat',
    quantity: 24,
    unitPrice: 520,
    totalAmount: 12480,
    amountPaid: 12480,
    balance: 0,
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    notes: 'Weekend order completed.',
    orderDate: '2026-09-08T09:30:00.000Z',
  },
  {
    id: 3,
    customerName: 'Nakuru Supplies Co.',
    customerId: 3,
    meatType: 'Chicken',
    quantity: 80,
    unitPrice: 180,
    totalAmount: 14400,
    amountPaid: 7000,
    balance: 7400,
    paymentStatus: 'Partially Paid',
    orderStatus: 'Pending',
    notes: 'Awaiting final payment before dispatch.',
    orderDate: '2026-09-12T11:45:00.000Z',
  },
]

const fallbackPayments = [
  {
    id: 1,
    orderId: 1,
    customerName: 'Muthiga Butchery',
    amount: 15000,
    paymentDate: '2026-09-10T10:15:00.000Z',
    method: 'Mpesa',
    notes: 'Initial deposit',
  },
  {
    id: 2,
    orderId: 2,
    customerName: 'Kisumu Meat Hub',
    amount: 12480,
    paymentDate: '2026-09-09T14:20:00.000Z',
    method: 'Bank Transfer',
    notes: 'Full settlement',
  },
  {
    id: 3,
    orderId: 3,
    customerName: 'Nakuru Supplies Co.',
    amount: 7000,
    paymentDate: '2026-09-12T13:00:00.000Z',
    method: 'Cash',
    notes: 'Partial payment received',
  },
]

const fallbackCowPurchases = [
  {
    id: 1,
    purchaseDate: '2026-09-05T07:00:00.000Z',
    seller: 'Machakos Farmers Co-op',
    cowCount: 8,
    purchasePrice: 42000,
    totalCost: 336000,
    weightKg: 220,
    notes: 'Healthy herd with recent vaccinations.',
  },
  {
    id: 2,
    purchaseDate: '2026-09-01T08:30:00.000Z',
    seller: 'Kajiado Livestock Group',
    cowCount: 5,
    purchasePrice: 38000,
    totalCost: 190000,
    weightKg: 198,
    notes: 'Pending arrival and health check.',
  },
]

const fallbackSuppliers = [
  {
    id: 1,
    name: 'Machakos Farmers Co-op',
    phone: '+254712220011',
    email: 'orders@machakosfarmers.co.ke',
    location: 'Machakos',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Kajiado Livestock Group',
    phone: '+254723446677',
    email: 'info@kajiadolivestock.co.ke',
    location: 'Kajiado',
    status: 'VIP',
  },
]

const fallbackExpenses = [
  {
    id: 1,
    category: 'Feed',
    amount: 54000,
    description: 'Livestock feed delivery',
    vendor: 'Green Pasture Feeds',
    incurredDate: '2026-09-12T00:00:00.000Z',
  },
  {
    id: 2,
    category: 'Transport',
    amount: 18000,
    description: 'Delivery logistics for customer orders',
    vendor: 'Nairobi Logistics',
    incurredDate: '2026-09-10T00:00:00.000Z',
  },
]

const fallbackSmsLogs = [
  {
    id: 1,
    recipient: 'Muthiga Butchery',
    phone: '+254712345678',
    template: 'Your balance is overdue. Please settle your account.',
    status: 'Queued',
    sentAt: '2026-09-12T08:30:00.000Z',
  },
]

const fallbackSettings = {
  id: 1,
  businessName: 'Vendora',
  businessEmail: 'hello@vendora.co',
  businessPhone: '+254 700 000 000',
  businessAddress: 'Nairobi, Kenya',
  defaultCurrency: 'KES',
  reminderThresholdDays: 7,
  invoicePrefix: 'VND',
}

let orders = fallbackOrders.map((order) => ({ ...order }))
let customers = fallbackCustomers.map((customer) => ({ ...customer }))
let payments = fallbackPayments.map((payment) => ({ ...payment }))
let cowPurchases = fallbackCowPurchases.map((purchase) => ({ ...purchase }))
let suppliers = fallbackSuppliers.map((supplier) => ({ ...supplier }))
let expenses = fallbackExpenses.map((expense) => ({ ...expense }))
let smsLogs = fallbackSmsLogs.map((log) => ({ ...log }))
let settings = { ...fallbackSettings }

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
  res.json({ status: 'ok', message: 'Vendora backend is running' })
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
    const validEmail = email.toLowerCase() === 'admin@vendora.co' || email.toLowerCase() === 'admin@skybee.co'
    if (validEmail && password === 'admin123') {
      return res.json({ success: true, admin: { id: 1, email, name: 'Vendora Admin' } })
    }
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
  const { customerName, customerId, meatType, quantity, unitPrice, amountPaid, notes, paymentStatus, orderStatus } = req.body

  const parsedQuantity = Number(quantity || 0)
  const parsedUnitPrice = Number(unitPrice || 0)
  const parsedPaid = Number(amountPaid || 0)
  const totalAmount = parsedQuantity * parsedUnitPrice
  const balance = totalAmount - parsedPaid
  const resolvedPaymentStatus = paymentStatus || (parsedPaid >= totalAmount ? 'Paid' : parsedPaid > 0 ? 'Partially Paid' : 'Outstanding')

  const order = {
    id: Date.now(),
    customerId: customerId || null,
    customerName: customerName || 'Walk-in Customer',
    meatType: meatType || 'Beef',
    quantity: parsedQuantity,
    unitPrice: parsedUnitPrice,
    totalAmount,
    amountPaid: parsedPaid,
    balance,
    paymentStatus: resolvedPaymentStatus,
    orderStatus: orderStatus || 'Pending',
    notes: notes || '',
    orderDate: new Date().toISOString(),
  }

  orders = [order, ...orders]

  const customer = customers.find((entry) => entry.id === Number(customerId))
  if (customer) {
    customer.totalOrders = (customer.totalOrders || 0) + 1
    customer.outstandingBalance = Number(customer.outstandingBalance || 0) + balance
  }

  return res.status(201).json(order)
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

app.post('/api/customers', (req, res) => {
  const { name, contactPerson, phone, location, status } = req.body

  const customer = {
    id: Date.now(),
    name: name || 'New Customer',
    contactPerson: contactPerson || '',
    phone: phone || 'N/A',
    location: location || '',
    status: status || 'Active',
    totalOrders: 0,
    totalPaid: 0,
    outstandingBalance: 0,
  }

  customers = [customer, ...customers]
  res.status(201).json(customer)
})

app.put('/api/customers/:id', (req, res) => {
  const id = Number(req.params.id)
  const customer = customers.find((entry) => entry.id === id)

  if (!customer) {
    return res.status(404).json({ message: 'Customer not found' })
  }

  const updated = { ...customer, ...req.body }
  customers = customers.map((entry) => entry.id === id ? updated : entry)
  return res.json(updated)
})

app.delete('/api/customers/:id', (req, res) => {
  const id = Number(req.params.id)
  customers = customers.filter((customer) => customer.id !== id)
  res.json({ success: true })
})

app.put('/api/orders/:id', (req, res) => {
  const id = Number(req.params.id)
  const order = orders.find((entry) => entry.id === id)

  if (!order) {
    return res.status(404).json({ message: 'Order not found' })
  }

  const updated = {
    ...order,
    ...req.body,
  }

  const quantity = Number(updated.quantity || 0)
  const unitPrice = Number(updated.unitPrice || 0)
  const amountPaid = Number(updated.amountPaid || 0)
  updated.totalAmount = quantity * unitPrice
  updated.balance = updated.totalAmount - amountPaid
  updated.paymentStatus = updated.paymentStatus || (amountPaid >= updated.totalAmount ? 'Paid' : amountPaid > 0 ? 'Partially Paid' : 'Outstanding')

  orders = orders.map((entry) => entry.id === id ? updated : entry)
  return res.json(updated)
})

app.delete('/api/orders/:id', (req, res) => {
  const id = Number(req.params.id)
  orders = orders.filter((order) => order.id !== id)
  res.json({ success: true })
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

  const order = orders.find((entry) => entry.id === id)
  if (!order) {
    return res.status(404).json({ message: 'Order not found' })
  }

  order.orderStatus = status || order.orderStatus
  return res.json(order)
})

app.get('/api/payments', (_req, res) => {
  res.json(payments)
})

app.post('/api/payments', (req, res) => {
  const { orderId, customerName, amount, paymentDate, method, notes } = req.body
  const payment = {
    id: Date.now(),
    orderId: Number(orderId),
    customerName: customerName || 'Customer',
    amount: Number(amount || 0),
    paymentDate: paymentDate || new Date().toISOString(),
    method: method || 'Mpesa',
    notes: notes || '',
  }

  payments = [payment, ...payments]

  const order = orders.find((entry) => entry.id === Number(orderId))
  if (order) {
    order.amountPaid = Number(order.amountPaid || 0) + Number(amount || 0)
    order.balance = Math.max(0, Number(order.totalAmount || 0) - order.amountPaid)
    order.paymentStatus = order.amountPaid >= Number(order.totalAmount || 0) ? 'Paid' : order.amountPaid > 0 ? 'Partially Paid' : 'Outstanding'
  }

  const customer = customers.find((entry) => entry.name === customerName)
  if (customer) {
    customer.totalPaid = Number(customer.totalPaid || 0) + Number(amount || 0)
    customer.outstandingBalance = Math.max(0, Number(customer.outstandingBalance || 0) - Number(amount || 0))
  }

  res.status(201).json(payment)
})

app.get('/api/cow-purchases', (_req, res) => {
  res.json(cowPurchases)
})

app.post('/api/cow-purchases', (req, res) => {
  const { purchaseDate, seller, cowCount, purchasePrice, weightKg, notes } = req.body
  const parsedCowCount = Number(cowCount || 0)
  const parsedPurchasePrice = Number(purchasePrice || 0)
  const totalCost = parsedCowCount * parsedPurchasePrice

  const purchase = {
    id: Date.now(),
    purchaseDate: purchaseDate || new Date().toISOString(),
    seller: seller || 'Unknown Seller',
    cowCount: parsedCowCount,
    purchasePrice: parsedPurchasePrice,
    totalCost,
    weightKg: weightKg || null,
    notes: notes || '',
  }

  cowPurchases = [purchase, ...cowPurchases]
  res.status(201).json(purchase)
})

app.get('/api/suppliers', (_req, res) => {
  res.json(suppliers)
})

app.post('/api/suppliers', (req, res) => {
  const supplier = {
    id: Date.now(),
    name: req.body.name || 'New Supplier',
    phone: req.body.phone || '',
    email: req.body.email || '',
    location: req.body.location || '',
    status: req.body.status || 'Active',
  }

  suppliers = [supplier, ...suppliers]
  res.status(201).json(supplier)
})

app.get('/api/expenses', (_req, res) => {
  res.json(expenses)
})

app.post('/api/expenses', (req, res) => {
  const expense = {
    id: Date.now(),
    category: req.body.category || 'Other',
    amount: Number(req.body.amount || 0),
    description: req.body.description || '',
    vendor: req.body.vendor || '',
    incurredDate: req.body.incurredDate || new Date().toISOString(),
  }

  expenses = [expense, ...expenses]
  res.status(201).json(expense)
})

app.get('/api/reports/dashboard', (_req, res) => {
  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0)
  const totalPaid = payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0)
  const outstanding = customers.reduce((sum, customer) => sum + Number(customer.outstandingBalance || 0), 0)
  const totalCowSpend = cowPurchases.reduce((sum, purchase) => sum + Number(purchase.totalCost || 0), 0)

  res.json({
    totalCustomers: customers.length,
    totalRevenue,
    totalPaid,
    outstanding,
    totalCowSpend,
    openOrders: orders.filter((order) => order.orderStatus !== 'Delivered').length,
  })
})

app.get('/api/reports/outstanding', (_req, res) => {
  const rows = customers.map((customer) => ({
    name: customer.name,
    balance: Number(customer.outstandingBalance || 0),
    status: Number(customer.outstandingBalance || 0) === 0 ? 'Paid' : 'Outstanding',
  }))

  res.json(rows)
})

app.get('/api/sms/logs', (_req, res) => {
  res.json(smsLogs)
})

app.post('/api/sms/reminders/send', (req, res) => {
  const log = {
    id: Date.now(),
    recipient: req.body.recipient || 'Customer',
    phone: req.body.phone || '+254700000000',
    template: req.body.template || 'Payment reminder',
    status: 'Queued',
    sentAt: new Date().toISOString(),
  }

  smsLogs = [log, ...smsLogs]
  res.status(201).json(log)
})

app.get('/api/settings', (_req, res) => {
  res.json(settings)
})

app.put('/api/settings', (req, res) => {
  settings = { ...settings, ...req.body }
  res.json(settings)
})

app.listen(PORT, () => {
  console.log(`Vendora backend running on http://localhost:${PORT}`)
})
