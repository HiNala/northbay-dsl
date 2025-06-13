import { Metadata } from 'next';
import DashboardShell from '@/components/dashboard/layout/DashboardShell';
import ProductsManager from '@/components/dashboard/products/ProductsManager';

export const metadata: Metadata = {
  title: 'Products Management | Northbay Kitchen & Bath',
  description: 'Manage your product catalog and inventory',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardProductsPage() {
  return (
    <DashboardShell
      title="Products Management"
      subtitle="Manage your product catalog, inventory, and pricing"
    >
      <ProductsManager />
    </DashboardShell>
  );
} 