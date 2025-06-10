import * as XLSX from 'xlsx';
import Papa from 'papaparse';

export interface ImportedProduct {
  name: string;
  description?: string;
  price?: number;
  comparePrice?: number;
  sku?: string;
  category?: string;
  brand?: string;
  tags?: string[];
  specifications?: Record<string, any>;
  inStock?: boolean;
  stockQuantity?: number;
  status?: 'draft' | 'published' | 'archived';
  type?: string;
}

export interface ImportValidationError {
  row: number;
  field: string;
  message: string;
  value: any;
}

export interface ImportResult {
  data: ImportedProduct[];
  errors: ImportValidationError[];
  totalRows: number;
  validRows: number;
  duplicates: string[];
  warnings: string[];
}

// Standard column mappings for common import formats
export const COLUMN_MAPPINGS = {
  name: ['name', 'product_name', 'product name', 'title', 'item_name'],
  description: ['description', 'desc', 'product_description', 'details'],
  price: ['price', 'cost', 'amount', 'retail_price', 'selling_price'],
  comparePrice: ['compare_price', 'msrp', 'list_price', 'original_price'],
  sku: ['sku', 'product_code', 'item_code', 'part_number'],
  category: ['category', 'product_category', 'type', 'product_type'],
  brand: ['brand', 'manufacturer', 'make', 'vendor'],
  tags: ['tags', 'keywords', 'labels'],
  inStock: ['in_stock', 'available', 'inventory', 'stock_status'],
  stockQuantity: ['stock_quantity', 'quantity', 'qty', 'inventory_count'],
  status: ['status', 'state', 'published'],
};

// Parse Excel file to JSON
export function parseExcelFile(file: Buffer): any[] {
  try {
    const workbook = XLSX.read(file, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0]; // Use first sheet
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON with header row
    const data = XLSX.utils.sheet_to_json(worksheet, { 
      header: 1,
      defval: '',
      blankrows: false 
    });
    
    if (data.length === 0) {
      throw new Error('Excel file is empty');
    }
    
    return data as any[];
  } catch (error) {
    throw new Error(`Failed to parse Excel file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Parse CSV file to JSON
export function parseCSVFile(fileContent: string): any[] {
  try {
    const result = Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
      trimHeaders: true,
      transform: (value: string) => value.trim(),
    });
    
    if (result.errors.length > 0) {
      throw new Error(`CSV parsing errors: ${result.errors.map(e => e.message).join(', ')}`);
    }
    
    return result.data;
  } catch (error) {
    throw new Error(`Failed to parse CSV file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Detect and map columns automatically
export function detectColumnMapping(headers: string[]): Record<string, string> {
  const mapping: Record<string, string> = {};
  
  // Normalize headers (lowercase, remove spaces/underscores)
  const normalizedHeaders = headers.map(h => 
    h.toLowerCase().replace(/[\s_-]+/g, '_')
  );
  
  // Map each standard field to the best matching header
  Object.entries(COLUMN_MAPPINGS).forEach(([field, variants]) => {
    for (const variant of variants) {
      const normalizedVariant = variant.toLowerCase().replace(/[\s_-]+/g, '_');
      const headerIndex = normalizedHeaders.findIndex(h => 
        h === normalizedVariant || h.includes(normalizedVariant)
      );
      
      if (headerIndex !== -1) {
        mapping[field] = headers[headerIndex];
        break;
      }
    }
  });
  
  return mapping;
}

// Transform raw data using column mapping
export function transformRawData(
  rawData: any[], 
  columnMapping: Record<string, string>
): ImportedProduct[] {
  return rawData.map((row, index) => {
    const product: ImportedProduct = {
      name: '',
    };
    
    // Map each field using the column mapping
    Object.entries(columnMapping).forEach(([field, column]) => {
      const value = row[column];
      
      switch (field) {
        case 'name':
          product.name = String(value || '').trim();
          break;
          
        case 'description':
          product.description = value ? String(value).trim() : undefined;
          break;
          
        case 'price':
        case 'comparePrice':
          if (value !== undefined && value !== '') {
            const numericValue = parseFloat(String(value).replace(/[$,]/g, ''));
            if (!isNaN(numericValue)) {
              product[field] = numericValue;
            }
          }
          break;
          
        case 'stockQuantity':
          if (value !== undefined && value !== '') {
            const numericValue = parseInt(String(value));
            if (!isNaN(numericValue)) {
              product.stockQuantity = numericValue;
            }
          }
          break;
          
        case 'inStock':
          if (value !== undefined && value !== '') {
            const boolValue = String(value).toLowerCase();
            product.inStock = ['true', 'yes', '1', 'y', 'available'].includes(boolValue);
          }
          break;
          
        case 'tags':
          if (value) {
            product.tags = String(value).split(/[,;|]/).map(t => t.trim()).filter(Boolean);
          }
          break;
          
        case 'status':
          if (value) {
            const statusValue = String(value).toLowerCase();
            if (['draft', 'published', 'archived'].includes(statusValue)) {
              product.status = statusValue as 'draft' | 'published' | 'archived';
            }
          }
          break;
          
        case 'specifications':
          // Handle specifications as JSON string or object
          if (value) {
            try {
              product.specifications = typeof value === 'string' ? JSON.parse(value) : value;
            } catch {
              // If not JSON, treat as single key-value
              product.specifications = { [column]: value };
            }
          }
          break;
          
        default:
          // Handle other string fields
          if (value !== undefined && value !== '') {
            (product as any)[field] = String(value).trim();
          }
      }
    });
    
    return product;
  });
}

// Validate imported products
export function validateImportedProducts(products: ImportedProduct[]): ImportValidationError[] {
  const errors: ImportValidationError[] = [];
  
  products.forEach((product, index) => {
    const row = index + 1; // 1-based row numbering
    
    // Required field validation
    if (!product.name || product.name.trim() === '') {
      errors.push({
        row,
        field: 'name',
        message: 'Product name is required',
        value: product.name
      });
    }
    
    // Price validation
    if (product.price !== undefined && (product.price < 0 || product.price > 1000000)) {
      errors.push({
        row,
        field: 'price',
        message: 'Price must be between $0 and $1,000,000',
        value: product.price
      });
    }
    
    // Compare price validation
    if (product.comparePrice !== undefined && product.price !== undefined) {
      if (product.comparePrice < product.price) {
        errors.push({
          row,
          field: 'comparePrice',
          message: 'Compare price should be higher than regular price',
          value: product.comparePrice
        });
      }
    }
    
    // Stock quantity validation
    if (product.stockQuantity !== undefined && product.stockQuantity < 0) {
      errors.push({
        row,
        field: 'stockQuantity',
        message: 'Stock quantity cannot be negative',
        value: product.stockQuantity
      });
    }
    
    // Name length validation
    if (product.name && product.name.length > 200) {
      errors.push({
        row,
        field: 'name',
        message: 'Product name cannot exceed 200 characters',
        value: product.name
      });
    }
    
    // Description length validation
    if (product.description && product.description.length > 5000) {
      errors.push({
        row,
        field: 'description',
        message: 'Description cannot exceed 5000 characters',
        value: product.description
      });
    }
  });
  
  return errors;
}

// Find potential duplicates
export function findDuplicates(products: ImportedProduct[]): string[] {
  const duplicates: string[] = [];
  const nameMap = new Map<string, number[]>();
  
  // Group products by name
  products.forEach((product, index) => {
    const normalizedName = product.name.toLowerCase().trim();
    if (!nameMap.has(normalizedName)) {
      nameMap.set(normalizedName, []);
    }
    nameMap.get(normalizedName)!.push(index + 1);
  });
  
  // Find duplicates
  nameMap.forEach((rows, name) => {
    if (rows.length > 1) {
      duplicates.push(`"${name}" appears in rows: ${rows.join(', ')}`);
    }
  });
  
  return duplicates;
}

// Main import processing function
export function processImportFile(
  fileData: Buffer | string,
  fileType: 'excel' | 'csv',
  columnMapping?: Record<string, string>
): ImportResult {
  try {
    // Parse the file
    let rawData: any[];
    
    if (fileType === 'excel') {
      const excelData = parseExcelFile(fileData as Buffer);
      if (excelData.length < 2) {
        throw new Error('Excel file must have header row and at least one data row');
      }
      
      // Convert array format to object format
      const headers = excelData[0];
      rawData = excelData.slice(1).map(row => {
        const obj: any = {};
        headers.forEach((header: string, index: number) => {
          obj[header] = row[index] || '';
        });
        return obj;
      });
    } else {
      rawData = parseCSVFile(fileData as string);
    }
    
    if (rawData.length === 0) {
      throw new Error('No data rows found in file');
    }
    
    // Detect column mapping if not provided
    const headers = Object.keys(rawData[0]);
    const finalMapping = columnMapping || detectColumnMapping(headers);
    
    // Transform data
    const transformedData = transformRawData(rawData, finalMapping);
    
    // Validate data
    const errors = validateImportedProducts(transformedData);
    
    // Find duplicates
    const duplicates = findDuplicates(transformedData);
    
    // Generate warnings
    const warnings: string[] = [];
    const mappedFields = Object.keys(finalMapping);
    const unmappedHeaders = headers.filter(h => !Object.values(finalMapping).includes(h));
    
    if (unmappedHeaders.length > 0) {
      warnings.push(`Unmapped columns: ${unmappedHeaders.join(', ')}`);
    }
    
    if (!mappedFields.includes('price')) {
      warnings.push('No price column detected - products will be created without pricing');
    }
    
    const validRows = transformedData.length - errors.filter(e => e.field === 'name').length;
    
    return {
      data: transformedData,
      errors,
      totalRows: rawData.length,
      validRows,
      duplicates,
      warnings,
    };
    
  } catch (error) {
    throw new Error(`Import processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
} 