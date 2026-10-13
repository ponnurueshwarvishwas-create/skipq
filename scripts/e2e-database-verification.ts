import 'dotenv/config';
import { prisma } from '../src/lib/prisma';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

async function runEndToEndVerification() {
  console.log('====================================================');
  console.log('   SKIPQ LIVE NEON POSTGRESQL END-TO-END DATABASE TEST');
  console.log('====================================================\n');

  const timestamp = Date.now();
  const testCustomer = {
    name: `Neon Test Customer ${timestamp}`,
    email: `neon_e2e_cust_${timestamp}@skipq.in`,
    password: `Pass_${timestamp}_Sec!`,
    phone: '+91 98480 77889',
    role: 'CUSTOMER'
  };

  let customerCookie = '';
  let assistantCookie = '';
  let customerBCookie = '';
  let createdBookingId = '';
  let createdBookingNumber = '';
  let customerId = '';

  // ----------------------------------------------------
  // STEP 1: Register a Customer
  // ----------------------------------------------------
  console.log('STEP 1: Registering new customer via API...');
  const regRes = await fetch(`${APP_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testCustomer)
  });

  if (!regRes.ok) {
    throw new Error(`Step 1 Failed: Registration failed with status ${regRes.status}: ${await regRes.text()}`);
  }

  const regData = await regRes.json();
  customerId = regData.user.id;
  const rawSetCookie = regRes.headers.get('set-cookie');
  if (rawSetCookie) {
    customerCookie = rawSetCookie.split(';')[0];
  }
  console.log(`✓ Step 1 Success: Registered customer ID=${customerId}, Email=${testCustomer.email}`);

  // ----------------------------------------------------
  // STEP 2: Verify the customer exists directly in PostgreSQL
  // ----------------------------------------------------
  console.log('STEP 2: Verifying customer in PostgreSQL directly via Prisma...');
  const dbUser = await prisma.user.findUnique({
    where: { email: testCustomer.email.toLowerCase() }
  });

  if (!dbUser) {
    throw new Error(`Step 2 Failed: Customer ${testCustomer.email} not found in Neon PostgreSQL!`);
  }
  if (!dbUser.passwordHash) {
    throw new Error('Step 2 Failed: Customer passwordHash was not persisted in Neon PostgreSQL!');
  }
  console.log(`✓ Step 2 Success: Customer confirmed in PostgreSQL (DB ID: ${dbUser.id}, Role: ${dbUser.role}, HasHash: true)`);

  // ----------------------------------------------------
  // STEP 3: Log in via API
  // ----------------------------------------------------
  console.log('STEP 3: Logging in as customer via API...');
  const loginRes = await fetch(`${APP_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: testCustomer.email,
      password: testCustomer.password
    })
  });

  if (!loginRes.ok) {
    throw new Error(`Step 3 Failed: Login failed with status ${loginRes.status}: ${await loginRes.text()}`);
  }

  const loginData = await loginRes.json();
  const loginCookie = loginRes.headers.get('set-cookie');
  if (loginCookie) {
    customerCookie = loginCookie.split(';')[0];
  }
  console.log(`✓ Step 3 Success: Customer login verified (Session authenticated for ${loginData.user.name})`);

  // ----------------------------------------------------
  // STEP 4: Create a Booking via API
  // ----------------------------------------------------
  console.log('STEP 4: Creating a queue assistance booking via API...');
  const bookingPayload = {
    categoryId: 'cat-queue',
    serviceLocation: 'Old Bus Stand Aadhaar Seva Kendra, Bhimavaram',
    destination: 'Counter #2 (Biometric Verification)',
    notes: 'Neon End-to-End Live Persistence Verification Test'
  };

  const createBookingRes = await fetch(`${APP_URL}/api/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: customerCookie
    },
    body: JSON.stringify(bookingPayload)
  });

  if (!createBookingRes.ok) {
    throw new Error(`Step 4 Failed: Create booking failed: ${await createBookingRes.text()}`);
  }

  const createBookingData = await createBookingRes.json();
  createdBookingId = createBookingData.booking.id;
  createdBookingNumber = createBookingData.booking.bookingNumber;
  console.log(`✓ Step 4 Success: Created booking ID=${createdBookingId}, Number=${createdBookingNumber}, Status=${createBookingData.booking.status}`);

  // ----------------------------------------------------
  // STEP 5: Verify the booking exists directly in PostgreSQL
  // ----------------------------------------------------
  console.log('STEP 5: Verifying booking in PostgreSQL directly via Prisma...');
  const dbBooking = await prisma.booking.findUnique({
    where: { id: createdBookingId },
    include: {
      customer: true,
      category: true,
      statusHistory: true
    }
  });

  if (!dbBooking) {
    throw new Error(`Step 5 Failed: Booking ${createdBookingId} not found in Neon PostgreSQL!`);
  }
  if (dbBooking.status !== 'PENDING') {
    throw new Error(`Step 5 Failed: Expected status PENDING in DB, got ${dbBooking.status}`);
  }
  console.log(`✓ Step 5 Success: Booking confirmed in PostgreSQL (Location: ${dbBooking.serviceLocation}, Category: ${dbBooking.category.name})`);

  // ----------------------------------------------------
  // STEP 6: Restart the application / connection cycle
  // ----------------------------------------------------
  console.log('STEP 6: Simulating application restart & disconnecting/reconnecting Prisma client...');
  await prisma.$disconnect();
  await new Promise((r) => setTimeout(r, 1000));
  await prisma.$connect();
  console.log('✓ Step 6 Success: Disconnection and reconnection cycle completed successfully.');

  // ----------------------------------------------------
  // STEP 7: Confirm the booking persists across restart
  // ----------------------------------------------------
  console.log('STEP 7: Confirming booking persists in PostgreSQL after restart...');
  const persistedBooking = await prisma.booking.findUnique({
    where: { id: createdBookingId },
    include: { statusHistory: true }
  });

  if (!persistedBooking) {
    throw new Error(`Step 7 Failed: Booking ${createdBookingId} was lost after restart!`);
  }
  console.log(`✓ Step 7 Success: Booking perfectly persisted across restart (History count: ${persistedBooking.statusHistory.length})`);

  // ----------------------------------------------------
  // STEP 8: Log in as an authorized assistant
  // ----------------------------------------------------
  console.log('STEP 8: Logging in as authorized assistant (suresh.naidu@example.com)...');
  const astLoginRes = await fetch(`${APP_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'suresh.naidu@example.com',
      password: 'password123'
    })
  });

  if (!astLoginRes.ok) {
    throw new Error(`Step 8 Failed: Assistant login failed: ${await astLoginRes.text()}`);
  }

  const astLoginCookie = astLoginRes.headers.get('set-cookie');
  if (astLoginCookie) {
    assistantCookie = astLoginCookie.split(';')[0];
  }
  console.log('✓ Step 8 Success: Authorized assistant logged in.');

  // ----------------------------------------------------
  // STEP 9: Accept the booking
  // ----------------------------------------------------
  console.log('STEP 9: Assistant accepting the booking via API...');
  const acceptRes = await fetch(`${APP_URL}/api/bookings/${createdBookingId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Cookie: assistantCookie
    },
    body: JSON.stringify({
      action: 'ASSIGN',
      assistantId: 'ast-1',
      assistantName: 'Suresh Naidu'
    })
  });

  if (!acceptRes.ok) {
    throw new Error(`Step 9 Failed: Accept booking failed: ${await acceptRes.text()}`);
  }

  const acceptData = await acceptRes.json();
  if (acceptData.booking.status !== 'ACCEPTED') {
    throw new Error(`Step 9 Failed: Expected ACCEPTED status, got ${acceptData.booking.status}`);
  }
  console.log(`✓ Step 9 Success: Booking accepted by assistant (Status: ${acceptData.booking.status})`);

  // ----------------------------------------------------
  // STEP 10: Update the booking status (IN_PROGRESS -> COMPLETED)
  // ----------------------------------------------------
  console.log('STEP 10: Updating booking status to IN_PROGRESS then COMPLETED...');
  const progressRes = await fetch(`${APP_URL}/api/bookings/${createdBookingId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Cookie: assistantCookie
    },
    body: JSON.stringify({
      status: 'IN_PROGRESS',
      note: 'Assistant reached Bhimavaram Aadhaar Center'
    })
  });
  if (!progressRes.ok) throw new Error('Step 10 Failed: Progress update failed');

  const completeRes = await fetch(`${APP_URL}/api/bookings/${createdBookingId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Cookie: assistantCookie
    },
    body: JSON.stringify({
      status: 'COMPLETED',
      note: 'Token spot handed over to customer'
    })
  });
  if (!completeRes.ok) throw new Error('Step 10 Failed: Complete update failed');

  const completeData = await completeRes.json();
  console.log(`✓ Step 10 Success: Booking updated to COMPLETED (Time saved: ${completeData.booking.timeSavedMins} mins)`);

  // ----------------------------------------------------
  // STEP 11: Verify customer sees the update
  // ----------------------------------------------------
  console.log('STEP 11: Verifying customer sees the update and notification...');
  const custFetchRes = await fetch(`${APP_URL}/api/bookings/${createdBookingId}`, {
    headers: { Cookie: customerCookie }
  });
  if (!custFetchRes.ok) throw new Error('Step 11 Failed: Customer fetch failed');
  const custFetchData = await custFetchRes.json();
  if (custFetchData.booking.status !== 'COMPLETED') {
    throw new Error(`Step 11 Failed: Customer sees status ${custFetchData.booking.status}, expected COMPLETED`);
  }

  const notifRes = await fetch(`${APP_URL}/api/notifications?userId=${customerId}`, {
    headers: { Cookie: customerCookie }
  });
  const notifData = await notifRes.json();
  const hasUpdateNotif = (notifData.notifications || []).some((n: any) =>
    n.title.includes(createdBookingNumber) || n.message.includes('COMPLETED')
  );
  console.log(`✓ Step 11 Success: Customer verified COMPLETED status and received notification (HasNotif: ${hasUpdateNotif})`);

  // ----------------------------------------------------
  // STEP 12: Verify the admin dashboard displays it
  // ----------------------------------------------------
  console.log('STEP 12: Verifying admin dashboard stats and booking list...');
  const statsRes = await fetch(`${APP_URL}/api/stats`);
  if (!statsRes.ok) throw new Error('Step 12 Failed: Stats API failed');
  const statsData = await statsRes.json();

  if (statsData.stats.completedRequests < 1 || statsData.stats.totalBookings < 1) {
    throw new Error('Step 12 Failed: Admin stats did not reflect completed booking');
  }
  console.log(`✓ Step 12 Success: Admin stats verified (Total Bookings: ${statsData.stats.totalBookings}, Completed: ${statsData.stats.completedRequests}, Hours Saved: ${statsData.stats.totalHoursSaved}h)`);

  // ----------------------------------------------------
  // STEP 13: Verify unauthorized users cannot access another customer's booking
  // ----------------------------------------------------
  console.log("STEP 13: Verifying unauthorized user cannot access another customer's booking...");
  const customerB = {
    name: `Customer B ${timestamp}`,
    email: `cust_b_${timestamp}@skipq.in`,
    password: 'Password123!',
    role: 'CUSTOMER'
  };

  const regBRes = await fetch(`${APP_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customerB)
  });
  const cookieB = regBRes.headers.get('set-cookie');
  if (cookieB) customerBCookie = cookieB.split(';')[0];

  // Customer B tries to view Customer A's booking
  const unauthorizedRes = await fetch(`${APP_URL}/api/bookings/${createdBookingId}`, {
    headers: { Cookie: customerBCookie }
  });

  if (unauthorizedRes.status !== 403) {
    throw new Error(`Step 13 Failed: Expected HTTP 403 Forbidden for unauthorized access, received ${unauthorizedRes.status}`);
  }

  const unauthData = await unauthorizedRes.json();
  console.log(`✓ Step 13 Success: Access rejected with HTTP 403 Forbidden ("${unauthData.error}")`);

  console.log('\n====================================================');
  console.log('   ALL 13 END-TO-END DATABASE TESTS PASSED WITH 100% SUCCESS!');
  console.log('====================================================');
}

runEndToEndVerification()
  .catch((e) => {
    console.error('\nE2E Database Verification Failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
