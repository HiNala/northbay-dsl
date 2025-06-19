import { PrismaClient, ProductStatus } from '@prisma/client';

const prisma = new PrismaClient();

// Seed data marker - IMPORTANT: Used for safe deletion
const SEED_MARKER = 'NORTHBAY_SEED_DATA_2024';

const brandsData = [
  {
    name: 'North Bay Designs',
    slug: 'north-bay-designs',
    logoUrl: '/images/brands/northbay-logo.png',
    isActive: true
  },
  {
    name: 'Sub-Zero Wolf',
    slug: 'sub-zero-wolf', 
    logoUrl: '/images/brands/subzero-wolf-logo.png',
    isActive: true
  },
  {
    name: 'Kohler',
    slug: 'kohler',
    logoUrl: '/images/brands/kohler-logo.png',
    isActive: true
  },
  {
    name: 'Schonbek',
    slug: 'schonbek',
    logoUrl: '/images/brands/schonbek-logo.png',
    isActive: true
  },
  {
    name: 'Caesarstone',
    slug: 'caesarstone',
    logoUrl: '/images/brands/caesarstone-logo.png',
    isActive: true
  },
  {
    name: 'Benjamin Moore',
    slug: 'benjamin-moore',
    logoUrl: '/images/brands/benjamin-moore-logo.png',
    isActive: true
  },
  {
    name: 'Waterworks',
    slug: 'waterworks',
    logoUrl: '/images/brands/waterworks-logo.png',
    isActive: true
  },
  {
    name: 'Visual Comfort',
    slug: 'visual-comfort',
    logoUrl: '/images/brands/visual-comfort-logo.png',
    isActive: true
  }
];

const categoriesData = [
  {
    name: 'Kitchen',
    slug: 'kitchen',
    description: 'Transform your culinary space with our curated kitchen collections',
    imageUrl: '/website_images/Kenwood Project/photos21.jpg',
    sortOrder: 1,
    isActive: true
  },
  {
    name: 'Bathroom', 
    slug: 'bathroom',
    description: 'Create your personal spa sanctuary with luxurious bathroom collections',
    imageUrl: '/website_images/Petaluma - Bathroom Remodel/Petaluma Bath1.jpg',
    sortOrder: 2,
    isActive: true
  },
  {
    name: 'Lighting',
    slug: 'lighting',
    description: 'Illuminate your spaces with our designer lighting collections',
    imageUrl: '/website_images/Design Services/Design Services Website (1).jpeg',
    sortOrder: 3,
    isActive: true
  },
  {
    name: 'Hardware',
    slug: 'hardware',
    description: 'Premium hardware and fixtures that perfect every detail',
    imageUrl: '/website_images/Design Services/Design Services Website (4).jpeg',
    sortOrder: 4,
    isActive: true
  },
  {
    name: 'Cabinetry',
    slug: 'cabinetry',
    description: 'Custom cabinetry crafted to perfection',
    imageUrl: '/website_images/Kenwood Project/photos25.jpg',
    sortOrder: 5,
    isActive: true,
    parentId: null // Will be set to Kitchen category ID
  },
  {
    name: 'Countertops',
    slug: 'countertops',
    description: 'Premium stone and quartz surfaces',
    imageUrl: '/website_images/San Rafael Project- Modern Kitchen/Peacock02.jpg',
    sortOrder: 6,
    isActive: true,
    parentId: null // Will be set to Kitchen category ID
  }
];

const finishesData = [
  {
    name: 'Polished Brass',
    slug: 'polished-brass',
    hexColor: '#B8860B',
    imageUrl: '/images/finishes/polished-brass.jpg',
    isActive: true,
    sortOrder: 1
  },
  {
    name: 'Brushed Nickel',
    slug: 'brushed-nickel',
    hexColor: '#C0C0C0',
    imageUrl: '/images/finishes/brushed-nickel.jpg',
    isActive: true,
    sortOrder: 2
  },
  {
    name: 'Matte Black',
    slug: 'matte-black',
    hexColor: '#000000',
    imageUrl: '/images/finishes/matte-black.jpg',
    isActive: true,
    sortOrder: 3
  },
  {
    name: 'Chrome',
    slug: 'chrome',
    hexColor: '#E5E5E5',
    imageUrl: '/images/finishes/chrome.jpg',
    isActive: true,
    sortOrder: 4
  },
  {
    name: 'Oil Rubbed Bronze',
    slug: 'oil-rubbed-bronze',
    hexColor: '#654321',
    imageUrl: '/images/finishes/oil-rubbed-bronze.jpg',
    isActive: true,
    sortOrder: 5
  }
];

const productsData = [
  {
    name: 'Handcrafted Carrara Marble Island',
    slug: 'handcrafted-carrara-marble-island',
    sku: 'NB-CMI-001',
    description: 'Imported Italian Carrara marble with integrated breakfast bar and premium brass hardware. Each piece unique with natural veining patterns that tell a story of timeless elegance.',
    specifications: {
      material: 'Genuine Carrara Marble',
      origin: 'Carrara, Italy',
      finish: 'Polished',
      thickness: '1.25 inches',
      edgeProfile: 'Eased edge standard',
      dimensions: 'Custom sizing available',
      weight: 'Approximately 18 lbs per sq ft',
      installation: 'Professional installation included',
      warranty: 'Lifetime warranty on craftsmanship'
    },
    price: 4500.00,
    comparePrice: 5200.00,
    inStock: true,
    stockQuantity: 5,
    trackInventory: true,
    status: ProductStatus.PUBLISHED,
    type: 'physical',
    tags: ['luxury', 'natural-stone', 'custom', 'italian', 'marble'],
    seoTitle: 'Handcrafted Carrara Marble Island | North Bay Kitchen & Bath',
    seoDescription: 'Transform your kitchen with our handcrafted Carrara marble island featuring genuine Italian marble and premium brass hardware.',
    categorySlug: 'countertops',
    brandSlug: 'north-bay-designs',
    availability: 'Made to Order',
    leadTime: '8-12 weeks',
    featured: true,
    priority: 10,
    bulkImportBatch: SEED_MARKER,
    metaData: {
      seedData: true,
      seedBatch: SEED_MARKER,
      createdBy: 'seed-script'
    },
    images: [
      {
        url: '/website_images/Kenwood Project/photos25.jpg',
        alt: 'Handcrafted Carrara Marble Island - Main View',
        position: 0,
        isHero: true
      },
      {
        url: '/website_images/San Rafael Project- Modern Kitchen/Peacock02.jpg',
        alt: 'Carrara Marble Detail View',
        position: 1,
        isHero: false
      },
      {
        url: '/website_images/Kenwood Project/photos26.jpg',
        alt: 'Marble Island with Brass Hardware',
        position: 2,
        isHero: false
      }
    ]
  },
  {
    name: 'Professional Dual-Fuel Range',
    slug: 'professional-dual-fuel-range',
    sku: 'SW-PDR-48',
    description: '48-inch professional series with dual convection ovens, precision temperature control, and commercial-grade performance designed for the discerning home chef.',
    specifications: {
      width: '48 inches',
      height: '36 inches',
      depth: '27 inches',
      fuel: 'Dual-fuel (gas cooktop, electric ovens)',
      burners: '6 sealed burners',
      btu: '20,000 BTU maximum per burner',
      ovenCapacity: '4.6 cu ft per oven',
      convection: 'Dual convection ovens',
      warranty: '2-year full warranty, 10-year parts'
    },
    price: 8900.00,
    comparePrice: 9800.00,
    inStock: true,
    stockQuantity: 3,
    trackInventory: true,
    status: ProductStatus.PUBLISHED,
    type: 'physical',
    tags: ['professional', 'wolf', 'dual-fuel', 'luxury-appliance', 'commercial-grade'],
    seoTitle: 'Professional 48" Dual-Fuel Range | Sub-Zero Wolf',
    seoDescription: 'Professional-grade 48" dual-fuel range with convection ovens and commercial BTU performance for serious home cooking.',
    categorySlug: 'kitchen',
    brandSlug: 'sub-zero-wolf',
    availability: 'In Stock',
    leadTime: '2-4 weeks',
    featured: true,
    priority: 9,
    bulkImportBatch: SEED_MARKER,
    metaData: {
      seedData: true,
      seedBatch: SEED_MARKER,
      createdBy: 'seed-script'
    },
    images: [
      {
        url: '/website_images/San Rafael Project- Modern Kitchen/Peacock09.jpg',
        alt: 'Professional Dual-Fuel Range in Kitchen',
        position: 0,
        isHero: true
      },
      {
        url: '/website_images/San Rafael Project- Modern Kitchen/Peacock11.jpg',
        alt: 'Range Detail View',
        position: 1,
        isHero: false
      }
    ]
  },
  {
    name: 'Bespoke Walnut Cabinetry',
    slug: 'bespoke-walnut-cabinetry',
    sku: 'NB-BWC-001',
    description: 'Hand-crafted American black walnut cabinetry with soft-close hardware, custom finishes, and lifetime warranty on craftsmanship. Each piece is meticulously crafted by master artisans.',
    specifications: {
      wood: 'American Black Walnut',
      construction: 'Solid wood doors and face frames',
      hardware: 'Blum soft-close hinges and slides',
      finish: 'Multiple options available',
      customization: 'Full customization available',
      installation: 'Professional installation included',
      warranty: 'Lifetime warranty on craftsmanship'
    },
    price: 12500.00,
    comparePrice: 15000.00,
    inStock: false,
    stockQuantity: 0,
    trackInventory: false,
    status: ProductStatus.PUBLISHED,
    type: 'physical',
    tags: ['custom', 'walnut', 'handcrafted', 'luxury', 'artisan'],
    seoTitle: 'Bespoke Walnut Cabinetry | Custom Kitchen Cabinets',
    seoDescription: 'Hand-crafted American black walnut cabinetry with lifetime warranty. Custom sizing and finishes available.',
    categorySlug: 'cabinetry',
    brandSlug: 'north-bay-designs',
    availability: 'Made to Order',
    leadTime: '10-14 weeks',
    featured: true,
    priority: 8,
    bulkImportBatch: SEED_MARKER,
    metaData: {
      seedData: true,
      seedBatch: SEED_MARKER,
      createdBy: 'seed-script'
    },
    images: [
      {
        url: '/website_images/Kenwood Project/photos27.jpg',
        alt: 'Bespoke Walnut Cabinetry',
        position: 0,
        isHero: true
      },
      {
        url: '/website_images/Kenwood Project/photos29.jpg',
        alt: 'Walnut Cabinet Detail',
        position: 1,
        isHero: false
      }
    ]
  },
  {
    name: 'Luxury Spa Soaking Tub',
    slug: 'luxury-spa-soaking-tub',
    sku: 'KO-LST-66',
    description: 'Extra-deep soaking tub with ergonomic design and premium acrylic construction. Creates the ultimate spa experience in your master bathroom retreat.',
    specifications: {
      material: 'Premium Acrylic',
      dimensions: '66" L x 36" W x 22" H',
      capacity: '90 gallons',
      weight: '120 lbs empty, 870 lbs filled',
      drainLocation: 'Center drain',
      overflow: 'Yes',
      warranty: '10-year limited warranty'
    },
    price: 3200.00,
    comparePrice: 3800.00,
    inStock: true,
    stockQuantity: 2,
    trackInventory: true,
    status: ProductStatus.PUBLISHED,
    type: 'physical',
    tags: ['spa', 'luxury', 'soaking', 'kohler', 'bathroom'],
    seoTitle: 'Luxury Spa Soaking Tub | 66" Freestanding Bathtub',
    seoDescription: 'Extra-deep 66" luxury soaking tub with ergonomic design. Transform your bathroom into a spa retreat.',
    categorySlug: 'bathroom',
    brandSlug: 'kohler',
    availability: 'In Stock',
    leadTime: '3-5 weeks',
    featured: true,
    priority: 7,
    bulkImportBatch: SEED_MARKER,
    metaData: {
      seedData: true,
      seedBatch: SEED_MARKER,
      createdBy: 'seed-script'
    },
    images: [
      {
        url: '/website_images/Petaluma - Bathroom Remodel/Petaluma Bath3.jpg',
        alt: 'Luxury Spa Soaking Tub',
        position: 0,
        isHero: true
      },
      {
        url: '/website_images/Kenwood Project/Primary Bath photos23.jpg',
        alt: 'Soaking Tub in Bathroom Setting',
        position: 1,
        isHero: false
      }
    ]
  },
  {
    name: 'Hand-Cut Crystal Chandelier',
    slug: 'hand-cut-crystal-chandelier',
    sku: 'SC-HCC-28',
    description: 'Exquisite hand-cut crystal chandelier with antique brass finish. Perfect centerpiece for dining rooms and foyers, featuring traditional craftsmanship with modern LED compatibility.',
    specifications: {
      diameter: '28 inches',
      height: '30 inches adjustable',
      bulbs: '8 x E12 candelabra base',
      wattage: '480W maximum (60W per bulb)',
      weight: '45 lbs',
      finish: 'Antique Brass',
      crystal: 'Hand-cut lead crystal',
      installation: 'Professional installation recommended'
    },
    price: 2850.00,
    comparePrice: 3200.00,
    inStock: false,
    stockQuantity: 0,
    trackInventory: true,
    status: ProductStatus.PUBLISHED,
    type: 'physical',
    tags: ['crystal', 'luxury', 'dining', 'traditional', 'chandelier'],
    seoTitle: 'Hand-Cut Crystal Chandelier | Antique Brass Finish',
    seoDescription: 'Exquisite 28" hand-cut crystal chandelier with antique brass finish. Perfect for dining rooms and foyers.',
    categorySlug: 'lighting',
    brandSlug: 'schonbek',
    availability: 'Special Order',
    leadTime: '6-8 weeks',
    featured: true,
    priority: 6,
    bulkImportBatch: SEED_MARKER,
    metaData: {
      seedData: true,
      seedBatch: SEED_MARKER,
      createdBy: 'seed-script'
    },
    images: [
      {
        url: '/website_images/Design Services/Design Services Website (1).jpeg',
        alt: 'Hand-Cut Crystal Chandelier',
        position: 0,
        isHero: true
      }
    ]
  },
  {
    name: 'Artisan Brass Cabinet Hardware Set',
    slug: 'artisan-brass-cabinet-hardware',
    sku: 'NB-ABH-001',
    description: 'Hand-forged solid brass cabinet hardware with living finish that develops beautiful patina over time. Each piece is individually crafted by skilled artisans.',
    specifications: {
      material: 'Solid Brass',
      finish: 'Natural Brass (Living Finish)',
      mounting: 'Standard cabinet mounting',
      sizes: '3", 4", 5", 6", 8", 12" center-to-center',
      thickness: '0.25 inches',
      warranty: 'Lifetime warranty',
      customization: 'Custom lengths available'
    },
    price: 85.00,
    comparePrice: 120.00,
    inStock: true,
    stockQuantity: 50,
    trackInventory: true,
    status: ProductStatus.PUBLISHED,
    type: 'physical',
    tags: ['brass', 'handcrafted', 'living-finish', 'custom', 'hardware'],
    seoTitle: 'Artisan Brass Cabinet Hardware | Hand-Forged Pulls',
    seoDescription: 'Hand-forged solid brass cabinet hardware with living finish. Lifetime warranty and custom sizes available.',
    categorySlug: 'hardware',
    brandSlug: 'north-bay-designs',
    availability: 'Made to Order',
    leadTime: '4-6 weeks',
    featured: false,
    priority: 5,
    bulkImportBatch: SEED_MARKER,
    metaData: {
      seedData: true,
      seedBatch: SEED_MARKER,
      createdBy: 'seed-script'
    },
    images: [
      {
        url: '/website_images/Design Services/Design Services Website (4).jpeg',
        alt: 'Artisan Brass Cabinet Hardware',
        position: 0,
        isHero: true
      }
    ]
  },
  {
    name: 'Waterfall Edge Quartz Countertop',
    slug: 'waterfall-edge-quartz-countertop',
    sku: 'CS-WEQ-001',
    description: 'Stunning waterfall edge quartz countertop with book-matched veining. Engineered quartz offers durability and beauty with minimal maintenance requirements.',
    specifications: {
      material: 'Engineered Quartz',
      thickness: '1.25 inches',
      edgeProfile: 'Waterfall edge',
      finish: 'Polished',
      pattern: 'Book-matched veining',
      maintenance: 'No sealing required',
      warranty: '15-year limited warranty'
    },
    price: 3800.00,
    comparePrice: 4500.00,
    inStock: false,
    stockQuantity: 0,
    trackInventory: false,
    status: ProductStatus.PUBLISHED,
    type: 'physical',
    tags: ['quartz', 'waterfall', 'modern', 'countertop', 'engineered'],
    seoTitle: 'Waterfall Edge Quartz Countertop | Modern Kitchen Design',
    seoDescription: 'Stunning waterfall edge quartz countertop with book-matched veining. Durable and low-maintenance.',
    categorySlug: 'countertops',
    brandSlug: 'caesarstone',
    availability: 'Made to Order',
    leadTime: '6-8 weeks',
    featured: false,
    priority: 4,
    bulkImportBatch: SEED_MARKER,
    metaData: {
      seedData: true,
      seedBatch: SEED_MARKER,
      createdBy: 'seed-script'
    },
    images: [
      {
        url: '/website_images/San Rafael Project- Modern Kitchen/Peacock03.jpg',
        alt: 'Waterfall Edge Quartz Countertop',
        position: 0,
        isHero: true
      }
    ]
  },
  {
    name: 'Custom Bathroom Vanity',
    slug: 'custom-bathroom-vanity',
    sku: 'NB-CBV-001',
    description: 'Custom-built bathroom vanity with soft-close drawers, integrated lighting, and premium stone top. Designed to maximize storage while maintaining elegant aesthetics.',
    specifications: {
      construction: 'Solid wood construction',
      finish: 'Multiple finish options',
      hardware: 'Soft-close drawer slides',
      lighting: 'Integrated LED lighting',
      stone: 'Choice of premium stone tops',
      customization: 'Fully customizable dimensions'
    },
    price: 2200.00,
    comparePrice: 2800.00,
    inStock: false,
    stockQuantity: 0,
    trackInventory: false,
    status: ProductStatus.PUBLISHED,
    type: 'physical',
    tags: ['vanity', 'custom', 'bathroom', 'storage', 'lighting'],
    seoTitle: 'Custom Bathroom Vanity | Integrated Lighting & Storage',
    seoDescription: 'Custom-built bathroom vanity with soft-close drawers and integrated LED lighting. Premium stone tops available.',
    categorySlug: 'bathroom',
    brandSlug: 'north-bay-designs',
    availability: 'Made to Order',
    leadTime: '8-10 weeks',
    featured: false,
    priority: 3,
    bulkImportBatch: SEED_MARKER,
    metaData: {
      seedData: true,
      seedBatch: SEED_MARKER,
      createdBy: 'seed-script'
    },
    images: [
      {
        url: '/website_images/Petaluma - Bathroom Remodel/Petaluma Bath2.jpg',
        alt: 'Custom Bathroom Vanity',
        position: 0,
        isHero: true
      }
    ]
  }
];

export async function seedProducts() {
  console.log('🌱 Starting product seed...');

  try {
    // Create brands
    console.log('📦 Creating brands...');
    const createdBrands = new Map();
    for (const brandData of brandsData) {
      const brand = await prisma.brand.upsert({
        where: { slug: brandData.slug },
        update: brandData,
        create: brandData
      });
      createdBrands.set(brandData.slug, brand);
      console.log(`   ✓ ${brand.name}`);
    }

    // Create categories
    console.log('📂 Creating categories...');
    const createdCategories = new Map();
    for (const categoryData of categoriesData) {
      const category = await prisma.category.upsert({
        where: { slug: categoryData.slug },
        update: categoryData,
        create: categoryData
      });
      createdCategories.set(categoryData.slug, category);
      console.log(`   ✓ ${category.name}`);
    }

    // Update subcategories with parent IDs
    const kitchenCategory = createdCategories.get('kitchen');
    if (kitchenCategory) {
      await prisma.category.update({
        where: { slug: 'cabinetry' },
        data: { parentId: kitchenCategory.id }
      });
      await prisma.category.update({
        where: { slug: 'countertops' },
        data: { parentId: kitchenCategory.id }
      });
    }

    // Create finishes
    console.log('🎨 Creating finishes...');
    const createdFinishes = new Map();
    for (const finishData of finishesData) {
      const finish = await prisma.finish.upsert({
        where: { slug: finishData.slug },
        update: finishData,
        create: finishData
      });
      createdFinishes.set(finishData.slug, finish);
      console.log(`   ✓ ${finish.name}`);
    }

    // Create products
    console.log('🛍️ Creating products...');
    for (const productData of productsData) {
      const category = createdCategories.get(productData.categorySlug);
      const brand = createdBrands.get(productData.brandSlug);

      if (!category || !brand) {
        console.log(`   ⚠️ Skipping ${productData.name} - missing category or brand`);
        continue;
      }

      // Separate images from product data
      const { images, categorySlug, brandSlug, ...productCreateData } = productData;

      const product = await prisma.product.upsert({
        where: { slug: productData.slug },
        update: {
          ...productCreateData,
          categoryId: category.id,
          brandId: brand.id
        },
        create: {
          ...productCreateData,
          categoryId: category.id,
          brandId: brand.id
        }
      });

      // Create product images
      if (images && images.length > 0) {
        // Delete existing images for this product
        await prisma.productImage.deleteMany({
          where: { productId: product.id }
        });

        // Create new images
        for (const imageData of images) {
          await prisma.productImage.create({
            data: {
              ...imageData,
              productId: product.id
            }
          });
        }
      }

      // Add some finishes to products
      if (product.slug === 'artisan-brass-cabinet-hardware') {
        await prisma.productFinish.upsert({
          where: {
            productId_finishId: {
              productId: product.id,
              finishId: createdFinishes.get('polished-brass')!.id
            }
          },
          update: {},
          create: {
            productId: product.id,
            finishId: createdFinishes.get('polished-brass')!.id,
            upcharge: 0,
            isDefault: true
          }
        });
      }

      console.log(`   ✓ ${product.name} (${product.status})`);
    }

    console.log('✅ Product seed completed successfully!');
    console.log(`📊 Created: ${brandsData.length} brands, ${categoriesData.length} categories, ${finishesData.length} finishes, ${productsData.length} products`);
    console.log(`🏷️ Seed marker: ${SEED_MARKER}`);

  } catch (error) {
    console.error('❌ Error seeding products:', error);
    throw error;
  }
}

export { SEED_MARKER }; 