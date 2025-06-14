import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getAIStatus } from '@/lib/ai';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const hasAccess = session.user.roles?.some(role => 
      ['admin', 'manager', 'super_admin'].includes(role)
    );

    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    console.log('🔍 Starting comprehensive system test...');

    const results: any = {
      timestamp: new Date().toISOString(),
      user: {
        id: session.user.id,
        email: session.user.email,
        roles: session.user.roles,
        level: session.user.level,
      },
      tests: {} as Record<string, any>,
    };

    // 1. Database Connectivity Test
    try {
      await prisma.$connect();
      const userCount = await prisma.user.count();
      const productCount = await prisma.product.count();
      const leadCount = await prisma.designLead.count();
      const projectCount = await prisma.project.count();
      const blogCount = await prisma.blogPost.count();
      
      results.tests.database = {
        status: 'PASS',
        connected: true,
        counts: {
          users: userCount,
          products: productCount,
          leads: leadCount,
          projects: projectCount,
          blogPosts: blogCount,
        },
        message: 'Database connection successful',
      };
    } catch (error) {
      results.tests.database = {
        status: 'FAIL',
        connected: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Database connection failed',
      };
    }

    // 2. AI System Test
    try {
      const aiStatus = getAIStatus();
      results.tests.ai = {
        status: aiStatus.configured ? 'PASS' : 'WARNING',
        configured: aiStatus.configured,
        available: aiStatus.available,
        model: aiStatus.model,
        message: aiStatus.message,
      };
    } catch (error) {
      results.tests.ai = {
        status: 'FAIL',
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'AI system test failed',
      };
    }

    // 3. Authentication System Test
    try {
      // Test role checking
      const roleCheck = session.user.roles?.includes('admin') || 
                       session.user.roles?.includes('super_admin');
      
      results.tests.authentication = {
        status: 'PASS',
        session: {
          authenticated: true,
          hasRoles: session.user.roles && session.user.roles.length > 0,
          hasAdminAccess: roleCheck,
          level: session.user.level,
        },
        message: 'Authentication system working',
      };
    } catch (error) {
      results.tests.authentication = {
        status: 'FAIL',
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Authentication test failed',
      };
    }

    // 4. API Routes Test
    try {
      const apiTests = [];
      
      // Test products API
      try {
        const productsResponse = await fetch(`${request.nextUrl.origin}/api/products?admin=true&limit=1`, {
          headers: {
            'Cookie': request.headers.get('Cookie') || '',
          },
        });
        apiTests.push({
          endpoint: '/api/products',
          status: productsResponse.ok ? 'PASS' : 'FAIL',
          httpStatus: productsResponse.status,
        });
      } catch (error) {
        apiTests.push({
          endpoint: '/api/products',
          status: 'FAIL',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }

      // Test leads API
      try {
        const leadsResponse = await fetch(`${request.nextUrl.origin}/api/leads`, {
          headers: {
            'Cookie': request.headers.get('Cookie') || '',
          },
        });
        apiTests.push({
          endpoint: '/api/leads',
          status: leadsResponse.ok ? 'PASS' : 'FAIL',
          httpStatus: leadsResponse.status,
        });
      } catch (error) {
        apiTests.push({
          endpoint: '/api/leads',
          status: 'FAIL',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }

      // Test blog API
      try {
        const blogResponse = await fetch(`${request.nextUrl.origin}/api/blog?admin=true&limit=1`, {
          headers: {
            'Cookie': request.headers.get('Cookie') || '',
          },
        });
        apiTests.push({
          endpoint: '/api/blog',
          status: blogResponse.ok ? 'PASS' : 'FAIL',
          httpStatus: blogResponse.status,
        });
      } catch (error) {
        apiTests.push({
          endpoint: '/api/blog',
          status: 'FAIL',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }

      const passedTests = apiTests.filter(test => test.status === 'PASS').length;
      const totalTests = apiTests.length;

      results.tests.apiRoutes = {
        status: passedTests === totalTests ? 'PASS' : 'PARTIAL',
        passed: passedTests,
        total: totalTests,
        tests: apiTests,
        message: `${passedTests}/${totalTests} API routes working`,
      };
    } catch (error) {
      results.tests.apiRoutes = {
        status: 'FAIL',
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'API routes test failed',
      };
    }

    // 5. Environment Configuration Test
    try {
      const envChecks = {
        DATABASE_URL: !!process.env.DATABASE_URL,
        NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
        OPENAI_API_KEY: !!process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your-actual-openai-api-key-here-sk-proj-xxxx',
        NODE_ENV: process.env.NODE_ENV,
      };

      const configuredCount = Object.values(envChecks).filter(Boolean).length;
      const totalCount = Object.keys(envChecks).length - 1; // Exclude NODE_ENV from count

      results.tests.environment = {
        status: configuredCount >= totalCount - 1 ? 'PASS' : 'WARNING', // Allow OPENAI to be optional
        configured: configuredCount,
        total: totalCount,
        checks: envChecks,
        message: `${configuredCount}/${totalCount} environment variables configured`,
      };
    } catch (error) {
      results.tests.environment = {
        status: 'FAIL',
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Environment configuration test failed',
      };
    }

    // Calculate overall status
    const testStatuses = Object.values(results.tests).map((test: any) => test.status);
    const hasFailures = testStatuses.includes('FAIL');
    const hasWarnings = testStatuses.includes('WARNING');
    const hasPartial = testStatuses.includes('PARTIAL');

    results.overall = {
      status: hasFailures ? 'FAIL' : hasWarnings || hasPartial ? 'WARNING' : 'PASS',
      summary: {
        passed: testStatuses.filter(s => s === 'PASS').length,
        warnings: testStatuses.filter(s => s === 'WARNING').length,
        partial: testStatuses.filter(s => s === 'PARTIAL').length,
        failed: testStatuses.filter(s => s === 'FAIL').length,
        total: testStatuses.length,
      },
      message: hasFailures 
        ? 'System has critical issues that need attention'
        : hasWarnings || hasPartial
        ? 'System is functional but has some configuration warnings'
        : 'All systems operational',
    };

    console.log('✅ System test completed:', results.overall.message);

    return NextResponse.json(results);

  } catch (error) {
    console.error('❌ System test failed:', error);
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      overall: {
        status: 'FAIL',
        message: 'System test encountered an unexpected error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    }, { status: 500 });
  }
} 