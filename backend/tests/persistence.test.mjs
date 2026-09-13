import assert from 'node:assert/strict'
import prisma from '../lib/prisma.js'

try {
  const admin = await prisma.adminUser.findFirst({
    where: { email: 'admin@vendora.co' },
  })

  assert.ok(admin, 'Expected default Vendora admin to be seeded in the database')

  const customerCount = await prisma.customer.count()
  assert.ok(customerCount > 0, 'Expected seeded customer records in the database')

  console.log('persistence test passed')
} finally {
  await prisma.$disconnect()
}
