import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const session = await getSession(request);

    if (!session) {
      return NextResponse.json(
        { success: false, authenticated: false, message: 'No active session' },
        { status: 401 }
      );
    }

    const user = await db.getUserById(session.userId);
    if (!user) {
      return NextResponse.json(
        { success: false, authenticated: false, message: 'User not found' },
        { status: 404 }
      );
    }

    const assistant = session.role === 'ASSISTANT' ? (await db.getAssistantById(user.id)) || null : null;
    const { passwordHash: _, ...sanitizedUser } = user as any;

    return NextResponse.json({
      success: true,
      authenticated: true,
      user: sanitizedUser,
      assistant
    });
  } catch (error) {
    console.error('Error fetching session user:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
