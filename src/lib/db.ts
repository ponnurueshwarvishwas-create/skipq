import { dbStore } from './store';

// Export unified db interface for API routes & server components
export const db = dbStore;

export default db;
