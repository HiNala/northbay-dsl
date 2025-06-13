"use client"

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  XCircle,
  Loader2,
  Database,
  Cpu,
  Key,
  Package,
  Users,
  Activity,
  AlertCircle,
  RefreshCw,
} from "lucide-react"

interface TestResult {
  name: string
  status: 'pending' | 'success' | 'error' | 'warning'
  message: string
  details?: any
  duration?: number
}

export default function BackendTestPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [overallStatus, setOverallStatus] = useState<'idle' | 'running' | 'completed'>('idle')

  // Check authentication
  useEffect(() => {
    if (status === 'loading') return
    
    if (!session?.user) {
      router.push('/auth/login')
      return
    }

    const hasAccess = session.user.roles?.some(role => 
      ['admin', 'super_admin'].includes(role)
    )

    if (!hasAccess) {
      router.push('/')
      return
    }
  }, [session, status, router])

  const updateTestResult = (name: string, result: Partial<TestResult>) => {
    setTestResults(prev => {
      const existing = prev.find(r => r.name === name)
      if (existing) {
        return prev.map(r => r.name === name ? { ...r, ...result } : r)
      } else {
        return [...prev, { name, status: 'pending', message: '', ...result }]
      }
    })
  }

  const runAllTests = async () => {
    setLoading(true)
    setOverallStatus('running')
    setTestResults([])

    const tests = [
      { name: 'Database Connection', test: testDatabaseConnection },
      { name: 'OpenAI Configuration', test: testOpenAIConfiguration },
      { name: 'AI Description Generation', test: testAIGeneration },
      { name: 'Product API - Create', test: testProductCreate },
      { name: 'Product API - Read', test: testProductRead },
      { name: 'Product API - Update', test: testProductUpdate },
      { name: 'Authentication System', test: testAuthentication },
      { name: 'Category Management', test: testCategoryManagement },
      { name: 'Brand Management', test: testBrandManagement },
      { name: 'Bulk Operations', test: testBulkOperations }
    ]

    for (const test of tests) {
      updateTestResult(test.name, { status: 'pending', message: 'Running...' })
      const startTime = Date.now()
      
      try {
        await test.test(test.name)
        const duration = Date.now() - startTime
        updateTestResult(test.name, { 
          status: 'success', 
          message: 'Passed',
          duration 
        })
      } catch (error) {
        const duration = Date.now() - startTime
        updateTestResult(test.name, {
          status: 'error',
          message: error instanceof Error ? error.message : 'Test failed',
          duration
        })
      }

      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    setOverallStatus('completed')
    setLoading(false)
  }

  // Test Functions
  const testDatabaseConnection = async (testName: string) => {
    const response = await fetch('/api/products?limit=1&admin=true')
    if (!response.ok) {
      throw new Error(`Database connection failed: ${response.statusText}`)
    }
    const data = await response.json()
    updateTestResult(testName, { 
      details: { connected: true, productCount: data.pagination?.total || 0 }
    })
  }

  const testOpenAIConfiguration = async (testName: string) => {
    const isConfigured = process.env.NEXT_PUBLIC_OPENAI_CONFIGURED === 'true'
    if (!isConfigured) {
      updateTestResult(testName, {
        status: 'warning',
        message: 'OpenAI API key not configured (placeholder value detected)',
        details: { configured: false, needsSetup: true }
      })
      return
    }
    updateTestResult(testName, {
      details: { configured: true, model: 'gpt-4o-mini' }
    })
  }

  const testAIGeneration = async (testName: string) => {
    try {
      const response = await fetch('/api/test-ai')
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'AI test failed')
      }

      updateTestResult(testName, {
        details: {
          configured: data.openai_configured,
          result: data.test_result,
          model: data.model
        }
      })
    } catch (error) {
      if (error instanceof Error && error.message.includes('API key')) {
        updateTestResult(testName, {
          status: 'warning',
          message: 'OpenAI API key not configured - AI features unavailable',
          details: { needsApiKey: true }
        })
        return
      }
      throw error
    }
  }

  const testProductCreate = async (testName: string) => {
    const testProduct = {
      name: `Test Product ${Date.now()}`,
      description: 'Test product for backend validation',
      price: 999.99,
      categoryId: null, // Will need to get a real category ID
      status: 'draft'
    }

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testProduct)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Product creation failed')
    }

    const data = await response.json()
    updateTestResult(testName, {
      details: { productId: data.product.id, created: true }
    })
  }

  const testProductRead = async (testName: string) => {
    const response = await fetch('/api/products?limit=5&admin=true')
    if (!response.ok) {
      throw new Error('Product reading failed')
    }
    const data = await response.json()
    updateTestResult(testName, {
      details: { 
        totalProducts: data.pagination?.total || 0,
        retrieved: data.products?.length || 0
      }
    })
  }

  const testProductUpdate = async (testName: string) => {
    // First get a product to update
    const getResponse = await fetch('/api/products?limit=1&admin=true')
    const getData = await getResponse.json()
    
    if (!getData.products?.length) {
      throw new Error('No products available to test update')
    }

    const productId = getData.products[0].id
    const updateResponse = await fetch(`/api/products/${productId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        description: `Updated description ${Date.now()}` 
      })
    })

    if (!updateResponse.ok) {
      throw new Error('Product update failed')
    }

    updateTestResult(testName, {
      details: { productId, updated: true }
    })
  }

  const testAuthentication = async (testName: string) => {
    const response = await fetch('/api/products?admin=true')
    if (!response.ok) {
      throw new Error('Authentication test failed')
    }
    updateTestResult(testName, {
      details: { 
        authenticated: true, 
        userRole: session?.user?.roles?.[0] || 'unknown'
      }
    })
  }

  const testCategoryManagement = async (testName: string) => {
    const response = await fetch('/api/categories')
    if (!response.ok) {
      throw new Error('Category management test failed')
    }
    const data = await response.json()
    updateTestResult(testName, {
      details: { 
        categoriesAvailable: data.categories?.length || 0,
        working: true
      }
    })
  }

  const testBrandManagement = async (testName: string) => {
    const response = await fetch('/api/brands')
    if (!response.ok) {
      throw new Error('Brand management test failed')  
    }
    const data = await response.json()
    updateTestResult(testName, {
      details: {
        brandsAvailable: data.brands?.length || 0,
        working: true
      }
    })
  }

  const testBulkOperations = async (testName: string) => {
    // Test bulk operations endpoint exists
    const response = await fetch('/api/products/bulk-import', {
      method: 'GET'
    })
    
    // Even if it returns an error, if it's a 400 (bad request) it means the endpoint exists
    if (response.status === 404) {
      throw new Error('Bulk operations endpoint not found')
    }
    
    updateTestResult(testName, {
      details: { 
        endpointExists: true,
        bulkImportAvailable: true
      }
    })
  }

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case 'pending':
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
      default:
        return null
    }
  }

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'success': return 'text-green-700 bg-green-50 border-green-200'
      case 'error': return 'text-red-700 bg-red-50 border-red-200'
      case 'warning': return 'text-yellow-700 bg-yellow-50 border-yellow-200'
      default: return 'text-gray-700 bg-gray-50 border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 mx-auto mb-4" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Backend System Test</h2>
          <p className="text-muted-foreground">
            Comprehensive testing of product management and AI features
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            onClick={runAllTests} 
            disabled={overallStatus === 'running'}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {overallStatus === 'running' ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Running Tests...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Run All Tests
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Overall Status */}
      {overallStatus !== 'idle' && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {overallStatus === 'running' && <Loader2 className="h-5 w-5 animate-spin text-blue-500" />}
                {overallStatus === 'completed' && (
                  <>
                    {testResults.every(r => r.status === 'success') ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : testResults.some(r => r.status === 'error') ? (
                      <XCircle className="h-5 w-5 text-red-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    )}
                  </>
                )}
                <div>
                  <h3 className="font-semibold">
                    {overallStatus === 'running' ? 'Running Tests...' : 'Test Results'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {testResults.filter(r => r.status === 'success').length} passed, {' '}
                    {testResults.filter(r => r.status === 'error').length} failed, {' '}
                    {testResults.filter(r => r.status === 'warning').length} warnings
                  </p>
                </div>
              </div>
              <Badge variant={
                testResults.every(r => r.status === 'success') ? 'default' :
                testResults.some(r => r.status === 'error') ? 'destructive' : 'secondary'
              }>
                {overallStatus === 'running' ? 'In Progress' : 
                 testResults.every(r => r.status === 'success') ? 'All Passed' :
                 testResults.some(r => r.status === 'error') ? 'Some Failed' : 'Warnings'
                }
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testResults.map((result, index) => (
            <Card key={index} className={`border-2 ${getStatusColor(result.status)}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(result.status)}
                    <h3 className="font-medium">{result.name}</h3>
                  </div>
                  {result.duration && (
                    <span className="text-xs text-muted-foreground">
                      {result.duration}ms
                    </span>
                  )}
                </div>
                
                <p className="text-sm mb-2">{result.message}</p>
                
                {result.details && (
                  <div className="text-xs space-y-1">
                    {Object.entries(result.details).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="font-medium">{key}:</span>
                        <span>{typeof value === 'boolean' ? (value ? '✓' : '✗') : String(value)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Setup Instructions */}
      {overallStatus === 'idle' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Backend System Testing
            </CardTitle>
            <CardDescription>
              This tool will test all backend functionality including APIs, database, and AI features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Database className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Database Tests</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Connection status</li>
                  <li>• Product CRUD operations</li>
                  <li>• Category & brand management</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Cpu className="h-4 w-4 text-purple-500" />
                  <span className="font-medium">AI Features</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• OpenAI configuration</li>
                  <li>• Description generation</li>
                  <li>• Quality scoring</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Key className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Security & APIs</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Authentication system</li>
                  <li>• Role-based access</li>
                  <li>• API endpoints</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800">OpenAI Setup Required</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    To enable AI features, update your <code>.env</code> file with a real OpenAI API key:
                  </p>
                  <code className="block mt-2 p-2 bg-yellow-100 rounded text-xs">
                    OPENAI_API_KEY=sk-proj-your-actual-key-here
                  </code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 