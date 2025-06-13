import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions, isAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// GET /api/admin/users/[id] - Get single user
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || !isAdmin(session.user)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      include: {
        Profile: true,
        roles: {
          include: {
            Role: true
          }
        },
        _count: {
          select: {
            Orders: true,
            DesignLeads: true,
            Wishlists: true,
            Carts: true,
            BlogPosts: true
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Remove sensitive data
    const { password, passwordResetToken, twoFactorSecret, ...safeUser } = user;

    return NextResponse.json(safeUser);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/users/[id] - Update user
const updateUserSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  fullName: z.string().optional(),
  phone: z.string().optional(),
  status: z.enum(['active', 'inactive', 'suspended', 'pending']).optional(),
  roleIds: z.array(z.string()).optional(),
  emailVerified: z.boolean().optional(),
  twoFactorEnabled: z.boolean().optional()
});

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || !isAdmin(session.user)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json();
    const validatedData = updateUserSchema.parse(body);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: params.id },
      include: { Profile: true }
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if email is being changed and already exists
    if (validatedData.email && validatedData.email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email: validatedData.email }
      });

      if (emailExists) {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 400 }
        );
      }
    }

    // Prepare update data
    const updateData: any = {};

    // Basic user fields
    if (validatedData.email) updateData.email = validatedData.email;
    if (validatedData.status) updateData.status = validatedData.status;
    if (validatedData.emailVerified !== undefined) {
      updateData.emailVerified = validatedData.emailVerified;
      updateData.emailVerifiedAt = validatedData.emailVerified ? new Date() : null;
    }
    if (validatedData.twoFactorEnabled !== undefined) {
      updateData.twoFactorEnabled = validatedData.twoFactorEnabled;
    }

    // Hash password if provided
    if (validatedData.password) {
      updateData.password = await bcrypt.hash(validatedData.password, 12);
    }

    // Profile updates
    if (validatedData.fullName !== undefined || validatedData.phone !== undefined) {
      if (existingUser.Profile) {
        updateData.Profile = {
          update: {}
        };
        if (validatedData.fullName !== undefined) updateData.Profile.update.fullName = validatedData.fullName;
        if (validatedData.phone !== undefined) updateData.Profile.update.phone = validatedData.phone;
      } else {
        updateData.Profile = {
          create: {
            fullName: validatedData.fullName,
            phone: validatedData.phone
          }
        };
      }
    }

    // Role updates
    if (validatedData.roleIds && validatedData.roleIds.length > 0) {
      updateData.roles = {
        deleteMany: {},
        create: validatedData.roleIds.map(roleId => ({
          roleId
        }))
      };
    }

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
      include: {
        Profile: true,
        roles: {
          include: {
            Role: true
          }
        }
      }
    });

    // Remove sensitive data
    const { password, passwordResetToken, twoFactorSecret, ...safeUser } = updatedUser;

    return NextResponse.json(safeUser);
  } catch (error) {
    console.error('Error updating user:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users/[id] - Delete user (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || !isAdmin(session.user)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url);
    const hard = searchParams.get('hard') === 'true';

    if (hard) {
      // Hard delete - completely remove user and related data
      await prisma.user.delete({
        where: { id: params.id }
      });

      return NextResponse.json({ 
        message: 'User permanently deleted' 
      });
    } else {
      // Soft delete - mark as deleted
      const updatedUser = await prisma.user.update({
        where: { id: params.id },
        data: {
          deletedAt: new Date(),
          status: 'inactive',
          email: null // Clear email to allow reuse
        }
      });

      return NextResponse.json({ 
        message: 'User deactivated',
        user: { id: updatedUser.id, deletedAt: updatedUser.deletedAt }
      });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
} 