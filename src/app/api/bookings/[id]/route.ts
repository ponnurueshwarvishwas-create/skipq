import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { BookingUpdateSchema } from '@/lib/validation';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const booking = await db.getBookingById(id);

    if (!booking) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }

    // Phase 10 / Phase 8: Verify unauthorized users cannot access another customer's booking
    const session = await getSession(request);
    if (session && session.role === 'CUSTOMER' && session.userId !== booking.customerId) {
      return NextResponse.json(
        { success: false, error: 'Forbidden: You do not have permission to view this booking' },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error('Error getting booking:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const rawBody = await request.json();
    const validation = BookingUpdateSchema.safeParse(rawBody);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.issues[0]?.message || 'Invalid update payload' },
        { status: 400 }
      );
    }

    const booking = await db.getBookingById(id);
    if (!booking) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }

    const session = await getSession(request);
    const { action, status, note, updatedBy, assistantId, assistantName, reason } = validation.data;

    // 1. Handling ASSIGN Action & Duplicate Acceptance Prevention
    if (action === 'ASSIGN') {
      const targetAssistantId = assistantId || (session?.role === 'ASSISTANT' ? 'ast-1' : undefined);
      if (!targetAssistantId) {
        return NextResponse.json(
          { success: false, error: 'assistantId is required to accept or assign booking' },
          { status: 400 }
        );
      }

      // Check if already assigned to a DIFFERENT assistant
      if (
        (booking.status === 'ACCEPTED' || booking.status === 'IN_PROGRESS') &&
        booking.assistantId &&
        booking.assistantId !== targetAssistantId
      ) {
        return NextResponse.json(
          {
            success: false,
            error: 'Duplicate assignment rejected: Booking has already been accepted by another assistant.'
          },
          { status: 409 }
        );
      }

      // Check if already completed or cancelled
      if (booking.status === 'COMPLETED' || booking.status === 'CANCELLED') {
        return NextResponse.json(
          { success: false, error: `Cannot accept booking with terminal status ${booking.status}` },
          { status: 400 }
        );
      }

      const updatedBooking = await db.assignAssistant(
        id,
        targetAssistantId,
        assistantName || session?.name || 'Local Assistant'
      );
      return NextResponse.json({ success: true, booking: updatedBooking });
    }

    // 2. Handling CANCEL Action & Ownership Enforcement
    if (action === 'CANCEL') {
      if (booking.status === 'COMPLETED') {
        return NextResponse.json(
          { success: false, error: 'Cannot cancel an already completed booking' },
          { status: 400 }
        );
      }

      // If user session exists, verify caller is owner, assigned assistant, or admin
      if (session) {
        const isOwner = session.userId === booking.customerId;
        const isAssigned = session.userId === booking.assistant?.userId;
        const isAdmin = session.role === 'ADMIN';

        if (!isOwner && !isAssigned && !isAdmin) {
          return NextResponse.json(
            { success: false, error: 'Forbidden: You do not have permission to cancel this booking' },
            { status: 403 }
          );
        }
      }

      const updatedBooking = await db.cancelBooking(id, reason, updatedBy || session?.name || 'User');
      return NextResponse.json({ success: true, booking: updatedBooking });
    }

    // 3. Handling Generic Status Transitions & State Machine Validation
    if (status) {
      // Disallow transitions out of completed or cancelled
      if (booking.status === 'COMPLETED' && status !== 'COMPLETED') {
        return NextResponse.json(
          { success: false, error: 'Invalid transition: Cannot re-open a completed booking' },
          { status: 400 }
        );
      }
      if (booking.status === 'CANCELLED' && status !== 'CANCELLED') {
        return NextResponse.json(
          { success: false, error: 'Invalid transition: Cannot mutate a cancelled booking' },
          { status: 400 }
        );
      }

      const updatedBooking = await db.updateBookingStatus(
        id,
        status,
        note,
        updatedBy || session?.name || 'System Operator',
        assistantId
      );
      return NextResponse.json({ success: true, booking: updatedBooking });
    }

    return NextResponse.json(
      { success: false, error: 'No recognizable action or status provided' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
