import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { BookingCreateSchema } from '@/lib/validation';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId');
    const assistantId = searchParams.get('assistantId');
    const status = searchParams.get('status');

    let bookings = await db.getBookings();

    if (customerId) {
      bookings = bookings.filter((b) => b.customerId === customerId);
    }
    if (assistantId) {
      bookings = bookings.filter((b) => b.assistantId === assistantId);
    }
    if (status) {
      bookings = bookings.filter((b) => b.status === status);
    }

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ success: false, error: 'Failed to retrieve bookings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const validation = BookingCreateSchema.safeParse(rawBody);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error.issues[0]?.message || 'Invalid booking request parameters'
        },
        { status: 400 }
      );
    }

    const session = await getSession(request);
    const validatedData = validation.data;

    const booking = await db.createBooking({
      categoryId: validatedData.categoryId,
      serviceLocation: validatedData.serviceLocation,
      destination: validatedData.destination,
      targetTime: validatedData.targetTime,
      notes: validatedData.notes,
      customerId: session?.userId || validatedData.customerId || 'usr-customer-1',
      customerName: session?.name || validatedData.customerName || 'Arun Varma',
      customerPhone: validatedData.customerPhone || '+91 98480 12345',
      customerEmail: session?.email || validatedData.customerEmail || 'customer@skipq.in'
    });

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ success: false, error: 'Failed to create booking' }, { status: 500 });
  }
}
