import { NextRequest, NextResponse } from 'next/server';
import { sendContactFormEmails, ContactFormData } from '@/lib/email';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema
const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  serviceType: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the form data
    const validatedData = contactFormSchema.parse(body);
    
    // Save to database as a design lead
    const designLead = await prisma.designLead.create({
      data: {
        fullName: `${validatedData.firstName} ${validatedData.lastName}`,
        email: validatedData.email,
        phone: validatedData.phone,
        projectType: validatedData.serviceType || 'general-inquiry',
        budgetMin: validatedData.budget ? parseInt(validatedData.budget.split('-')[0].replace(/[^0-9]/g, '')) : null,
        budgetMax: validatedData.budget ? parseInt(validatedData.budget.split('-')[1]?.replace(/[^0-9]/g, '') || '0') : null,
        timeline: validatedData.timeline,
        message: validatedData.message,
        status: 'NEW',
        priority: 'MEDIUM',
        source: 'website',
      }
    });

    // Send emails
    const emailResults = await sendContactFormEmails(validatedData as ContactFormData);
    
    return NextResponse.json({
      success: true,
      message: 'Thank you! We\'ll respond within 24 hours.',
      leadId: designLead.id,
      emailStatus: {
        internal: emailResults.internal.success,
        customer: emailResults.customer.success
      }
    }, { status: 200 });

  } catch (error: unknown) {
    console.error('Contact form submission error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid form data',
        details: error.errors
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to submit contact form. Please try again.'
    }, { status: 500 });
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 