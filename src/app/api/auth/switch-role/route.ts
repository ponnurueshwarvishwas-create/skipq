import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession, signSession } from '@/lib/auth';
import { UserRole } from '@/types';

export async function POST(request: Request) {
  try {
    const { role } = await request.json();

    if (!role || !['CUSTOMER', 'ASSISTANT', 'ADMIN'].includes(role)) {
      return NextResponse.json({ success: false, error: 'Invalid role' }, { status: 400 });
    }

    if (role === 'ADMIN' && process.env.NODE_ENV === 'production') {
      const currentSession = await getSession(request);
      if (!currentSession || currentSession.role !== 'ADMIN') {
        return NextResponse.json(
          { success: false, error: 'Unauthorized: Admin role elevation is restricted' },
          { status: 403 }
        );
      }
    }

    const allUsers = await db.getUsers();
    let targetUser = allUsers.find((u) => u.role === role);

    if (!targetUser) {
      return NextResponse.json({ success: false, error: `No user found for role ${role}` }, { status: 404 });
    }

    const token = signSession({
      userId: targetUser.id,
      email: targetUser.email,
      role: targetUser.role,
      name: targetUser.name
    });

    const response = NextResponse.json({
      success: true,
      user: targetUser,
      role: targetUser.role
    });

    response.cookies.set('skipq_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 72 * 3600,
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Role switch error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
