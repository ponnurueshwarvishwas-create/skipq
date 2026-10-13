import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const assistants = await db.getAssistants();
    return NextResponse.json({ success: true, assistants });
  } catch (error) {
    console.error('Error getting assistants:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { assistantId, isAvailable } = body;

    if (!assistantId) {
      return NextResponse.json({ success: false, error: 'Assistant ID required' }, { status: 400 });
    }

    const updated = await db.toggleAssistantAvailability(assistantId, Boolean(isAvailable));
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Assistant not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, assistant: updated });
  } catch (error) {
    console.error('Error updating assistant:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
