import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyPassword, signSession } from '@/lib/auth';
import { UserLoginSchema } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const validation = UserLoginSchema.safeParse(rawBody);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.issues[0]?.message || 'Invalid login input' },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;
    const user = await db.getUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    let isValid = false;
    if (user.passwordHash) {
      isValid = verifyPassword(password, user.passwordHash);
    } else {
      // Seeded pilot demo accounts accept default password 'password123'
      isValid = password === 'password123';
    }

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const sessionToken = signSession({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    });

    const { passwordHash: _, ...sanitizedUser } = user;
    const response = NextResponse.json({ success: true, user: sanitizedUser });

    response.cookies.set('skipq_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 72 * 3600,
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Login failed due to a server error' },
      { status: 500 }
    );
  }
}
