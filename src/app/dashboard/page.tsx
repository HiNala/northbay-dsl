import { Metadata } from 'next';
import DashboardShell from '@/components/dashboard/layout/DashboardShell';
import AnalyticsOverview from '@/components/dashboard/analytics/AnalyticsOverview';

export const metadata: Metadata = {
  title: 'Dashboard | Northbay Kitchen & Bath',
  description: 'Internal dashboard for managing products, projects, and customers',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return (
    <DashboardShell
      title="Dashboard Overview"
      subtitle="Welcome back! Here's what's happening with your business."
    >
      <AnalyticsOverview />
    </DashboardShell>
  );
} 