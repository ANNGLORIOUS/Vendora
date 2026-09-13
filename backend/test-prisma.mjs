import prisma from './lib/prisma.js'

console.log('prisma ready')
await prisma.$disconnect()
