import { Resend } from 'resend';
import nodemailer from 'nodemailer';

// Initialize Resend (primary email service)
const resend = new Resend(process.env.RESEND_API_KEY);

// Fallback SMTP configuration
const smtpTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  serviceType?: string;
  budget?: string;
  timeline?: string;
}

export interface DesignLeadData extends ContactFormData {
  projectType?: string;
  style?: string;
  budgetMin?: number;
  budgetMax?: number;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
}

// Email templates
export const emailTemplates = {
  contactForm: (data: ContactFormData) => ({
    subject: `New Contact Form Submission - ${data.firstName} ${data.lastName}`,
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f5;">
        <div style="background: linear-gradient(135deg, #212A3E 0%, #394867 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 300; text-align: center;">North Bay Kitchen & Bath</h1>
          <p style="margin: 10px 0 0 0; text-align: center; opacity: 0.9;">New Contact Form Submission</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <h2 style="color: #212A3E; margin-top: 0; border-bottom: 2px solid #B79A6B; padding-bottom: 10px;">Contact Details</h2>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #212A3E;">Name:</strong> ${data.firstName} ${data.lastName}<br>
            <strong style="color: #212A3E;">Email:</strong> <a href="mailto:${data.email}" style="color: #B79A6B;">${data.email}</a><br>
            ${data.phone ? `<strong style="color: #212A3E;">Phone:</strong> <a href="tel:${data.phone}" style="color: #B79A6B;">${data.phone}</a><br>` : ''}
            ${data.serviceType ? `<strong style="color: #212A3E;">Service Type:</strong> ${data.serviceType}<br>` : ''}
            ${data.budget ? `<strong style="color: #212A3E;">Budget Range:</strong> ${data.budget}<br>` : ''}
            ${data.timeline ? `<strong style="color: #212A3E;">Timeline:</strong> ${data.timeline}<br>` : ''}
          </div>
          
          ${data.subject ? `
            <h3 style="color: #212A3E; margin-top: 25px;">Subject</h3>
            <p style="background: #f8f0e5; padding: 15px; border-radius: 8px; border-left: 4px solid #B79A6B;">${data.subject}</p>
          ` : ''}
          
          <h3 style="color: #212A3E; margin-top: 25px;">Message</h3>
          <div style="background: #f8f0e5; padding: 20px; border-radius: 8px; border-left: 4px solid #B79A6B; white-space: pre-wrap;">${data.message}</div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e6e4de; text-align: center;">
            <p style="color: #64748b; font-size: 14px;">
              Reply to this email or call the customer directly to follow up on this inquiry.
            </p>
          </div>
        </div>
      </div>
    `,
    text: `
New Contact Form Submission - North Bay Kitchen & Bath

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}
${data.serviceType ? `Service Type: ${data.serviceType}` : ''}
${data.budget ? `Budget Range: ${data.budget}` : ''}
${data.timeline ? `Timeline: ${data.timeline}` : ''}

${data.subject ? `Subject: ${data.subject}` : ''}

Message:
${data.message}
    `
  }),

  customerConfirmation: (data: ContactFormData) => ({
    subject: 'Thank you for contacting North Bay Kitchen & Bath',
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f5;">
        <div style="background: linear-gradient(135deg, #212A3E 0%, #394867 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 300; text-align: center;">North Bay Kitchen & Bath</h1>
          <p style="margin: 10px 0 0 0; text-align: center; opacity: 0.9;">Luxury Kitchen & Bath Design</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <h2 style="color: #212A3E; margin-top: 0;">Thank You, ${data.firstName}!</h2>
          
          <p style="color: #64748b; line-height: 1.6; margin-bottom: 20px;">
            We've received your message and appreciate your interest in North Bay Kitchen & Bath. 
            Our design team will review your inquiry and respond within 24 hours.
          </p>
          
          <div style="background: #f8f0e5; padding: 20px; border-radius: 8px; border-left: 4px solid #B79A6B; margin: 25px 0;">
            <h3 style="color: #212A3E; margin-top: 0;">What's Next?</h3>
            <ul style="color: #64748b; margin: 0; padding-left: 20px;">
              <li>We'll review your project details</li>
              <li>A design consultant will contact you within 24 hours</li>
              <li>We'll schedule a complimentary consultation</li>
              <li>Begin planning your dream space transformation</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/portfolio" 
               style="display: inline-block; background: #B79A6B; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">
              View Our Portfolio
            </a>
          </div>
          
          <div style="border-top: 1px solid #e6e4de; padding-top: 20px; margin-top: 30px;">
            <p style="color: #64748b; font-size: 14px; text-align: center; margin: 0;">
              <strong>Questions?</strong> Call us at (707) 555-0123 or email hello@northbaykb.com
            </p>
          </div>
        </div>
      </div>
    `,
    text: `
Thank you for contacting North Bay Kitchen & Bath!

Hi ${data.firstName},

We've received your message and appreciate your interest in North Bay Kitchen & Bath. Our design team will review your inquiry and respond within 24 hours.

What's Next:
- We'll review your project details
- A design consultant will contact you within 24 hours  
- We'll schedule a complimentary consultation
- Begin planning your dream space transformation

Questions? Call us at (707) 555-0123 or email hello@northbaykb.com

Best regards,
North Bay Kitchen & Bath Team
    `
  })
};

// Email sending function with fallback
export async function sendEmail(
  to: string | string[],
  subject: string,
  html: string,
  text: string,
  from?: string
) {
  const defaultFrom = from || 'North Bay Kitchen & Bath <hello@northbaykb.com>';
  
  try {
    // Try Resend first (if API key is available)
    if (process.env.RESEND_API_KEY) {
      const result = await resend.emails.send({
        from: defaultFrom,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        text,
      });
      
      console.log('Email sent via Resend:', result);
      return { success: true, provider: 'resend', result };
    }
    
    // Fallback to SMTP
    if (process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
      const result = await smtpTransporter.sendMail({
        from: defaultFrom,
        to: Array.isArray(to) ? to.join(', ') : to,
        subject,
        html,
        text,
      });
      
      console.log('Email sent via SMTP:', result);
      return { success: true, provider: 'smtp', result };
    }
    
    // No email service configured
    console.warn('No email service configured. Email not sent.');
    return { success: false, error: 'No email service configured' };
    
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Contact form handler
export async function sendContactFormEmails(data: ContactFormData) {
  const internalSubject = `New Contact Form Submission - ${data.firstName} ${data.lastName}`;
  const customerSubject = 'Thank you for contacting North Bay Kitchen & Bath';
  
  const internalHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #212A3E;">New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      ${data.serviceType ? `<p><strong>Service Type:</strong> ${data.serviceType}</p>` : ''}
      ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ''}
      ${data.timeline ? `<p><strong>Timeline:</strong> ${data.timeline}</p>` : ''}
      ${data.subject ? `<p><strong>Subject:</strong> ${data.subject}</p>` : ''}
      <div style="background: #f8f0e5; padding: 15px; margin: 20px 0;">
        <h3>Message:</h3>
        <p>${data.message}</p>
      </div>
    </div>
  `;

  const customerHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #212A3E;">Thank You, ${data.firstName}!</h2>
      <p>We've received your message and will respond within 24 hours.</p>
      <p>Best regards,<br>North Bay Kitchen & Bath Team</p>
    </div>
  `;
  
  const results = await Promise.allSettled([
    sendEmail(
      process.env.CONTACT_EMAIL || 'hello@northbaykb.com',
      internalSubject,
      internalHtml,
      `New contact from ${data.firstName} ${data.lastName} (${data.email}): ${data.message}`
    ),
    sendEmail(
      data.email,
      customerSubject,
      customerHtml,
      `Thank you for contacting North Bay Kitchen & Bath! We'll respond within 24 hours.`
    )
  ]);
  
  return {
    internal: results[0].status === 'fulfilled' ? results[0].value : { success: false, error: 'Failed' },
    customer: results[1].status === 'fulfilled' ? results[1].value : { success: false, error: 'Failed' }
  };
}

// Design lead notification
export async function sendDesignLeadNotification(data: DesignLeadData) {
  const subject = `🏠 New Design Lead: ${data.firstName} ${data.lastName}`;
  
  const html = `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f5;">
      <div style="background: linear-gradient(135deg, #B79A6B 0%, #d4af37 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 600; text-align: center;">🎉 NEW DESIGN LEAD</h1>
        <p style="margin: 10px 0 0 0; text-align: center; opacity: 0.9;">High-value prospect inquiry</p>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h2 style="color: #212A3E; margin-top: 0; border-bottom: 2px solid #B79A6B; padding-bottom: 10px;">Lead Information</h2>
        
        <div style="display: grid; gap: 15px; margin-bottom: 25px;">
          <div><strong style="color: #212A3E;">Name:</strong> ${data.firstName} ${data.lastName}</div>
          <div><strong style="color: #212A3E;">Email:</strong> <a href="mailto:${data.email}" style="color: #B79A6B;">${data.email}</a></div>
          ${data.phone ? `<div><strong style="color: #212A3E;">Phone:</strong> <a href="tel:${data.phone}" style="color: #B79A6B;">${data.phone}</a></div>` : ''}
          ${data.projectType ? `<div><strong style="color: #212A3E;">Project Type:</strong> ${data.projectType}</div>` : ''}
          ${data.budget ? `<div><strong style="color: #212A3E;">Budget:</strong> ${data.budget}</div>` : ''}
          ${data.timeline ? `<div><strong style="color: #212A3E;">Timeline:</strong> ${data.timeline}</div>` : ''}
        </div>
        
        <div style="background: #f8f0e5; padding: 20px; border-radius: 8px; border-left: 4px solid #B79A6B;">
          <h3 style="color: #212A3E; margin-top: 0;">Project Details</h3>
          <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/employee/leads" 
             style="display: inline-block; background: #B79A6B; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; margin-right: 10px;">
            View in CRM
          </a>
          <a href="mailto:${data.email}" 
             style="display: inline-block; background: #212A3E; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600;">
            Reply to Lead
          </a>
        </div>
      </div>
    </div>
  `;
  
  return await sendEmail(
    [
      process.env.DESIGN_LEAD_EMAIL || 'leads@northbaykb.com',
      process.env.SALES_EMAIL || 'sales@northbaykb.com'
    ],
    subject,
    html,
    `New Design Lead: ${data.firstName} ${data.lastName}\nEmail: ${data.email}\nPhone: ${data.phone}\nProject: ${data.projectType}\nMessage: ${data.message}`
  );
} 