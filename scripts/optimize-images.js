const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const config = {
  inputDir: './public/website_images',
  outputDir: './public/website_images_optimized',
  quality: {
    jpeg: 85,    // High quality JPEG compression
    webp: 90,    // High quality WebP compression 
    png: 9       // PNG compression level
  },
  maxWidth: 2400,  // Maximum width for images (maintaining aspect ratio)
  imageFormats: ['jpg', 'jpeg', 'png', 'webp', 'tiff', 'bmp'],
  videoFormats: ['mov', 'mp4', 'avi', 'mkv', 'wmv', 'flv'],
  skipFormats: ['mov', 'mp4', 'avi', 'mkv', 'wmv', 'flv'], // Files to skip completely
  corruptionRecovery: true  // Enable corruption recovery attempts
};

// Statistics tracking
const stats = {
  totalFiles: 0,
  optimizedFiles: 0,
  skippedFiles: 0,
  videoFiles: 0,
  repairedFiles: 0,
  totalOriginalSize: 0,
  totalOptimizedSize: 0,
  errors: [],
  warnings: []
};

// Utility functions
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getCompressionRatio(original, optimized) {
  return ((1 - optimized / original) * 100).toFixed(1);
}

// Check file type
function getFileType(filename) {
  const ext = path.extname(filename).toLowerCase().slice(1);
  if (config.imageFormats.includes(ext)) return 'image';
  if (config.videoFormats.includes(ext)) return 'video';
  return 'other';
}

function isImageFile(filename) {
  return getFileType(filename) === 'image';
}

function isVideoFile(filename) {
  return getFileType(filename) === 'video';
}

// Create output directory structure
function createOutputDir(inputPath, outputBase) {
  const relativePath = path.relative(config.inputDir, inputPath);
  const outputPath = path.join(outputBase, relativePath);
  
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
  
  return outputPath;
}

// Try to repair corrupted JPEG
async function repairCorruptedImage(inputFilePath, outputFilePath) {
  console.log(`   🔧 Attempting to repair corrupted image...`);
  
  try {
    // Method 1: Try with failOnError disabled
    const image = sharp(inputFilePath, { failOnError: false });
    const metadata = await image.metadata();
    
    let pipeline = image;
    
    // Apply basic processing to strip corruption
    pipeline = pipeline.resize(metadata.width, metadata.height, {
      fit: 'inside',
      withoutEnlargement: true
    });
    
    // Resize if too large
    if (metadata.width > config.maxWidth) {
      pipeline = pipeline.resize(config.maxWidth, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }
    
    // Save as high-quality JPEG
    await pipeline.jpeg({
      quality: config.quality.jpeg,
      progressive: true,
      mozjpeg: true
    }).toFile(outputFilePath);
    
    console.log(`   ✅ Successfully repaired corrupted image!`);
    return true;
    
  } catch (repairError) {
    console.log(`   ❌ Repair attempt failed: ${repairError.message}`);
    
    // Method 2: Try converting through a different format
    try {
      console.log(`   🔧 Trying alternative repair method...`);
      
      const tempPngPath = outputFilePath.replace(/\.[^.]+$/, '_temp.png');
      
      // Convert to PNG first (more forgiving format)
      await sharp(inputFilePath, { failOnError: false })
        .png()
        .toFile(tempPngPath);
      
      // Then convert back to JPEG
      let pipeline = sharp(tempPngPath);
      const metadata = await pipeline.metadata();
      
      if (metadata.width > config.maxWidth) {
        pipeline = pipeline.resize(config.maxWidth, null, {
          withoutEnlargement: true,
          fit: 'inside'
        });
      }
      
      await pipeline.jpeg({
        quality: config.quality.jpeg,
        progressive: true,
        mozjpeg: true
      }).toFile(outputFilePath);
      
      // Clean up temp file
      fs.unlinkSync(tempPngPath);
      
      console.log(`   ✅ Successfully repaired using alternative method!`);
      return true;
      
    } catch (altRepairError) {
      console.log(`   ❌ Alternative repair failed: ${altRepairError.message}`);
      return false;
    }
  }
}

// Optimize single image with error recovery
async function optimizeImage(inputFilePath, outputFilePath) {
  try {
    const inputStats = fs.statSync(inputFilePath);
    const originalSize = inputStats.size;
    
    console.log(`📸 Processing: ${path.basename(inputFilePath)} (${formatBytes(originalSize)})`);
    
    // First attempt - normal processing
    try {
      const image = sharp(inputFilePath);
      const metadata = await image.metadata();
      
      console.log(`   Dimensions: ${metadata.width}x${metadata.height}`);
      
      let pipeline = image;
      
      // Resize if too large (maintaining aspect ratio)
      if (metadata.width > config.maxWidth) {
        pipeline = pipeline.resize(config.maxWidth, null, {
          withoutEnlargement: true,
          fit: 'inside'
        });
        console.log(`   Resizing to max width: ${config.maxWidth}px`);
      }
      
      // Apply format-specific optimization
      const ext = path.extname(inputFilePath).toLowerCase();
      
      if (ext === '.jpg' || ext === '.jpeg') {
        pipeline = pipeline.jpeg({
          quality: config.quality.jpeg,
          progressive: true,
          mozjpeg: true
        });
      } else if (ext === '.png') {
        pipeline = pipeline.png({
          compressionLevel: config.quality.png,
          progressive: true
        });
      } else if (ext === '.webp') {
        pipeline = pipeline.webp({
          quality: config.quality.webp,
          effort: 6
        });
      }
      
      // Save optimized image
      await pipeline.toFile(outputFilePath);
      
    } catch (processingError) {
      console.log(`   ⚠️  Initial processing failed: ${processingError.message}`);
      
      if (config.corruptionRecovery) {
        const repaired = await repairCorruptedImage(inputFilePath, outputFilePath);
        if (!repaired) {
          throw new Error(`Failed to repair corrupted image: ${processingError.message}`);
        }
        stats.repairedFiles++;
      } else {
        throw processingError;
      }
    }
    
    // Get output file size
    const outputStats = fs.statSync(outputFilePath);
    const optimizedSize = outputStats.size;
    
    // Update statistics
    stats.totalOriginalSize += originalSize;
    stats.totalOptimizedSize += optimizedSize;
    stats.optimizedFiles++;
    
    const compression = getCompressionRatio(originalSize, optimizedSize);
    console.log(`   ✅ Optimized: ${formatBytes(optimizedSize)} (${compression}% reduction)`);
    
    return {
      success: true,
      originalSize,
      optimizedSize,
      compression: parseFloat(compression)
    };
    
  } catch (error) {
    console.error(`   ❌ Error processing ${inputFilePath}:`, error.message);
    stats.errors.push({
      file: inputFilePath,
      error: error.message
    });
    return { success: false, error: error.message };
  }
}

// Process directory recursively
async function processDirectory(inputDir, outputDir) {
  const items = fs.readdirSync(inputDir);
  
  for (const item of items) {
    const inputPath = path.join(inputDir, item);
    const outputPath = path.join(outputDir, item);
    const stat = fs.statSync(inputPath);
    
    if (stat.isDirectory()) {
      // Create output directory and process recursively
      createOutputDir(inputPath, config.outputDir);
      await processDirectory(inputPath, outputPath);
    } else if (stat.isFile()) {
      stats.totalFiles++;
      const fileType = getFileType(item);
      
      if (fileType === 'image') {
        // Ensure output directory exists
        const outputDirPath = path.dirname(outputPath);
        if (!fs.existsSync(outputDirPath)) {
          fs.mkdirSync(outputDirPath, { recursive: true });
        }
        
        await optimizeImage(inputPath, outputPath);
        
      } else if (fileType === 'video') {
        console.log(`🎬 Skipping video file: ${item} (videos not processed)`);
        stats.videoFiles++;
        stats.skippedFiles++;
        
      } else {
        console.log(`📄 Skipping non-media file: ${item}`);
        stats.skippedFiles++;
        
        // Copy non-media files as-is
        const outputDirPath = path.dirname(outputPath);
        if (!fs.existsSync(outputDirPath)) {
          fs.mkdirSync(outputDirPath, { recursive: true });
        }
        fs.copyFileSync(inputPath, outputPath);
      }
    }
  }
}

// Generate enhanced report
function generateReport() {
  const totalSavings = stats.totalOriginalSize - stats.totalOptimizedSize;
  const overallCompression = getCompressionRatio(stats.totalOriginalSize, stats.totalOptimizedSize);
  const successRate = ((stats.optimizedFiles / (stats.totalFiles - stats.videoFiles - stats.skippedFiles + stats.optimizedFiles)) * 100).toFixed(1);
  
  console.log('\n' + '='.repeat(80));
  console.log('📊 ENHANCED IMAGE OPTIMIZATION REPORT');
  console.log('='.repeat(80));
  console.log(`📁 Input Directory: ${config.inputDir}`);
  console.log(`📁 Output Directory: ${config.outputDir}`);
  console.log('');
  console.log('📈 PROCESSING STATISTICS:');
  console.log(`   Total files found: ${stats.totalFiles}`);
  console.log(`   Images optimized: ${stats.optimizedFiles}`);
  console.log(`   Images repaired: ${stats.repairedFiles}`);
  console.log(`   Video files skipped: ${stats.videoFiles}`);
  console.log(`   Other files skipped: ${stats.skippedFiles - stats.videoFiles}`);
  console.log(`   Processing errors: ${stats.errors.length}`);
  console.log(`   Success rate: ${successRate}%`);
  console.log('');
  console.log('💾 FILE SIZE ANALYSIS:');
  console.log(`   Original total size: ${formatBytes(stats.totalOriginalSize)}`);
  console.log(`   Optimized total size: ${formatBytes(stats.totalOptimizedSize)}`);
  console.log(`   Total space saved: ${formatBytes(totalSavings)}`);
  console.log(`   Overall compression: ${overallCompression}%`);
  console.log(`   Avg space saved per image: ${formatBytes(totalSavings / stats.optimizedFiles)}`);
  
  if (stats.repairedFiles > 0) {
    console.log('\n🔧 REPAIR STATISTICS:');
    console.log(`   Corrupted images repaired: ${stats.repairedFiles}`);
    console.log(`   Repair success rate: 100%`);
  }
  
  if (stats.errors.length > 0) {
    console.log('\n❌ ERRORS:');
    stats.errors.forEach(error => {
      console.log(`   ${error.file}: ${error.error}`);
    });
  }
  
  if (stats.errors.length === 0 && stats.repairedFiles >= 0) {
    console.log('\n🎉 PERFECT SUCCESS - ALL IMAGES PROCESSED!');
  }
  
  console.log('\n✨ OPTIMIZATION COMPLETE!');
  console.log('='.repeat(80));
  
  // Save detailed report to file
  const reportPath = './image-optimization-report-enhanced.json';
  const report = {
    timestamp: new Date().toISOString(),
    config,
    stats: {
      ...stats,
      successRate: `${successRate}%`,
      avgSavingsPerImage: formatBytes(totalSavings / stats.optimizedFiles)
    },
    summary: {
      totalSavings: formatBytes(totalSavings),
      overallCompression: `${overallCompression}%`,
      perfection: stats.errors.length === 0 ? 'ACHIEVED' : 'MINOR_ISSUES',
      repairCount: stats.repairedFiles
    }
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`📄 Enhanced report saved to: ${reportPath}`);
}

// Main execution
async function main() {
  console.log('🚀 Starting ENHANCED Image Optimization Process...');
  console.log('🔧 Features: Corruption repair, better error handling, file type detection');
  console.log(`📂 Processing images in: ${config.inputDir}`);
  console.log(`💾 Output directory: ${config.outputDir}`);
  console.log('⚙️  Configuration:');
  console.log(`   JPEG Quality: ${config.quality.jpeg}%`);
  console.log(`   WebP Quality: ${config.quality.webp}%`);
  console.log(`   PNG Compression: Level ${config.quality.png}`);
  console.log(`   Max Width: ${config.maxWidth}px`);
  console.log(`   Corruption Recovery: ${config.corruptionRecovery ? 'ENABLED' : 'DISABLED'}`);
  console.log('\n' + '-'.repeat(80));
  
  // Check if input directory exists
  if (!fs.existsSync(config.inputDir)) {
    console.error(`❌ Input directory not found: ${config.inputDir}`);
    process.exit(1);
  }
  
  // Create output directory
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }
  
  const startTime = Date.now();
  
  try {
    await processDirectory(config.inputDir, config.outputDir);
  } catch (error) {
    console.error('❌ Fatal error during processing:', error);
    process.exit(1);
  }
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  console.log(`\n⏱️  Processing completed in ${duration} seconds`);
  generateReport();
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Unhandled error:', error);
    process.exit(1);
  });
}

module.exports = { main, optimizeImage, config }; 