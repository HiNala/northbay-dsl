import { Metadata } from 'next';
import DashboardShell from '@/components/dashboard/layout/DashboardShell';
import AIPromptsManager from '@/components/dashboard/settings/AIPromptsManager';

export const metadata: Metadata = {
  title: 'AI Prompts Settings | Northbay Kitchen & Bath',
  description: 'Configure AI prompts for content generation',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AIPromptsPage() {
  return (
    <DashboardShell
      title="AI Content Prompts"
      subtitle="Configure AI system prompts for product descriptions, project content, and more"
    >
      <AIPromptsManager />
    </DashboardShell>
  );
} 