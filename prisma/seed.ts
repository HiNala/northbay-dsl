import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Creating test users...')

  // Ensure roles exist
  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      displayName: 'Administrator',
      level: 80,
      permissions: ['*'],
    },
  })

  const managerRole = await prisma.role.upsert({
    where: { name: 'manager' },
    update: {},
    create: {
      name: 'manager',
      displayName: 'Manager',
      level: 70,
      permissions: ['leads.manage', 'products.manage', 'orders.manage', 'users.view'],
    },
  })

  const employeeRole = await prisma.role.upsert({
    where: { name: 'employee' },
    update: {},
    create: {
      name: 'employee',
      displayName: 'Employee',
      level: 50,
      permissions: ['leads.view', 'products.view', 'orders.view'],
    },
  })

  const testPassword = await hash('password123', 12)

  // Create or update admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@nbkb.com' },
    update: { password: testPassword },
    create: {
      id: crypto.randomUUID(),
      email: 'admin@nbkb.com',
      password: testPassword,
    },
  })

  await prisma.profile.upsert({
    where: { userId: adminUser.id },
    update: {},
    create: {
      id: crypto.randomUUID(),
      userId: adminUser.id,
      fullName: 'Admin User',
      phone: '(707) 555-0001',
    },
  })

  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: adminUser.id, roleId: adminRole.id } },
    update: {},
    create: {
      userId: adminUser.id,
      roleId: adminRole.id,
    },
  })

  // Create or update manager user
  const managerUser = await prisma.user.upsert({
    where: { email: 'manager@nbkb.com' },
    update: { password: testPassword },
    create: {
      id: crypto.randomUUID(),
      email: 'manager@nbkb.com',
      password: testPassword,
    },
  })

  await prisma.profile.upsert({
    where: { userId: managerUser.id },
    update: {},
    create: {
      id: crypto.randomUUID(),
      userId: managerUser.id,
      fullName: 'Manager User',
      phone: '(707) 555-0002',
    },
  })

  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: managerUser.id, roleId: managerRole.id } },
    update: {},
    create: {
      userId: managerUser.id,
      roleId: managerRole.id,
    },
  })

  // Create or update employee user
  const employeeUser = await prisma.user.upsert({
    where: { email: 'employee@nbkb.com' },
    update: { password: testPassword },
    create: {
      id: crypto.randomUUID(),
      email: 'employee@nbkb.com',
      password: testPassword,
    },
  })

  await prisma.profile.upsert({
    where: { userId: employeeUser.id },
    update: {},
    create: {
      id: crypto.randomUUID(),
      userId: employeeUser.id,
      fullName: 'Employee User',
      phone: '(707) 555-0003',
    },
  })

  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: employeeUser.id, roleId: employeeRole.id } },
    update: {},
    create: {
      userId: employeeUser.id,
      roleId: employeeRole.id,
    },
  })

  console.log('✅ Test users created/updated successfully!')
  console.log('Login credentials:')
  console.log('   - admin@nbkb.com / password123 (Admin)')
  console.log('   - manager@nbkb.com / password123 (Manager)')
  console.log('   - employee@nbkb.com / password123 (Employee)')
}

main()
  .catch((e) => {
    console.error('❌ Error creating test users:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 