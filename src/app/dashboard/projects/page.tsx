import { Metadata } from 'next';
import DashboardShell from '@/components/dashboard/layout/DashboardShell';
import ProjectsManager from '@/components/dashboard/projects/ProjectsManager';

export const metadata: Metadata = {
  title: 'Projects Management | Northbay Kitchen & Bath',
  description: 'Manage your project portfolio and gallery',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardProjectsPage() {
  return (
    <DashboardShell
      title="Projects Management"
      subtitle="Manage your portfolio, case studies, and project gallery"
    >
      <ProjectsManager />
    </DashboardShell>
  );
} 