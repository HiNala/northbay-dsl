/*
  Warnings:

  - The `status` column on the `design_leads` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `priority` column on the `design_leads` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `projects` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('DRAFT', 'PENDING_APPROVAL', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('PLANNING', 'IN_PROGRESS', 'COMPLETED', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST');

-- CreateEnum
CREATE TYPE "LeadPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "DashboardRole" AS ENUM ('EMPLOYEE', 'MANAGER', 'ADMIN');

-- AlterTable
ALTER TABLE "design_leads" ADD COLUMN     "lastContact" TIMESTAMP(3),
ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 50,
DROP COLUMN "status",
ADD COLUMN     "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
DROP COLUMN "priority",
ADD COLUMN     "priority" "LeadPriority" NOT NULL DEFAULT 'MEDIUM';

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "approvedBy" UUID,
ADD COLUMN     "approvedByUser" UUID,
ADD COLUMN     "availability" TEXT,
ADD COLUMN     "createdBy" UUID,
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "leadTime" TEXT,
ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "status",
ADD COLUMN     "status" "ProductStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "managedBy" UUID,
ADD COLUMN     "progress" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "status",
ADD COLUMN     "status" "ProjectStatus" NOT NULL DEFAULT 'PLANNING';

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_approvedByUser_fkey" FOREIGN KEY ("approvedByUser") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_managedBy_fkey" FOREIGN KEY ("managedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
