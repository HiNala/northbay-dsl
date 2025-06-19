const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  originalDir: './public/website_images',
  optimizedDir: './public/website_images_optimized',
  backupDir: './public/website_images_backup',
  createBackup: true, // Set to false to skip backup
  dryRun: false // Set to true to preview changes without executing
};

// Statistics
const stats = {
  imagesReplaced: 0,
  filesBackedUp: 0,
  totalSavings: 0,
  errors: []
};

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const items = fs.readdirSync(src);
  
  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    const stat = fs.statSync(srcPath);
    
    if (stat.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      stats.filesBackedUp++;
    }
  }
}

function replaceFiles(originalDir, optimizedDir) {
  if (!fs.existsSync(optimizedDir)) {
    console.log(`❌ Optimized directory not found: ${optimizedDir}`);
    return;
  }
  
  const items = fs.readdirSync(optimizedDir);
  
  for (const item of items) {
    const optimizedPath = path.join(optimizedDir, item);
    const originalPath = path.join(originalDir, item);
    const stat = fs.statSync(optimizedPath);
    
    if (stat.isDirectory()) {
      // Recursively process subdirectories
      if (fs.existsSync(originalPath)) {
        replaceFiles(originalPath, optimizedPath);
      }
    } else {
      // Replace file if original exists
      if (fs.existsSync(originalPath)) {
        try {
          const originalSize = fs.statSync(originalPath).size;
          const optimizedSize = fs.statSync(optimizedPath).size;
          const savings = originalSize - optimizedSize;
          
          if (config.dryRun) {
            console.log(`🔄 [DRY RUN] Would replace: ${item}`);
            console.log(`   Original: ${formatBytes(originalSize)} → Optimized: ${formatBytes(optimizedSize)}`);
            console.log(`   Savings: ${formatBytes(savings)} (${((savings/originalSize)*100).toFixed(1)}% reduction)`);
          } else {
            console.log(`🔄 Replacing: ${item}`);
            console.log(`   ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (${formatBytes(savings)} saved)`);
            
            fs.copyFileSync(optimizedPath, originalPath);
            stats.imagesReplaced++;
            stats.totalSavings += savings;
          }
        } catch (error) {
          console.error(`❌ Error replacing ${item}:`, error.message);
          stats.errors.push({ file: item, error: error.message });
        }
      } else {
        console.log(`⚠️  Original file not found for: ${item}`);
      }
    }
  }
}

function generateReport() {
  console.log('\n' + '='.repeat(80));
  console.log('📊 IMAGE REPLACEMENT REPORT');
  console.log('='.repeat(80));
  
  if (config.dryRun) {
    console.log('🔍 DRY RUN MODE - No files were actually modified');
  }
  
  console.log(`📁 Original Directory: ${config.originalDir}`);
  console.log(`📁 Optimized Directory: ${config.optimizedDir}`);
  if (config.createBackup) {
    console.log(`💾 Backup Directory: ${config.backupDir}`);
  }
  console.log('');
  console.log('📈 REPLACEMENT STATISTICS:');
  console.log(`   Images ${config.dryRun ? 'to be replaced' : 'replaced'}: ${stats.imagesReplaced}`);
  if (config.createBackup) {
    console.log(`   Files backed up: ${stats.filesBackedUp}`);
  }
  console.log(`   Total space ${config.dryRun ? 'would be saved' : 'saved'}: ${formatBytes(stats.totalSavings)}`);
  console.log(`   Errors encountered: ${stats.errors.length}`);
  
  if (stats.errors.length > 0) {
    console.log('\n❌ ERRORS:');
    stats.errors.forEach(error => {
      console.log(`   ${error.file}: ${error.error}`);
    });
  }
  
  if (!config.dryRun && stats.errors.length === 0) {
    console.log('\n🎉 ALL IMAGES SUCCESSFULLY REPLACED!');
    console.log(`✨ Your website images are now ${formatBytes(stats.totalSavings)} smaller!`);
  }
  
  console.log('\n✨ REPLACEMENT COMPLETE!');
  console.log('='.repeat(80));
}

async function main() {
  console.log('🔄 Starting Image Replacement Process...');
  
  if (config.dryRun) {
    console.log('🔍 DRY RUN MODE - Preview mode, no files will be modified');
  }
  
  console.log(`📂 Original images: ${config.originalDir}`);
  console.log(`📂 Optimized images: ${config.optimizedDir}`);
  
  if (config.createBackup && !config.dryRun) {
    console.log(`💾 Backup location: ${config.backupDir}`);
  }
  
  console.log('\n' + '-'.repeat(80));
  
  // Check if directories exist
  if (!fs.existsSync(config.originalDir)) {
    console.error(`❌ Original directory not found: ${config.originalDir}`);
    process.exit(1);
  }
  
  if (!fs.existsSync(config.optimizedDir)) {
    console.error(`❌ Optimized directory not found: ${config.optimizedDir}`);
    console.log('💡 Run the image optimization script first!');
    process.exit(1);
  }
  
  // Create backup if enabled
  if (config.createBackup && !config.dryRun) {
    console.log('💾 Creating backup of original images...');
    if (fs.existsSync(config.backupDir)) {
      console.log('⚠️  Backup directory already exists, skipping backup creation');
    } else {
      copyDirectory(config.originalDir, config.backupDir);
      console.log(`✅ Backup created successfully: ${stats.filesBackedUp} files backed up`);
    }
  }
  
  console.log(`\n🔄 ${config.dryRun ? 'Previewing' : 'Starting'} image replacement...`);
  
  const startTime = Date.now();
  
  try {
    replaceFiles(config.originalDir, config.optimizedDir);
  } catch (error) {
    console.error('❌ Fatal error during replacement:', error);
    process.exit(1);
  }
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  console.log(`\n⏱️  ${config.dryRun ? 'Preview' : 'Replacement'} completed in ${duration} seconds`);
  generateReport();
  
  if (config.dryRun) {
    console.log('\n💡 To execute the replacement, set dryRun: false in the script');
  }
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Unhandled error:', error);
    process.exit(1);
  });
}

module.exports = { main, config }; 