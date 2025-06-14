import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function seedDashboardUsers() {
  console.log('🌱 Seeding dashboard users and roles...');

  try {
    // Create roles if they don't exist
    const adminRole = await prisma.role.upsert({
      where: { name: 'admin' },
      update: {},
      create: {
        name: 'admin',
        displayName: 'Administrator',
        level: 100,
        permissions: [
          'products.manage',
          'projects.manage',
          'leads.manage',
          'users.manage',
          'settings.manage',
          'analytics.view'
        ]
      }
    });

    const managerRole = await prisma.role.upsert({
      where: { name: 'manager' },
      update: {},
      create: {
        name: 'manager',
        displayName: 'Manager',
        level: 80,
        permissions: [
          'products.manage',
          'projects.manage',
          'leads.manage',
          'analytics.view'
        ]
      }
    });

    const employeeRole = await prisma.role.upsert({
      where: { name: 'employee' },
      update: {},
      create: {
        name: 'employee',
        displayName: 'Employee',
        level: 50,
        permissions: [
          'products.view',
          'projects.view',
          'leads.view'
        ]
      }
    });

    // Hash password for all demo users
    const hashedPassword = await bcrypt.hash('demo123', 12);

    // Create demo users
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@northbay.com' },
      update: {
        password: hashedPassword,
        emailVerified: true,
      },
      create: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'admin@northbay.com',
        password: hashedPassword,
        emailVerified: true,
        status: 'active',
        Profile: {
          create: {
            fullName: 'Sarah Chen',
            phone: '(555) 123-4567',
            avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b494?w=150&h=150&fit=crop&crop=face'
          }
        }
      }
    });

    const managerUser = await prisma.user.upsert({
      where: { email: 'manager@northbay.com' },
      update: {
        password: hashedPassword,
        emailVerified: true,
      },
      create: {
        id: '123e4567-e89b-12d3-a456-426614174001',
        email: 'manager@northbay.com',
        password: hashedPassword,
        emailVerified: true,
        status: 'active',
        Profile: {
          create: {
            fullName: 'Mike Johnson',
            phone: '(555) 123-4568',
            avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
          }
        }
      }
    });

    const employeeUser = await prisma.user.upsert({
      where: { email: 'employee@northbay.com' },
      update: {
        password: hashedPassword,
        emailVerified: true,
      },
      create: {
        id: '123e4567-e89b-12d3-a456-426614174002',
        email: 'employee@northbay.com',
        password: hashedPassword,
        emailVerified: true,
        status: 'active',
        Profile: {
          create: {
            fullName: 'Emma Davis',
            phone: '(555) 123-4569',
            avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
          }
        }
      }
    });

    // Assign roles to users
    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: adminUser.id,
          roleId: adminRole.id
        }
      },
      update: {},
      create: {
        userId: adminUser.id,
        roleId: adminRole.id
      }
    });

    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: managerUser.id,
          roleId: managerRole.id
        }
      },
      update: {},
      create: {
        userId: managerUser.id,
        roleId: managerRole.id
      }
    });

    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: employeeUser.id,
          roleId: employeeRole.id
        }
      },
      update: {},
      create: {
        userId: employeeUser.id,
        roleId: employeeRole.id
      }
    });

    console.log('✅ Dashboard users seeded successfully!');
    console.log('');
    console.log('📋 Demo Credentials:');
    console.log('👑 Admin: admin@northbay.com / demo123');
    console.log('👨‍💼 Manager: manager@northbay.com / demo123');
    console.log('👩‍💼 Employee: employee@northbay.com / demo123');
    console.log('');

    return { adminUser, managerUser, employeeUser };
  } catch (error) {
    console.error('❌ Error seeding dashboard users:', error);
    throw error;
  }
}

// If this file is run directly, execute the seeding
if (require.main === module) {
  seedDashboardUsers()
    .then(() => {
      console.log('🎉 Seeding completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Seeding failed:', error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
