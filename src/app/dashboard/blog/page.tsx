import { Metadata } from 'next';
import DashboardShell from '@/components/dashboard/layout/DashboardShell';
import BlogManager from '@/components/dashboard/blog/BlogManager';

export const metadata: Metadata = {
  title: 'Blog Management | Northbay Kitchen & Bath',
  description: 'Manage blog posts and content',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardBlogPage() {
  return (
    <DashboardShell
      title="Blog Management"
      subtitle="Create and manage blog posts and content"
    >
      <BlogManager />
    </DashboardShell>
  );
} 