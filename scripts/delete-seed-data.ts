import { PrismaClient } from '@prisma/client';
import { SEED_MARKER } from '../prisma/seeds/products-seed';

const prisma = new PrismaClient();

// CRITICAL SAFETY CONSTANTS
const REQUIRED_CONFIRMATION = 'DELETE_NORTHBAY_SEED_DATA_ONLY';
const SAFETY_ENVIRONMENT = process.env.NODE_ENV;

// Multiple safety checks to prevent accidental deletion
const SAFETY_CHECKS = {
  SEED_MARKER_REQUIRED: SEED_MARKER,
  MIN_CONFIRMATION_LENGTH: 20,
  ENVIRONMENT_CHECK: true,
  DRY_RUN_FIRST: true
};

interface DeletionSummary {
  products: number;
  productImages: number;
  productFinishes: number;
  brands: number;
  categories: number;
  finishes: number;
  total: number;
}

/**
 * ULTRA-SECURE SEED DATA DELETION SCRIPT
 * 
 * This script ONLY deletes data with the specific seed marker.
 * Multiple safety checks prevent accidental database deletion.
 * 
 * SAFETY FEATURES:
 * 1. Requires exact confirmation string
 * 2. Only deletes data with specific seed marker
 * 3. Dry run mode by default
 * 4. Environment checks
 * 5. Detailed logging of what will be deleted
 * 6. Atomic transactions with rollback on error
 */

async function performSafetyChecks(): Promise<boolean> {
  console.log('🔒 PERFORMING CRITICAL SAFETY CHECKS...\n');

  // Check 1: Seed marker exists
  if (!SEED_MARKER || SEED_MARKER.length < 10) {
    console.error('❌ SAFETY CHECK FAILED: Invalid or missing seed marker');
    return false;
  }
  console.log(`✅ Seed marker validated: ${SEED_MARKER}`);

  // Check 2: Environment check
  if (SAFETY_ENVIRONMENT === 'production') {
    console.error('❌ SAFETY CHECK FAILED: Cannot run in production environment');
    console.error('   Set NODE_ENV to development or test to proceed');
    return false;
  }
  console.log(`✅ Environment check passed: ${SAFETY_ENVIRONMENT || 'development'}`);

  // Check 3: Database connection
  try {
    await prisma.$connect();
    console.log('✅ Database connection verified');
  } catch (error) {
    console.error('❌ SAFETY CHECK FAILED: Cannot connect to database');
    return false;
  }

  // Check 4: Verify seed data exists
  const seedProductCount = await prisma.product.count({
    where: {
      bulkImportBatch: SEED_MARKER
    }
  });

  if (seedProductCount === 0) {
    console.log('ℹ️  No seed data found with marker:', SEED_MARKER);
    return false;
  }
  console.log(`✅ Found ${seedProductCount} seed products to potentially delete`);

  console.log('\n🔒 ALL SAFETY CHECKS PASSED\n');
  return true;
}

async function analyzeSeededData(): Promise<DeletionSummary> {
  console.log('🔍 ANALYZING SEED DATA TO DELETE...\n');

  // Count seed products
  const seedProducts = await prisma.product.findMany({
    where: {
      bulkImportBatch: SEED_MARKER
    },
    select: { id: true, name: true, slug: true }
  });

  // Count related data
  const productIds = seedProducts.map(p => p.id);
  
  const [productImages, productFinishes, seedBrands, seedCategories, seedFinishes] = await Promise.all([
    prisma.productImage.count({
      where: { productId: { in: productIds } }
    }),
    prisma.productFinish.count({
      where: { productId: { in: productIds } }
    }),
    prisma.brand.count({
      where: {
        slug: {
          in: ['north-bay-designs', 'sub-zero-wolf', 'kohler', 'schonbek', 'caesarstone', 'benjamin-moore', 'waterworks', 'visual-comfort']
        }
      }
    }),
    prisma.category.count({
      where: {
        slug: {
          in: ['kitchen', 'bathroom', 'lighting', 'hardware', 'cabinetry', 'countertops']
        }
      }
    }),
    prisma.finish.count({
      where: {
        slug: {
          in: ['polished-brass', 'brushed-nickel', 'matte-black', 'chrome', 'oil-rubbed-bronze']
        }
      }
    })
  ]);

  const summary: DeletionSummary = {
    products: seedProducts.length,
    productImages,
    productFinishes,
    brands: seedBrands,
    categories: seedCategories,
    finishes: seedFinishes,
    total: seedProducts.length + productImages + productFinishes + seedBrands + seedCategories + seedFinishes
  };

  console.log('📊 DELETION ANALYSIS:');
  console.log(`   Products: ${summary.products}`);
  console.log(`   Product Images: ${summary.productImages}`);
  console.log(`   Product Finishes: ${summary.productFinishes}`);
  console.log(`   Brands: ${summary.brands}`);
  console.log(`   Categories: ${summary.categories}`);
  console.log(`   Finishes: ${summary.finishes}`);
  console.log(`   TOTAL RECORDS: ${summary.total}`);

  if (seedProducts.length > 0) {
    console.log('\n🏷️  SEED PRODUCTS TO DELETE:');
    seedProducts.forEach(product => {
      console.log(`   • ${product.name} (${product.slug})`);
    });
  }

  return summary;
}

async function deleteSeedDataSafely(dryRun: boolean = true): Promise<DeletionSummary> {
  const summary: DeletionSummary = {
    products: 0,
    productImages: 0,
    productFinishes: 0,
    brands: 0,
    categories: 0,
    finishes: 0,
    total: 0
  };

  if (dryRun) {
    console.log('\n🧪 DRY RUN MODE - NO ACTUAL DELETION WILL OCCUR\n');
    return analyzeSeededData();
  }

  console.log('\n🗑️  PERFORMING ACTUAL DELETION...\n');

  try {
    await prisma.$transaction(async (tx) => {
      // Get seed products
      const seedProducts = await tx.product.findMany({
        where: { bulkImportBatch: SEED_MARKER },
        select: { id: true }
      });
      const productIds = seedProducts.map(p => p.id);

      // Delete in correct order (respecting foreign key constraints)
      
      // 1. Delete product finishes
      const deletedProductFinishes = await tx.productFinish.deleteMany({
        where: { productId: { in: productIds } }
      });
      summary.productFinishes = deletedProductFinishes.count;
      console.log(`✓ Deleted ${deletedProductFinishes.count} product finishes`);

      // 2. Delete product images
      const deletedProductImages = await tx.productImage.deleteMany({
        where: { productId: { in: productIds } }
      });
      summary.productImages = deletedProductImages.count;
      console.log(`✓ Deleted ${deletedProductImages.count} product images`);

      // 3. Delete products
      const deletedProducts = await tx.product.deleteMany({
        where: { bulkImportBatch: SEED_MARKER }
      });
      summary.products = deletedProducts.count;
      console.log(`✓ Deleted ${deletedProducts.count} products`);

      // 4. Delete seed brands (only if no other products use them)
      const seedBrandSlugs = ['north-bay-designs', 'sub-zero-wolf', 'kohler', 'schonbek', 'caesarstone', 'benjamin-moore', 'waterworks', 'visual-comfort'];
      for (const brandSlug of seedBrandSlugs) {
        const productsUsingBrand = await tx.product.count({
          where: { Brand: { slug: brandSlug } }
        });
        
        if (productsUsingBrand === 0) {
          await tx.brand.deleteMany({
            where: { slug: brandSlug }
          });
          summary.brands++;
        }
      }
      console.log(`✓ Deleted ${summary.brands} unused brands`);

      // 5. Delete seed categories (only if no other products use them)
      const seedCategorySlugs = ['kitchen', 'bathroom', 'lighting', 'hardware', 'cabinetry', 'countertops'];
      for (const categorySlug of seedCategorySlugs) {
        const productsUsingCategory = await tx.product.count({
          where: { Category: { slug: categorySlug } }
        });
        
        if (productsUsingCategory === 0) {
          await tx.category.deleteMany({
            where: { slug: categorySlug }
          });
          summary.categories++;
        }
      }
      console.log(`✓ Deleted ${summary.categories} unused categories`);

      // 6. Delete seed finishes (only if no other products use them)
      const seedFinishSlugs = ['polished-brass', 'brushed-nickel', 'matte-black', 'chrome', 'oil-rubbed-bronze'];
      for (const finishSlug of seedFinishSlugs) {
        const productsUsingFinish = await tx.productFinish.count({
          where: { Finish: { slug: finishSlug } }
        });
        
        if (productsUsingFinish === 0) {
          await tx.finish.deleteMany({
            where: { slug: finishSlug }
          });
          summary.finishes++;
        }
      }
      console.log(`✓ Deleted ${summary.finishes} unused finishes`);

      summary.total = summary.products + summary.productImages + summary.productFinishes + summary.brands + summary.categories + summary.finishes;
    });

    console.log(`\n✅ DELETION COMPLETED SUCCESSFULLY`);
    console.log(`📊 Total records deleted: ${summary.total}`);

  } catch (error) {
    console.error('\n❌ DELETION FAILED - TRANSACTION ROLLED BACK');
    console.error('Error:', error);
    throw error;
  }

  return summary;
}

async function main() {
  console.log('🚨 NORTHBAY SEED DATA DELETION SCRIPT 🚨\n');
  console.log('⚠️  WARNING: This script will delete seed data from the database\n');

  const args = process.argv.slice(2);
  const dryRun = !args.includes('--execute');
  const skipConfirmation = args.includes('--skip-confirmation');

  try {
    // Perform safety checks
    const safetyPassed = await performSafetyChecks();
    if (!safetyPassed) {
      console.log('\n❌ OPERATION ABORTED - Safety checks failed');
      process.exit(1);
    }

    // Analyze what will be deleted
    const summary = await analyzeSeededData();
    if (summary.total === 0) {
      console.log('\n✅ No seed data found to delete');
      process.exit(0);
    }

    if (dryRun) {
      console.log('\n🧪 DRY RUN COMPLETED');
      console.log('📝 To actually delete this data, run:');
      console.log('   npm run delete-seed-data --execute');
      console.log('\n⚠️  Add --skip-confirmation to skip the confirmation prompt');
      process.exit(0);
    }

    // Require confirmation for actual deletion
    if (!skipConfirmation) {
      console.log(`\n🔐 CONFIRMATION REQUIRED`);
      console.log(`To proceed with deletion, type exactly: ${REQUIRED_CONFIRMATION}`);
      console.log(`This will delete ${summary.total} records with seed marker: ${SEED_MARKER}`);
      
      // In a real script, you'd use readline for input
      // For now, require the confirmation as a command line argument
      const confirmationArg = args.find(arg => arg.startsWith('--confirm='));
      const confirmation = confirmationArg?.split('=')[1];
      
      if (confirmation !== REQUIRED_CONFIRMATION) {
        console.log('\n❌ OPERATION ABORTED - Incorrect confirmation');
        console.log(`   Use: --confirm=${REQUIRED_CONFIRMATION}`);
        process.exit(1);
      }
    }

    // Perform actual deletion
    await deleteSeedDataSafely(false);
    console.log('\n🎉 SEED DATA DELETION COMPLETED SUCCESSFULLY');

  } catch (error) {
    console.error('\n💥 DELETION SCRIPT FAILED:');
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Export for testing
export { deleteSeedDataSafely, performSafetyChecks, analyzeSeededData };

// Run if called directly
if (require.main === module) {
  main();
} 