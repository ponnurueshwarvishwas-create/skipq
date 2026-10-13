import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword, signSession } from '@/lib/auth';
import { UserRegisterSchema } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const validation = UserRegisterSchema.safeParse(rawBody);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.issues[0]?.message || 'Invalid registration input' },
        { status: 400 }
      );
    }

    if ((rawBody?.role as string)?.toUpperCase() === 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Self-granting ADMIN permissions is strictly forbidden' },
        { status: 403 }
      );
    }

    const { name, email, password, phone, role } = validation.data;

    const existing = await db.getUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    const passwordHash = hashPassword(password);
    const user = await db.createUser({
      name,
      email,
      passwordHash,
      phone,
      role
    });

    const sessionToken = signSession({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    });

    const response = NextResponse.json({ success: true, user }, { status: 201 });

    response.cookies.set('skipq_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 72 * 3600,
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Registration failed due to a server error' },
      { status: 500 }
    );
  }
}
