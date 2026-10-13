import { describe, it, expect } from 'vitest';
import { dbStore } from '@/lib/store';
import {
  hashPassword,
  verifyPassword,
  signSession,
  verifySessionToken
} from '@/lib/auth';
import {
  BookingCreateSchema,
  BookingUpdateSchema,
  UserRegisterSchema,
  UserLoginSchema
} from '@/lib/validation';

describe('SkipQ Full-Stack Security & Workflow Unit Tests', () => {

  describe('1. Authentication & Cryptography', () => {
    it('should hash and verify passwords correctly using PBKDF2', () => {
      const password = 'BhimavaramSecretPass2026!';
      const hash = hashPassword(password);
      expect(hash).toContain(':');
      expect(verifyPassword(password, hash)).toBe(true);
      expect(verifyPassword('WrongPassword', hash)).toBe(false);
    });

    it('should sign and verify session tokens with HMAC-SHA256 signature', () => {
      const payload = {
        userId: 'usr-test-1',
        email: 'test@skipq.in',
        role: 'CUSTOMER' as const,
        name: 'Test Customer'
      };
      const token = signSession(payload, 24);
      expect(token).toContain('.');

      const verified = verifySessionToken(token);
      expect(verified).not.toBeNull();
      expect(verified?.userId).toBe('usr-test-1');
      expect(verified?.email).toBe('test@skipq.in');
      expect(verified?.role).toBe('CUSTOMER');
    });

    it('should reject tampered session tokens', () => {
      const payload = {
        userId: 'usr-customer-1',
        email: 'hacker@example.com',
        role: 'CUSTOMER' as const,
        name: 'Hacker'
      };
      const token = signSession(payload, 24);
      const [data, sig] = token.split('.');
      const tamperedToken = `${data}.tampered_${sig}`;
      expect(verifySessionToken(tamperedToken)).toBeNull();
    });
  });

  describe('2. User Registration & Validation', () => {
    it('should validate user registration payload with Zod', () => {
      const valid = UserRegisterSchema.safeParse({
        name: 'Ravi Kumar',
        email: 'ravi.kumar@example.com',
        password: 'securepassword123',
        phone: '+91 98480 99999',
        role: 'CUSTOMER'
      });
      expect(valid.success).toBe(true);

      const invalid = UserRegisterSchema.safeParse({
        name: 'R',
        email: 'invalid-email',
        password: '123'
      });
      expect(invalid.success).toBe(false);
    });

    it('should disallow self-granting ADMIN role in registration schema', () => {
      const adminAttempt = UserRegisterSchema.safeParse({
        name: 'Admin Attempter',
        email: 'hackadmin@example.com',
        password: 'password123',
        role: 'ADMIN'
      });
      expect(adminAttempt.success).toBe(false);
    });

    it('should create user in PostgreSQL and prevent duplicate email registration', async () => {
      const testEmail = `user_${Date.now()}@example.com`;
      const user = await dbStore.createUser({
        name: 'New Tester',
        email: testEmail,
        passwordHash: hashPassword('password123'),
        role: 'CUSTOMER'
      });
      expect(user.id).toBeDefined();
      expect(user.email).toBe(testEmail);

      // Duplicate registration attempt should throw
      await expect(
        dbStore.createUser({
          name: 'Duplicate Tester',
          email: testEmail,
          role: 'CUSTOMER'
        })
      ).rejects.toThrow(/already exists/i);
    });
  });

  describe('3. Customer Booking Creation & Persistence', () => {
    it('should validate booking payload with Zod', () => {
      const valid = BookingCreateSchema.safeParse({
        categoryId: 'cat-queue',
        serviceLocation: 'Somaram Temple Counter, Bhimavaram',
        destination: 'Special Darshan Line #2',
        notes: 'Please arrive 15 minutes prior'
      });
      expect(valid.success).toBe(true);

      const invalid = BookingCreateSchema.safeParse({
        categoryId: '',
        serviceLocation: 'AB' // too short
      });
      expect(invalid.success).toBe(false);
    });

    it('should create and persist booking in PostgreSQL with PENDING status and history', async () => {
      const booking = await dbStore.createBooking({
        categoryId: 'cat-queue',
        serviceLocation: 'Bhimavaram Railway Reservation Counter',
        notes: 'Hold spot for ticket booking',
        customerId: 'usr-customer-1',
        customerName: 'Arun Varma'
      });

      expect(booking.id).toBeDefined();
      expect(booking.bookingNumber).toMatch(/^SQ-BV-\d+$/);
      expect(booking.status).toBe('PENDING');
      expect(booking.statusHistory.length).toBeGreaterThanOrEqual(1);
      expect(booking.statusHistory[0].status).toBe('PENDING');

      // Persistence check in Neon
      const fetched = await dbStore.getBookingById(booking.id);
      expect(fetched).not.toBeNull();
      expect(fetched?.bookingNumber).toBe(booking.bookingNumber);
    });
  });

  describe('4. Assistant Assignment & Duplicate Acceptance Prevention', () => {
    it('should assign assistant and update status to ACCEPTED in PostgreSQL', async () => {
      const booking = await dbStore.createBooking({
        categoryId: 'cat-pickup',
        serviceLocation: 'D-Mart Supermarket, J.P. Road',
        customerId: 'usr-customer-1'
      });

      const updated = await dbStore.assignAssistant(booking.id, 'ast-1', 'Suresh Naidu');
      expect(updated).not.toBeNull();
      expect(updated?.status).toBe('ACCEPTED');
      expect(updated?.assistantId).toBe('ast-1');

      const lastHistory = updated?.statusHistory[updated.statusHistory.length - 1];
      expect(lastHistory?.status).toBe('ACCEPTED');
      expect(lastHistory?.note).toContain('Suresh Naidu');
    });

    it('should track status transitions through full lifecycle in PostgreSQL', async () => {
      const booking = await dbStore.createBooking({
        categoryId: 'cat-service',
        serviceLocation: 'Samsung Authorized Service Center',
        customerId: 'usr-customer-1'
      });

      // 1. Assign
      const accepted = await dbStore.assignAssistant(booking.id, 'ast-2', 'Priya Reddy');
      expect(accepted?.status).toBe('ACCEPTED');

      // 2. Start (IN_PROGRESS)
      const inProgress = await dbStore.updateBookingStatus(
        booking.id,
        'IN_PROGRESS',
        'Assistant checked in at token desk',
        'Priya Reddy',
        'ast-2'
      );
      expect(inProgress?.status).toBe('IN_PROGRESS');

      // 3. Complete (COMPLETED)
      const completed = await dbStore.updateBookingStatus(
        booking.id,
        'COMPLETED',
        'Token handed over to customer',
        'Priya Reddy'
      );
      expect(completed?.status).toBe('COMPLETED');
      expect(completed?.statusHistory.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('5. Admin Management & Telemetry', () => {
    it('should aggregate platform metrics correctly from PostgreSQL', async () => {
      const stats = await dbStore.getStats();
      expect(stats.totalBookings).toBeGreaterThan(0);
      expect(stats.activeAssistantsCount).toBeGreaterThanOrEqual(0);
      expect(stats.pilotLocation).toContain('Bhimavaram');
    });

    it('should support assistant availability toggling in PostgreSQL', async () => {
      const assistants = await dbStore.getAssistants();
      expect(assistants.length).toBeGreaterThan(0);
      const target = assistants[0];

      const prev = target.isAvailable;
      const toggled = await dbStore.toggleAssistantAvailability(target.id, !prev);
      expect(toggled?.isAvailable).toBe(!prev);

      // Revert back
      await dbStore.toggleAssistantAvailability(target.id, prev);
    });
  });
});
