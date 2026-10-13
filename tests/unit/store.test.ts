import { describe, it, expect } from 'vitest';
import { dbStore } from '@/lib/store';

describe('SkipQ dbStore unit tests', () => {
  it('should retrieve seeded service categories from PostgreSQL', async () => {
    const categories = await dbStore.getCategories();
    expect(categories.length).toBeGreaterThanOrEqual(4);
    const queueCat = categories.find((c) => c.type === 'QUEUE_ASSISTANCE');
    expect(queueCat).toBeDefined();
    expect(queueCat?.baseFee).toBe(49);
  });

  it('should retrieve seeded users and assistants from PostgreSQL', async () => {
    const users = await dbStore.getUsers();
    expect(users.length).toBeGreaterThan(0);
    const assistants = await dbStore.getAssistants();
    expect(assistants.length).toBeGreaterThan(0);
    expect(assistants[0].rating).toBeGreaterThan(4.0);
  });

  it('should retrieve and calculate stats correctly', async () => {
    const stats = await dbStore.getStats();
    expect(stats.totalBookings).toBeGreaterThanOrEqual(0);
    expect(stats.activeAssistantsCount).toBeGreaterThanOrEqual(0);
    expect(stats.totalHoursSaved).toBeGreaterThanOrEqual(0);
    expect(stats.pilotLocation).toContain('Bhimavaram');
  });

  it('should retrieve bookings with populated relations', async () => {
    const bookings = await dbStore.getBookings();
    expect(Array.isArray(bookings)).toBe(true);
    if (bookings.length > 0) {
      expect(bookings[0].bookingNumber).toBeDefined();
    }
  });

  it('should handle assistant availability toggle in PostgreSQL', async () => {
    const assistants = await dbStore.getAssistants();
    if (assistants.length > 0) {
      const ast = assistants[0];
      const prev = ast.isAvailable;
      const updated = await dbStore.toggleAssistantAvailability(ast.id, !prev);
      expect(updated?.isAvailable).toBe(!prev);
      // toggle back
      await dbStore.toggleAssistantAvailability(ast.id, prev);
    }
  });
});
