'use client';

import React, { useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';
import { 
  Upload, 
  FileSpreadsheet, 
  CheckCircle, 
  AlertTriangle, 
  X, 
  Download,
  ArrowLeft,
  Settings,
  Eye,
  Play,
  RotateCcw
} from 'lucide-react';

interface ImportPreview {
  data: any[];
  errors: any[];
  totalRows: number;
  validRows: number;
  duplicates: string[];
  warnings: string[];
}

interface ImportResult {
  imported: number;
  skipped: number;
  updated: number;
  errors: string[];
  total: number;
}

export default function BulkImportPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [preview, setPreview] = useState<ImportPreview | null>(null);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [currentStep, setCurrentStep] = useState<'upload' | 'preview' | 'settings' | 'importing' | 'complete'>('upload');
  
  // Import settings
  const [importSettings, setImportSettings] = useState({
    updateExisting: false,
    skipDuplicates: true,
    defaultStatus: 'draft' as 'draft' | 'published',
    defaultCategoryId: '',
    defaultBrandId: '',
  });

  // Check authentication
  React.useEffect(() => {
    if (status === 'loading') return;
    
    if (!session?.user) {
      router.push('/auth/login');
      return;
    }

    const hasAccess = session.user.roles?.some(role => 
      ['admin', 'manager', 'employee', 'super_admin'].includes(role)
    );

    if (!hasAccess) {
      router.push('/');
      return;
    }
  }, [session, status, router]);

  // Drag and drop handlers
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (selectedFile: File) => {
    // Validate file type
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv',
      'application/csv'
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert('Please upload only Excel (.xlsx, .xls) or CSV files.');
      return;
    }

    // Validate file size (10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB.');
      return;
    }

    setFile(selectedFile);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const generatePreview = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('preview', 'true');
      formData.append('metadata', JSON.stringify({
        fileType: file.type.includes('csv') ? 'csv' : 'excel',
        importOptions: importSettings,
      }));

      const response = await fetch('/api/products/bulk-import', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setPreview(result.result);
        setCurrentStep('preview');
      } else {
        alert(`Preview failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Preview error:', error);
      alert('Failed to generate preview. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const executeImport = async () => {
    if (!file) return;

    setIsImporting(true);
    setCurrentStep('importing');
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('metadata', JSON.stringify({
        fileType: file.type.includes('csv') ? 'csv' : 'excel',
        importOptions: importSettings,
      }));

      const response = await fetch('/api/products/bulk-import', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setImportResult(result.results);
        setCurrentStep('complete');
      } else {
        alert(`Import failed: ${result.error}`);
        setCurrentStep('preview');
      }
    } catch (error) {
      console.error('Import error:', error);
      alert('Import failed. Please try again.');
      setCurrentStep('preview');
    } finally {
      setIsImporting(false);
    }
  };

  const resetImport = () => {
    setFile(null);
    setPreview(null);
    setImportResult(null);
    setCurrentStep('upload');
  };

  const downloadTemplate = () => {
    // Create CSV template
    const headers = ['name', 'description', 'price', 'compare_price', 'sku', 'category', 'brand', 'tags', 'in_stock', 'stock_quantity', 'status'];
    const sampleData = [
      'Premium Kitchen Faucet',
      'High-end brushed stainless steel kitchen faucet with pull-down sprayer',
      '299.99',
      '399.99',
      'FAUCET-001',
      'Kitchen Fixtures',
      'Kohler',
      'kitchen,faucet,stainless steel',
      'true',
      '25',
      'published'
    ];
    
    const csvContent = [
      headers.join(','),
      sampleData.join(',')
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product-import-template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link href="/admin/products">
              <Button variant="outline" size="sm" className="mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">📊 Bulk Product Import</h1>
          </div>
          <p className="text-gray-600">
            Import multiple products from Excel or CSV files with validation and preview
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            {[
              { step: 'upload', label: 'Upload File' },
              { step: 'preview', label: 'Preview & Validate' },
              { step: 'importing', label: 'Importing' },
              { step: 'complete', label: 'Complete' },
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep === item.step 
                    ? 'bg-amber-600 text-white' 
                    : index < ['upload', 'preview', 'importing', 'complete'].indexOf(currentStep)
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {index < ['upload', 'preview', 'importing', 'complete'].indexOf(currentStep) ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep === item.step ? 'text-amber-600' : 'text-gray-600'
                }`}>
                  {item.label}
                </span>
                {index < 3 && <div className="w-8 h-px bg-gray-300 mx-4" />}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: File Upload */}
        {currentStep === 'upload' && (
          <div className="space-y-6">
            {/* Template Download */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">📋 Download Template</h3>
                  <p className="text-gray-600">
                    Start with our template to ensure proper formatting
                  </p>
                </div>
                <Button onClick={downloadTemplate} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download CSV Template
                </Button>
              </div>
            </Card>

            {/* File Upload Area */}
            <Card className={`p-8 border-2 border-dashed transition-colors ${
              dragActive ? 'border-amber-400 bg-amber-50' : 'border-gray-300'
            }`}>
              <div
                className="text-center"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <FileSpreadsheet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {file ? file.name : 'Upload Product File'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {file 
                    ? `Ready to process ${file.size > 1024 ? `${(file.size / 1024 / 1024).toFixed(1)}MB` : `${file.size}B`} file`
                    : 'Drag and drop your Excel or CSV file here, or click to browse'
                  }
                </p>
                
                <div className="flex justify-center space-x-4">
                  {!file ? (
                    <label>
                      <input
                        type="file"
                        className="hidden"
                        accept=".xlsx,.xls,.csv"
                        onChange={handleFileInput}
                      />
                      <Button className="cursor-pointer">
                        <Upload className="w-4 h-4 mr-2" />
                        Choose File
                      </Button>
                    </label>
                  ) : (
                    <>
                      <Button onClick={generatePreview} disabled={isUploading}>
                        {isUploading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4 mr-2" />
                            Generate Preview
                          </>
                        )}
                      </Button>
                      <Button variant="outline" onClick={() => setFile(null)}>
                        <X className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>

            {/* File Requirements */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 File Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Supported Formats</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Excel files (.xlsx, .xls)</li>
                    <li>• CSV files (.csv)</li>
                    <li>• Maximum file size: 10MB</li>
                    <li>• Maximum rows: 10,000</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Required Columns</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <strong>name</strong> - Product name (required)</li>
                    <li>• description - Product description</li>
                    <li>• price - Regular price</li>
                    <li>• category - Product category</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Step 2: Preview */}
        {currentStep === 'preview' && preview && (
          <div className="space-y-6">
            {/* Preview Summary */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Import Preview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{preview.totalRows}</div>
                  <div className="text-sm text-gray-600">Total Rows</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{preview.validRows}</div>
                  <div className="text-sm text-gray-600">Valid Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{preview.errors.length}</div>
                  <div className="text-sm text-gray-600">Errors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{preview.duplicates.length}</div>
                  <div className="text-sm text-gray-600">Duplicates</div>
                </div>
              </div>
            </Card>

            {/* Errors & Warnings */}
            {(preview.errors.length > 0 || preview.warnings.length > 0 || preview.duplicates.length > 0) && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">⚠️ Issues Found</h3>
                
                {preview.errors.length > 0 && (
                  <Alert className="mb-4 border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-red-800">Validation Errors</h4>
                      <ul className="mt-2 text-sm text-red-700 space-y-1">
                        {preview.errors.slice(0, 5).map((error, index) => (
                          <li key={index}>Row {error.row}: {error.message} ({error.field})</li>
                        ))}
                        {preview.errors.length > 5 && (
                          <li>... and {preview.errors.length - 5} more errors</li>
                        )}
                      </ul>
                    </div>
                  </Alert>
                )}
                
                {preview.warnings.length > 0 && (
                  <Alert className="mb-4 border-yellow-200 bg-yellow-50">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-yellow-800">Warnings</h4>
                      <ul className="mt-2 text-sm text-yellow-700 space-y-1">
                        {preview.warnings.map((warning, index) => (
                          <li key={index}>{warning}</li>
                        ))}
                      </ul>
                    </div>
                  </Alert>
                )}
                
                {preview.duplicates.length > 0 && (
                  <Alert className="border-orange-200 bg-orange-50">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-orange-800">Potential Duplicates</h4>
                      <ul className="mt-2 text-sm text-orange-700 space-y-1">
                        {preview.duplicates.slice(0, 3).map((duplicate, index) => (
                          <li key={index}>{duplicate}</li>
                        ))}
                        {preview.duplicates.length > 3 && (
                          <li>... and {preview.duplicates.length - 3} more duplicates</li>
                        )}
                      </ul>
                    </div>
                  </Alert>
                )}
              </Card>
            )}

            {/* Sample Data Preview */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Sample Data (First 5 rows)</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {preview.data.slice(0, 5).map((product, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {product.name || <span className="text-red-500">Missing</span>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {product.price ? `$${product.price}` : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {product.category || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={product.status === 'published' ? 'default' : 'outline'}>
                            {product.status || 'draft'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Import Settings */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">⚙️ Import Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="updateExisting"
                    checked={importSettings.updateExisting}
                    onChange={(e) => setImportSettings(prev => ({ ...prev, updateExisting: e.target.checked }))}
                    className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                  />
                  <label htmlFor="updateExisting" className="ml-2 text-sm text-gray-900">
                    Update existing products (by name)
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="skipDuplicates"
                    checked={importSettings.skipDuplicates}
                    onChange={(e) => setImportSettings(prev => ({ ...prev, skipDuplicates: e.target.checked }))}
                    className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                  />
                  <label htmlFor="skipDuplicates" className="ml-2 text-sm text-gray-900">
                    Skip duplicate products
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default status for new products
                  </label>
                  <select
                    value={importSettings.defaultStatus}
                    onChange={(e) => setImportSettings(prev => ({ ...prev, defaultStatus: e.target.value as 'draft' | 'published' }))}
                    className="block w-48 px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={resetImport}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Start Over
              </Button>
              <Button 
                onClick={executeImport} 
                disabled={preview.errors.length > 0}
                className="bg-green-600 hover:bg-green-700"
              >
                <Play className="w-4 h-4 mr-2" />
                Import {preview.validRows} Products
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Importing */}
        {currentStep === 'importing' && (
          <Card className="p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Importing Products...</h3>
            <p className="text-gray-600">Please wait while we process your products. This may take a few minutes.</p>
          </Card>
        )}

        {/* Step 4: Complete */}
        {currentStep === 'complete' && importResult && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Import Complete!</h3>
                <p className="text-gray-600 mb-6">Your products have been successfully imported.</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{importResult.imported}</div>
                    <div className="text-sm text-gray-600">Imported</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{importResult.updated}</div>
                    <div className="text-sm text-gray-600">Updated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{importResult.skipped}</div>
                    <div className="text-sm text-gray-600">Skipped</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{importResult.errors.length}</div>
                    <div className="text-sm text-gray-600">Errors</div>
                  </div>
                </div>

                {importResult.errors.length > 0 && (
                  <Alert className="border-red-200 bg-red-50 mb-6">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-red-800">Import Errors</h4>
                      <ul className="mt-2 text-sm text-red-700 space-y-1">
                        {importResult.errors.slice(0, 5).map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                        {importResult.errors.length > 5 && (
                          <li>... and {importResult.errors.length - 5} more errors</li>
                        )}
                      </ul>
                    </div>
                  </Alert>
                )}

                <div className="flex justify-center space-x-4">
                  <Link href="/admin/products">
                    <Button>
                      View Products
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={resetImport}>
                    Import More
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
} 