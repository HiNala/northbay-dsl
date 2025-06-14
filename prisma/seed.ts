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

  console.log('🏷️ Creating brands and categories...')

  // Create brands
  const northBayBrand = await prisma.brand.upsert({
    where: { slug: 'north-bay-designs' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      name: 'North Bay Designs',
      slug: 'north-bay-designs',
      logoUrl: null,
      isActive: true,
    },
  })

  const subZeroWolfBrand = await prisma.brand.upsert({
    where: { slug: 'sub-zero-wolf' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      name: 'Sub-Zero Wolf',
      slug: 'sub-zero-wolf',
      logoUrl: null,
      isActive: true,
    },
  })

  const visualComfortBrand = await prisma.brand.upsert({
    where: { slug: 'visual-comfort' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      name: 'Visual Comfort',
      slug: 'visual-comfort',
      logoUrl: null,
      isActive: true,
    },
  })

  const waterworksBrand = await prisma.brand.upsert({
    where: { slug: 'waterworks' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      name: 'Waterworks',
      slug: 'waterworks',
      logoUrl: null,
      isActive: true,
    },
  })

  // Create categories
  const kitchenIslandsCategory = await prisma.category.upsert({
    where: { slug: 'kitchen-islands' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      name: 'Kitchen Islands',
      slug: 'kitchen-islands',
      description: 'Custom kitchen islands and breakfast bars',
      imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      sortOrder: 1,
      isActive: true,
    },
  })

  const appliancesCategory = await prisma.category.upsert({
    where: { slug: 'appliances' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      name: 'Appliances',
      slug: 'appliances',
      description: 'Professional kitchen appliances',
      imageUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      sortOrder: 2,
      isActive: true,
    },
  })

  const cabinetryCategory = await prisma.category.upsert({
    where: { slug: 'cabinetry' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      name: 'Cabinetry',
      slug: 'cabinetry',
      description: 'Custom kitchen and bathroom cabinetry',
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1558&q=80',
      sortOrder: 3,
      isActive: true,
    },
  })

  const lightingCategory = await prisma.category.upsert({
    where: { slug: 'lighting' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      name: 'Lighting',
      slug: 'lighting',
      description: 'Designer lighting fixtures and chandeliers',
      imageUrl: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      sortOrder: 4,
      isActive: true,
    },
  })

  const bathroomCategory = await prisma.category.upsert({
    where: { slug: 'bathroom' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      name: 'Bathroom',
      slug: 'bathroom',
      description: 'Luxury bathroom fixtures and vanities',
      imageUrl: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80',
      sortOrder: 5,
      isActive: true,
    },
  })

  console.log('✅ Brands and categories created successfully!')

  console.log('🛏️ Creating sample products...')

  // Sample Product 1: Handcrafted Carrara Marble Island
  const marbleIsland = await prisma.product.upsert({
    where: { slug: 'handcrafted-carrara-marble-island' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      name: 'Handcrafted Carrara Marble Island',
      slug: 'handcrafted-carrara-marble-island',
      sku: 'NBKB-MI-001',
      description: 'Imported Italian Carrara marble with unique veining patterns. Features an integrated brass breakfast bar and premium fixtures. Each piece is unique with natural stone characteristics that make every installation one-of-a-kind.',
      specifications: {
        material: 'Italian Carrara Marble',
        dimensions: '84" L x 42" W x 36" H',
        thickness: '1.25 inches',
        finish: 'Polished',
        edgeProfile: 'Eased edge',
        installation: 'Professional required',
        warranty: '10 years',
        weight: 'Approximately 800 lbs'
      },
      price: 4500,
      comparePrice: 5200,
      inStock: true,
      stockQuantity: 3,
      trackInventory: true,
      status: 'PUBLISHED',
      type: 'physical',
      tags: ['handcrafted', 'luxury', 'natural stone', 'breakfast bar', 'italian marble'],
      seoTitle: 'Handcrafted Carrara Marble Kitchen Island | North Bay Kitchen & Bath',
      seoDescription: 'Transform your kitchen with our handcrafted Italian Carrara marble island featuring integrated breakfast bar and premium brass fixtures.',
      categoryId: kitchenIslandsCategory.id,
      brandId: northBayBrand.id,
      aiGeneratedDescription: false,
    },
  })

  // Sample Product 2: Professional Dual-Fuel Range
  const dualFuelRange = await prisma.product.upsert({
    where: { slug: 'professional-dual-fuel-range' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      name: 'Professional Dual-Fuel Range',
      slug: 'professional-dual-fuel-range',
      sku: 'SZW-DF-48',
      description: '48-inch professional series with precision control and dual convection ovens. Features commercial-grade performance with residential elegance, perfect for serious home cooks.',
      specifications: {
        width: '48 inches',
        fuel: 'Dual-fuel (gas cooktop, electric oven)',
        burners: '6 sealed burners + griddle',
        ovens: 'Dual convection ovens',
        capacity: '5.1 cu ft total',
        controls: 'Precision temperature control',
        installation: 'Professional installation required',
        warranty: '2 years full warranty'
      },
      price: 8900,
      comparePrice: null,
      inStock: true,
      stockQuantity: 2,
      trackInventory: true,
      status: 'PUBLISHED',
      type: 'physical',
      tags: ['professional', 'dual-fuel', 'convection', 'commercial-grade', '48-inch'],
      seoTitle: '48" Professional Dual-Fuel Range | Sub-Zero Wolf',
      seoDescription: 'Experience professional cooking with this 48-inch dual-fuel range featuring dual convection ovens and precision controls.',
      categoryId: appliancesCategory.id,
      brandId: subZeroWolfBrand.id,
      aiGeneratedDescription: false,
    },
  })

  // Sample Product 3: Bespoke Walnut Cabinetry
  const walnutCabinetry = await prisma.product.upsert({
    where: { slug: 'bespoke-walnut-cabinetry' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      name: 'Bespoke Walnut Cabinetry',
      slug: 'bespoke-walnut-cabinetry',
      sku: 'NBKB-CAB-WAL',
      description: 'Hand-crafted American black walnut cabinetry with soft-close hardware and lifetime warranty. Each piece is custom-built to your specifications with museum-quality craftsmanship.',
      specifications: {
        wood: 'American Black Walnut',
        construction: 'Solid wood face frames',
        finish: 'Hand-rubbed oil finish',
        hardware: 'Soft-close hinges and slides',
        customization: 'Fully customizable',
        installation: 'Professional installation included',
        warranty: 'Lifetime structural warranty',
        leadTime: '8-12 weeks'
      },
      price: 12500,
      comparePrice: null,
      inStock: true,
      stockQuantity: null, // Made to order
      trackInventory: false,
      status: 'PUBLISHED',
      type: 'physical',
      tags: ['bespoke', 'walnut', 'handcrafted', 'custom', 'lifetime warranty'],
      seoTitle: 'Bespoke Walnut Kitchen Cabinetry | North Bay Kitchen & Bath',
      seoDescription: 'Custom American black walnut cabinetry handcrafted to perfection with lifetime warranty and professional installation.',
      categoryId: cabinetryCategory.id,
      brandId: northBayBrand.id,
      aiGeneratedDescription: false,
    },
  })

  // Sample Product 4: Designer Crystal Chandelier
  const crystalChandelier = await prisma.product.upsert({
    where: { slug: 'designer-crystal-chandelier' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      name: 'Designer Crystal Chandelier',
      slug: 'designer-crystal-chandelier',
      sku: 'VC-CH-001',
      description: 'Hand-forged iron with artisan finish and premium crystal accents. This statement piece transforms any space with elegant lighting and sophisticated design.',
      specifications: {
        material: 'Hand-forged iron',
        crystals: 'Premium cut crystal',
        finish: 'Artisan bronze',
        dimensions: '36" diameter x 42" height',
        bulbs: '12 x E12 candelabra (not included)',
        weight: '65 lbs',
        installation: 'Professional installation required',
        dimmable: 'Yes (with compatible dimmer)'
      },
      price: 3299,
      comparePrice: 3899,
      inStock: true,
      stockQuantity: 1,
      trackInventory: true,
      status: 'PUBLISHED',
      type: 'physical',
      tags: ['designer', 'crystal', 'chandelier', 'hand-forged', 'statement piece'],
      seoTitle: 'Designer Crystal Chandelier | Visual Comfort Lighting',
      seoDescription: 'Elegant hand-forged iron chandelier with premium crystal accents. Perfect statement lighting for dining rooms and entryways.',
      categoryId: lightingCategory.id,
      brandId: visualComfortBrand.id,
      aiGeneratedDescription: false,
    },
  })

  // Sample Product 5: Luxury Spa Vanity Collection
  const spaVanity = await prisma.product.upsert({
    where: { slug: 'luxury-spa-vanity-collection' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      name: 'Luxury Spa Vanity Collection',
      slug: 'luxury-spa-vanity-collection',
      sku: 'WW-VAN-SPA',
      description: 'Marble countertop with undermount basin and soft-close drawers with premium hardware. Create a spa-like experience in your master bathroom.',
      specifications: {
        countertop: 'Carrara marble',
        basin: 'Undermount porcelain',
        storage: 'Soft-close drawers',
        hardware: 'Brushed gold',
        dimensions: '72" W x 22" D x 36" H',
        finish: 'Water-resistant lacquer',
        installation: 'Professional installation included',
        warranty: '5 years'
      },
      price: 5799,
      comparePrice: null,
      inStock: true,
      stockQuantity: 2,
      trackInventory: true,
      status: 'PUBLISHED',
      type: 'physical',
      tags: ['luxury', 'spa', 'vanity', 'marble', 'undermount basin'],
      seoTitle: 'Luxury Spa Vanity Collection | Waterworks Bathroom',
      seoDescription: 'Transform your bathroom into a luxury spa with this marble vanity collection featuring undermount basin and premium fixtures.',
      categoryId: bathroomCategory.id,
      brandId: waterworksBrand.id,
      aiGeneratedDescription: false,
    },
  })

  // Add images for each product
  const products = [marbleIsland, dualFuelRange, walnutCabinetry, crystalChandelier, spaVanity]
  const imageUrls = [
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1558&q=80',
    'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80'
  ]

  for (let i = 0; i < products.length; i++) {
    const product = products[i]
    const imageUrl = imageUrls[i]
    
    await prisma.productImage.upsert({
      where: { id: crypto.randomUUID() },
      update: {},
      create: {
        id: crypto.randomUUID(),
        url: imageUrl,
        alt: `${product.name} - hero image`,
        position: 0,
        isHero: true,
        productId: product.id,
      },
    })
  }

  console.log('✅ Sample products created successfully!')
  console.log('Login credentials:')
  console.log('   - admin@nbkb.com / password123 (Admin)')
  console.log('   - manager@nbkb.com / password123 (Manager)')
  console.log('   - employee@nbkb.com / password123 (Employee)')
  console.log('')
  console.log('📦 Sample products available at: /products')
}

main()
  .catch((e) => {
    console.error('❌ Error creating test data:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 