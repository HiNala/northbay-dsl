import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create roles
  const customerRole = await prisma.role.upsert({
    where: { name: 'customer' },
    update: {},
    create: {
      name: 'customer',
      displayName: 'Customer',
      level: 0,
      permissions: ['profile.view', 'orders.view', 'wishlist.manage'],
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

  console.log('✅ Roles created')

  // Create brands
  const brands = await Promise.all([
    prisma.brand.upsert({
      where: { slug: 'waterworks' },
      update: {},
      create: {
        name: 'Waterworks',
        slug: 'waterworks',
        logoUrl: '/brands/waterworks-logo.png',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'restoration-hardware' },
      update: {},
      create: {
        name: 'Restoration Hardware',
        slug: 'restoration-hardware',
        logoUrl: '/brands/rh-logo.png',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'emtek' },
      update: {},
      create: {
        name: 'Emtek',
        slug: 'emtek',
        logoUrl: '/brands/emtek-logo.png',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'visual-comfort' },
      update: {},
      create: {
        name: 'Visual Comfort',
        slug: 'visual-comfort',
        logoUrl: '/brands/visual-comfort-logo.png',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'porcelanosa' },
      update: {},
      create: {
        name: 'Porcelanosa',
        slug: 'porcelanosa',
        logoUrl: '/brands/porcelanosa-logo.png',
      },
    }),
  ])

  console.log('✅ Brands created')

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'kitchen' },
      update: {},
      create: {
        name: 'Kitchen',
        slug: 'kitchen',
        description: 'Kitchen fixtures, appliances, and accessories',
        imageUrl: '/categories/kitchen.jpg',
        sortOrder: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'bathroom' },
      update: {},
      create: {
        name: 'Bathroom',
        slug: 'bathroom',
        description: 'Bathroom fixtures, vanities, and accessories',
        imageUrl: '/categories/bathroom.jpg',
        sortOrder: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'hardware' },
      update: {},
      create: {
        name: 'Hardware',
        slug: 'hardware',
        description: 'Cabinet hardware, handles, and knobs',
        imageUrl: '/categories/hardware.jpg',
        sortOrder: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'lighting' },
      update: {},
      create: {
        name: 'Lighting',
        slug: 'lighting',
        description: 'Light fixtures and electrical accessories',
        imageUrl: '/categories/lighting.jpg',
        sortOrder: 4,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'tile' },
      update: {},
      create: {
        name: 'Tile',
        slug: 'tile',
        description: 'Floor and wall tiles for all spaces',
        imageUrl: '/categories/tile.jpg',
        sortOrder: 5,
      },
    }),
  ])

  console.log('✅ Categories created')

  // Create finishes
  const finishes = await Promise.all([
    prisma.finish.upsert({
      where: { slug: 'brushed-brass' },
      update: {},
      create: {
        name: 'Brushed Brass',
        slug: 'brushed-brass',
        hexColor: '#D4AF37',
        sortOrder: 1,
      },
    }),
    prisma.finish.upsert({
      where: { slug: 'matte-black' },
      update: {},
      create: {
        name: 'Matte Black',
        slug: 'matte-black',
        hexColor: '#000000',
        sortOrder: 2,
      },
    }),
    prisma.finish.upsert({
      where: { slug: 'polished-chrome' },
      update: {},
      create: {
        name: 'Polished Chrome',
        slug: 'polished-chrome',
        hexColor: '#C0C0C0',
        sortOrder: 3,
      },
    }),
    prisma.finish.upsert({
      where: { slug: 'oil-rubbed-bronze' },
      update: {},
      create: {
        name: 'Oil Rubbed Bronze',
        slug: 'oil-rubbed-bronze',
        hexColor: '#3C2414',
        sortOrder: 4,
      },
    }),
    prisma.finish.upsert({
      where: { slug: 'brushed-nickel' },
      update: {},
      create: {
        name: 'Brushed Nickel',
        slug: 'brushed-nickel',
        hexColor: '#8C7853',
        sortOrder: 5,
      },
    }),
  ])

  console.log('✅ Finishes created')

  // Create sample products
  const products = [
    {
      name: 'Modern Kitchen Faucet',
      slug: 'modern-kitchen-faucet',
      sku: 'KF-001',
      description: 'Professional-grade kitchen faucet with pull-down spray. Features solid brass construction and ceramic disc valves for lifetime durability.',
      price: 1299.00,
      comparePrice: 1599.00,
      categoryId: categories[0].id,
      brandId: brands[0].id,
      status: 'active',
      trackInventory: true,
      stockQuantity: 15,
      tags: ['kitchen', 'faucet', 'modern', 'brass'],
      seoTitle: 'Modern Kitchen Faucet - Professional Grade | North Bay Kitchen & Bath',
      seoDescription: 'Upgrade your kitchen with our professional-grade modern faucet. Solid brass construction, pull-down spray, lifetime warranty.',
    },
    {
      name: 'Luxury Bathroom Vanity',
      slug: 'luxury-bathroom-vanity',
      sku: 'BV-002',
      description: 'Hand-crafted bathroom vanity with marble top and soft-close drawers. Available in multiple finishes to match any design aesthetic.',
      price: 2499.00,
      comparePrice: 2899.00,
      categoryId: categories[1].id,
      brandId: brands[1].id,
      status: 'active',
      trackInventory: true,
      stockQuantity: 3,
      tags: ['bathroom', 'vanity', 'luxury', 'marble'],
      seoTitle: 'Luxury Bathroom Vanity with Marble Top | North Bay Kitchen & Bath',
      seoDescription: 'Elegant hand-crafted bathroom vanity featuring premium marble top and soft-close drawers. Multiple finish options available.',
    },
    {
      name: 'Cabinet Hardware Set',
      slug: 'cabinet-hardware-set',
      sku: 'CH-003',
      description: 'Complete cabinet hardware set including handles and knobs. Precision-machined from solid brass with multiple finish options.',
      price: 299.00,
      comparePrice: null,
      categoryId: categories[2].id,
      brandId: brands[2].id,
      status: 'draft',
      trackInventory: true,
      stockQuantity: 0,
      tags: ['hardware', 'cabinet', 'brass', 'handles'],
      seoTitle: 'Premium Cabinet Hardware Set | North Bay Kitchen & Bath',
      seoDescription: 'Complete your kitchen or bathroom with our precision-machined cabinet hardware. Solid brass construction, multiple finishes.',
    },
    {
      name: 'Designer Light Fixture',
      slug: 'designer-light-fixture',
      sku: 'LF-004',
      description: 'Statement chandelier perfect for dining rooms and entryways. Hand-forged iron with crystal accents.',
      price: 1899.00,
      comparePrice: 2199.00,
      categoryId: categories[3].id,
      brandId: brands[3].id,
      status: 'active',
      trackInventory: true,
      stockQuantity: 8,
      tags: ['lighting', 'chandelier', 'crystal', 'iron'],
      seoTitle: 'Designer Crystal Chandelier | North Bay Kitchen & Bath',
      seoDescription: 'Stunning hand-forged iron chandelier with crystal accents. Perfect statement piece for luxury homes.',
    },
    {
      name: 'Custom Backsplash Tile',
      slug: 'custom-backsplash-tile',
      sku: 'BT-005',
      description: 'Handmade ceramic tiles perfect for kitchen backsplashes. Unique glazing creates beautiful color variation.',
      price: 89.00,
      comparePrice: 120.00,
      categoryId: categories[4].id,
      brandId: brands[4].id,
      status: 'active',
      trackInventory: true,
      stockQuantity: 245,
      tags: ['tile', 'backsplash', 'ceramic', 'handmade'],
      seoTitle: 'Handmade Ceramic Backsplash Tile | North Bay Kitchen & Bath',
      seoDescription: 'Beautiful handmade ceramic tiles with unique glazing. Perfect for creating stunning kitchen backsplashes.',
    },
  ]

  for (const productData of products) {
    await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: {
        ...productData,
        specifications: {
          material: 'Premium grade materials',
          warranty: '10 years limited',
          installation: 'Professional installation recommended',
        },
        Images: {
          create: [
            {
              url: `/products/${productData.slug}-1.jpg`,
              alt: `${productData.name} - Main view`,
              position: 0,
              isHero: true,
            },
            {
              url: `/products/${productData.slug}-2.jpg`,
              alt: `${productData.name} - Detail view`,
              position: 1,
              isHero: false,
            },
          ],
        },
        Finishes: {
          create: [
            {
              finishId: finishes[0].id,
              isDefault: true,
            },
            {
              finishId: finishes[1].id,
              isDefault: false,
            },
          ],
        },
      },
    })
  }

  console.log('✅ Products created')

  // Create sample design leads
  const designLeads = [
    {
      fullName: 'Jennifer Wilson',
      email: 'jennifer.wilson@email.com',
      phone: '(555) 123-4567',
      address: { city: 'Napa', state: 'CA', zip: '94558' },
      projectType: 'Kitchen Remodel',
      style: 'Modern',
      budgetMin: 50000,
      budgetMax: 75000,
      timeline: '3-6 months',
      message: 'Looking to completely renovate our kitchen with a modern design. Interested in high-end appliances and custom cabinetry.',
      status: 'new',
      priority: 'high',
      source: 'website',
      followUpAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    },
    {
      fullName: 'David Thompson',
      email: 'david.t@email.com',
      phone: '(555) 987-6543',
      address: { city: 'Sonoma', state: 'CA', zip: '95476' },
      projectType: 'Bathroom Renovation',
      style: 'Traditional',
      budgetMin: 25000,
      budgetMax: 40000,
      timeline: '1-3 months',
      message: 'Master bathroom renovation. Looking for luxury finishes and a spa-like feel.',
      status: 'contacted',
      priority: 'medium',
      source: 'google',
      followUpAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
    },
    {
      fullName: 'Lisa Anderson',
      email: 'lisa.anderson@email.com',
      phone: '(555) 456-7890',
      address: { city: 'St. Helena', state: 'CA', zip: '94574' },
      projectType: 'Whole Home Design',
      style: 'Transitional',
      budgetMin: 100000,
      budgetMax: null,
      timeline: '6+ months',
      message: 'Recently purchased a home and looking for complete interior design services for the entire house.',
      status: 'qualified',
      priority: 'high',
      source: 'referral',
      followUpAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday (overdue)
    },
  ]

  for (const leadData of designLeads) {
    await prisma.designLead.create({
      data: leadData,
    })
  }

  console.log('✅ Design leads created')

  // Create sample projects
  const projects = [
    {
      title: 'Modern Napa Valley Kitchen',
      slug: 'modern-napa-valley-kitchen',
      description: 'Complete kitchen renovation featuring custom cabinetry, quartzite countertops, and professional-grade appliances.',
      location: 'Napa, CA',
      clientName: 'The Johnson Family',
      status: 'completed',
      category: 'kitchen',
      budget: 85000,
      completedAt: new Date('2023-12-15'),
      isPublic: true,
      isFeatured: true,
      tags: ['kitchen', 'modern', 'napa', 'quartzite'],
    },
    {
      title: 'Luxury Master Bathroom',
      slug: 'luxury-master-bathroom',
      description: 'Spa-inspired master bathroom with freestanding tub, walk-in shower, and custom vanity.',
      location: 'Sonoma, CA',
      clientName: 'The Chen Family',
      status: 'active',
      category: 'bathroom',
      budget: 45000,
      isPublic: true,
      isFeatured: false,
      tags: ['bathroom', 'luxury', 'spa', 'master'],
    },
  ]

  for (const projectData of projects) {
    await prisma.project.upsert({
      where: { slug: projectData.slug },
      update: {},
      create: {
        ...projectData,
        Images: {
          create: [
            {
              url: `/projects/${projectData.slug}-hero.jpg`,
              alt: `${projectData.title} - Hero image`,
              position: 0,
              isHero: true,
              room: projectData.category,
              beforeAfter: 'after',
            },
            {
              url: `/projects/${projectData.slug}-detail.jpg`,
              alt: `${projectData.title} - Detail view`,
              position: 1,
              isHero: false,
              room: projectData.category,
              beforeAfter: 'after',
            },
          ],
        },
      },
    })
  }

  console.log('✅ Projects created')

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 