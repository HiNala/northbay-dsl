export interface LeadData {
  // Contact Information
  name: string;
  email: string;
  phone?: string;
  
  // Project Details
  projectType: string;
  timeline: string;
  budget: string;
  message?: string;
  
  // Location
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  
  // Lead Source & Marketing
  source: string; // 'website', 'google', 'referral', 'social', etc.
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  
  // Metadata
  timestamp: Date;
  leadId: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  priority: 'low' | 'medium' | 'high';
}

export interface LeadCaptureResult {
  success: boolean;
  leadId?: string;
  message: string;
  errors?: Record<string, string>;
}

// Lead validation schema
export const validateLeadData = (data: Partial<LeadData>): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  // Required fields validation
  if (!data.name?.trim()) {
    errors.name = 'Name is required';
  }

  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (data.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!data.projectType?.trim()) {
    errors.projectType = 'Project type is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Generate unique lead ID
export const generateLeadId = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `LEAD_${timestamp}_${random}`.toUpperCase();
};

// Determine lead priority based on project details
export const calculateLeadPriority = (data: Partial<LeadData>): 'low' | 'medium' | 'high' => {
  let score = 0;

  // Budget scoring
  switch (data.budget) {
    case 'over-200k':
      score += 3;
      break;
    case '100k-200k':
      score += 2;
      break;
    case '50k-100k':
      score += 1;
      break;
  }

  // Timeline scoring
  switch (data.timeline) {
    case 'asap':
      score += 2;
      break;
    case '1-3-months':
      score += 1;
      break;
  }

  // Project type scoring
  if (data.projectType === 'kitchen-bathroom' || data.projectType === 'luxury-remodel') {
    score += 1;
  }

  // Determine priority
  if (score >= 4) return 'high';
  if (score >= 2) return 'medium';
  return 'low';
};

// Lead capture service
export class LeadCaptureService {
  private static instance: LeadCaptureService;
  private leads: LeadData[] = [];

  private constructor() {
    // Load existing leads from localStorage
    this.loadLeadsFromStorage();
  }

  static getInstance(): LeadCaptureService {
    if (!LeadCaptureService.instance) {
      LeadCaptureService.instance = new LeadCaptureService();
    }
    return LeadCaptureService.instance;
  }

  private loadLeadsFromStorage(): void {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('nb-leads');
        if (stored) {
          this.leads = JSON.parse(stored).map((lead: LeadData & { timestamp: string }) => ({
            ...lead,
            timestamp: new Date(lead.timestamp)
          }));
        }
      } catch (error) {
        console.error('Error loading leads from storage:', error);
      }
    }
  }

  private saveLeadsToStorage(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('nb-leads', JSON.stringify(this.leads));
      } catch (error) {
        console.error('Error saving leads to storage:', error);
      }
    }
  }

  async captureLead(leadData: Partial<LeadData>): Promise<LeadCaptureResult> {
    try {
      // Validate lead data
      const validation = validateLeadData(leadData);
      if (!validation.isValid) {
        return {
          success: false,
          message: 'Please correct the errors below',
          errors: validation.errors
        };
      }

      // Generate lead ID and complete lead data
      const leadId = generateLeadId();
      const priority = calculateLeadPriority(leadData);
      
      const completeLead: LeadData = {
        name: leadData.name!,
        email: leadData.email!,
        phone: leadData.phone,
        projectType: leadData.projectType!,
        timeline: leadData.timeline || '',
        budget: leadData.budget || '',
        message: leadData.message,
        address: leadData.address,
        city: leadData.city,
        state: leadData.state,
        zipCode: leadData.zipCode,
        source: leadData.source || 'website',
        utm_source: leadData.utm_source,
        utm_medium: leadData.utm_medium,
        utm_campaign: leadData.utm_campaign,
        timestamp: new Date(),
        leadId,
        status: 'new',
        priority
      };

      // Store lead locally
      this.leads.push(completeLead);
      this.saveLeadsToStorage();

      // Send to CRM (would be actual API call in production)
      await this.sendToCRM(completeLead);

      // Send notification email (would be actual email service in production)
      await this.sendNotificationEmail(completeLead);

      // Send auto-response to lead (would be actual email service in production)
      await this.sendAutoResponse(completeLead);

      return {
        success: true,
        leadId,
        message: 'Thank you! We\'ll contact you within 24 hours to schedule your consultation.'
      };

    } catch (error) {
      console.error('Error capturing lead:', error);
      return {
        success: false,
        message: 'Something went wrong. Please try again or call us directly.'
      };
    }
  }

  private async sendToCRM(lead: LeadData): Promise<void> {
    // In production, this would integrate with your CRM
    // Examples: Salesforce, HubSpot, Pipedrive, etc.
    
    console.log('Sending lead to CRM:', {
      leadId: lead.leadId,
      name: lead.name,
      email: lead.email,
      priority: lead.priority,
      projectType: lead.projectType,
      budget: lead.budget
    });

    // Mock API call
    if (process.env.NODE_ENV === 'production') {
      // Example CRM integration
      // await fetch('/api/crm/leads', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(lead)
      // });
    }
  }

  private async sendNotificationEmail(lead: LeadData): Promise<void> {
    // In production, this would send email to sales team
    console.log('Sending notification email to sales team:', {
      leadId: lead.leadId,
      priority: lead.priority,
      name: lead.name,
      email: lead.email,
      projectType: lead.projectType
    });

    // Example: SendGrid, Mailgun, AWS SES, etc.
    if (process.env.NODE_ENV === 'production') {
      // await sendEmail({
      //   to: 'sales@northbaykitchenbath.com',
      //   subject: `New ${lead.priority} Priority Lead - ${lead.name}`,
      //   template: 'new-lead-notification',
      //   data: lead
      // });
    }
  }

  private async sendAutoResponse(lead: LeadData): Promise<void> {
    // In production, this would send auto-response email to lead
    console.log('Sending auto-response email to lead:', lead.email);

    // Example auto-response template
    if (process.env.NODE_ENV === 'production') {
      // await sendEmail({
      //   to: lead.email,
      //   subject: 'Thank you for your interest in North Bay Kitchen & Bath',
      //   template: 'lead-auto-response',
      //   data: {
      //     name: lead.name,
      //     leadId: lead.leadId,
      //     projectType: lead.projectType
      //   }
      // });
    }
  }

  // Get all leads (for admin dashboard)
  getLeads(): LeadData[] {
    return [...this.leads].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  // Get lead by ID
  getLeadById(leadId: string): LeadData | undefined {
    return this.leads.find(lead => lead.leadId === leadId);
  }

  // Update lead status
  updateLeadStatus(leadId: string, status: LeadData['status']): boolean {
    const leadIndex = this.leads.findIndex(lead => lead.leadId === leadId);
    if (leadIndex !== -1) {
      this.leads[leadIndex].status = status;
      this.saveLeadsToStorage();
      return true;
    }
    return false;
  }

  // Get leads statistics
  getLeadStats(): {
    total: number;
    new: number;
    contacted: number;
    qualified: number;
    converted: number;
    lost: number;
    highPriority: number;
    thisMonth: number;
  } {
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return {
      total: this.leads.length,
      new: this.leads.filter(l => l.status === 'new').length,
      contacted: this.leads.filter(l => l.status === 'contacted').length,
      qualified: this.leads.filter(l => l.status === 'qualified').length,
      converted: this.leads.filter(l => l.status === 'converted').length,
      lost: this.leads.filter(l => l.status === 'lost').length,
      highPriority: this.leads.filter(l => l.priority === 'high').length,
      thisMonth: this.leads.filter(l => l.timestamp >= thisMonth).length,
    };
  }
}

// Utility functions for lead tracking
export const trackLeadSource = (): Partial<LeadData> => {
  if (typeof window === 'undefined') return {};

  const urlParams = new URLSearchParams(window.location.search);
  const referrer = document.referrer;
  
  let source = 'direct';
  if (referrer.includes('google.com')) source = 'google';
  else if (referrer.includes('facebook.com')) source = 'facebook';
  else if (referrer.includes('instagram.com')) source = 'instagram';
  else if (referrer) source = 'referral';

  return {
    source,
    utm_source: urlParams.get('utm_source') || undefined,
    utm_medium: urlParams.get('utm_medium') || undefined,
    utm_campaign: urlParams.get('utm_campaign') || undefined,
  };
};

// Hook for easier React usage
export const useLeadCapture = () => {
  const service = LeadCaptureService.getInstance();

  const captureLead = async (leadData: Partial<LeadData>) => {
    const trackingData = trackLeadSource();
    return await service.captureLead({ ...leadData, ...trackingData });
  };

  return {
    captureLead,
    getLeads: () => service.getLeads(),
    getLeadStats: () => service.getLeadStats(),
    updateLeadStatus: (leadId: string, status: LeadData['status']) => 
      service.updateLeadStatus(leadId, status)
  };
}; 