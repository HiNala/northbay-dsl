import { Metadata } from 'next';
import DashboardShell from '@/components/dashboard/layout/DashboardShell';
import LeadsManager from '@/components/dashboard/leads/LeadsManager';

export const metadata: Metadata = {
  title: 'Leads Management | Northbay Kitchen & Bath',
  description: 'Manage customer leads and sales pipeline',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLeadsPage() {
  return (
    <DashboardShell
      title="Leads Management"
      subtitle="Track customer inquiries and manage your sales pipeline"
    >
      <LeadsManager />
    </DashboardShell>
  );
} 