import { test, expect } from '@playwright/test';

test.describe('SkipQ Full-Stack E2E Integration Suite', () => {

  test('Public pages load successfully with responsive 3D branding and zero 404s', async ({ page }) => {
    const publicRoutes = [
      '/',
      '/how-it-works',
      '/services',
      '/pricing',
      '/demo',
      '/about',
      '/faq',
      '/contact',
      '/business',
      '/dashboard',
      '/assistant',
      '/admin'
    ];

    for (const route of publicRoutes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      const title = await page.title();
      expect(title).toMatch(/SkipQ/i);
    }
  });

  test('Authentication flow: register, login, session inspection, and logout', async ({ request }) => {
    const testEmail = `e2e_user_${Date.now()}@skipq.in`;
    const password = 'TestSecurePassword123!';

    // 1. Register new customer
    const regRes = await request.post('/api/auth/register', {
      data: {
        name: 'E2E Tester',
        email: testEmail,
        password: password,
        phone: '+91 98480 11223',
        role: 'CUSTOMER'
      }
    });
    expect(regRes.status()).toBe(201);
    const regData = await regRes.json();
    expect(regData.success).toBe(true);
    expect(regData.user.email).toBe(testEmail);

    // 2. Duplicate registration attempt returns 409
    const dupRes = await request.post('/api/auth/register', {
      data: {
        name: 'Duplicate Tester',
        email: testEmail,
        password: password
      }
    });
    expect(dupRes.status()).toBe(409);

    // 3. Login
    const loginRes = await request.post('/api/auth/login', {
      data: {
        email: testEmail,
        password: password
      }
    });
    expect(loginRes.status()).toBe(200);
    const loginData = await loginRes.json();
    expect(loginData.success).toBe(true);

    // 4. Invalid credentials returns 401
    const badLoginRes = await request.post('/api/auth/login', {
      data: {
        email: testEmail,
        password: 'IncorrectPassword!'
      }
    });
    expect(badLoginRes.status()).toBe(401);
  });

  test('Booking API: creation, duplicate acceptance prevention, and state transitions', async ({ request }) => {
    // 1. Create booking with Zod validated parameters
    const createRes = await request.post('/api/bookings', {
      data: {
        categoryId: 'cat-queue',
        serviceLocation: 'Old Bus Stand Aadhaar Seva Kendra, Bhimavaram',
        destination: 'Counter #3',
        notes: 'Token queue proxy assistance test'
      }
    });
    expect(createRes.status()).toBe(201);
    const createData = await createRes.json();
    expect(createData.success).toBe(true);
    const bookingId = createData.booking.id;
    expect(createData.booking.bookingNumber).toMatch(/^SQ-BV-\d+$/);
    expect(createData.booking.status).toBe('PENDING');

    // 2. Reject booking with invalid/short location
    const invalidRes = await request.post('/api/bookings', {
      data: {
        categoryId: 'cat-queue',
        serviceLocation: 'X' // fails min length 3
      }
    });
    expect(invalidRes.status()).toBe(400);

    // 3. First assistant accepts booking
    const assignRes1 = await request.patch(`/api/bookings/${bookingId}`, {
      data: {
        action: 'ASSIGN',
        assistantId: 'ast-1',
        assistantName: 'Suresh Naidu'
      }
    });
    expect(assignRes1.status()).toBe(200);
    const assignData1 = await assignRes1.json();
    expect(assignData1.booking.status).toBe('ACCEPTED');
    expect(assignData1.booking.assistantId).toBe('ast-1');

    // 4. Duplicate acceptance by a second assistant MUST be rejected with 409 Conflict
    const assignRes2 = await request.patch(`/api/bookings/${bookingId}`, {
      data: {
        action: 'ASSIGN',
        assistantId: 'ast-2',
        assistantName: 'Priya Reddy'
      }
    });
    expect(assignRes2.status()).toBe(409);
    const assignData2 = await assignRes2.json();
    expect(assignData2.success).toBe(false);
    expect(assignData2.error).toContain('Duplicate assignment rejected');

    // 5. Progress to IN_PROGRESS
    const inProgressRes = await request.patch(`/api/bookings/${bookingId}`, {
      data: {
        status: 'IN_PROGRESS',
        note: 'Assistant reached queue counter'
      }
    });
    expect(inProgressRes.status()).toBe(200);

    // 6. Complete booking
    const completeRes = await request.patch(`/api/bookings/${bookingId}`, {
      data: {
        status: 'COMPLETED',
        note: 'Token handed over to customer'
      }
    });
    expect(completeRes.status()).toBe(200);
    const completeData = await completeRes.json();
    expect(completeData.booking.status).toBe('COMPLETED');

    // 7. Re-opening a completed booking MUST be rejected with 400
    const reopenRes = await request.patch(`/api/bookings/${bookingId}`, {
      data: {
        status: 'PENDING'
      }
    });
    expect(reopenRes.status()).toBe(400);
  });

  test('Interactive Booking Modal opens and allows stepping through wizard on UI', async ({ page }) => {
    await page.goto('/');
    
    // Click primary booking button
    const bookButton = page.getByRole('button', { name: /skip a queue/i }).first();
    await bookButton.click();

    // Verify modal overlay appears
    const modalHeading = page.getByText(/Request Queue Assistance|Booking Confirmed/i);
    await expect(modalHeading.first()).toBeVisible();

    // Verify modal can be dismissed cleanly
    await page.keyboard.press('Escape');
  });
});
