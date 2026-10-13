# SkipQ Comprehensive Backend Audit

**Date:** October 13, 2026  
**Environment:** Next.js 16.4.0 (Turbopack, App Router) • Node.js 22.14.0 • Prisma 7.10.0 • PostgreSQL (Port 5432 listening)

---

## 1. Feature Implementation Matrix

| Backend Capability | Status | Current Storage / Tier | Real DB Persistence | Security & Validation |
| :--- | :--- | :--- | :--- | :--- |
| **User Authentication** | ⚠️ **MOCKED** | Client `AuthContext` with hardcoded personas | ❌ No DB query | ❌ No password hashing, no tokens, no login/register routes |
| **Session Management** | ⚠️ **MOCKED** | Browser `localStorage` (`skipq_active_role`) | ❌ None | ❌ No cookies, no session store, no expiration |
| **Role-Based Authorization** | ⚠️ **PARTIAL** | UI toggles in `Navbar` & page switches | ❌ None | ❌ API endpoints lack caller verification; anyone can mutate any ID |
| **Database Persistence** | ⚠️ **PARTIAL** | File-system JSON store (`.data/db.json`) | ⚠️ Local JSON (Not PostgreSQL) | ✅ Persists across reboots to JSON file; PostgreSQL driver not yet wired |
| **Customer Booking Creation** | ✅ **FULLY IMPLEMENTED** | REST API `POST /api/bookings` -> `dbStore` | ⚠️ File-backed (`.data/db.json`) | ⚠️ Basic payload checks, needs strict Zod schema validation |
| **Assistant Request Acceptance** | ✅ **FULLY IMPLEMENTED** | REST API `PATCH /api/bookings/[id]` | ⚠️ File-backed (`.data/db.json`) | ⚠️ Accepts assistant ID without verifying assistant role/auth |
| **Booking Status Transitions** | ✅ **FULLY IMPLEMENTED** | REST API `PATCH /api/bookings/[id]` | ⚠️ File-backed (`.data/db.json`) | ✅ History tracked with notes & timestamps in `statusHistory` |
| **Admin Management Portal** | ✅ **FULLY IMPLEMENTED** | API `/api/stats`, `/api/bookings`, `/api/assistants` | ⚠️ File-backed (`.data/db.json`) | ⚠️ UI is rich & reactive; needs server-side admin guard |
| **Business / Partner Portal** | ⚠️ **PARTIAL** | Embedded in service categories (`store.ts`) | ⚠️ File-backed (`.data/db.json`) | ❌ Dedicated B2B management route `/business` not yet created |
| **Notifications Engine** | ✅ **FULLY IMPLEMENTED** | API `/api/notifications` | ⚠️ File-backed (`.data/db.json`) | ✅ Emits notifications on state changes; marks read on patch |
| **Payment Integration** | ⚠️ **MOCKED** | Service fee calculated (`baseFee` Rs. 49-79) | ⚠️ Simulation | ❌ Instant confirmation without payment gateway webhook |
| **Real-Time Tracking** | ⚠️ **PARTIAL** | Client polling & simulated countdown | ⚠️ Client-side | ❌ Simulated timeline; lacks Server-Sent Events / WebSockets |

---

## 2. In-Depth Technical Findings

### A. Database Persistence: Why File-Backed vs PostgreSQL
- **Existing Schema:** `prisma/schema.prisma` declares models `User`, `AssistantProfile`, `ServiceCategory`, `Booking`, `BookingStatusHistory`, and `Notification`.
- **The Prisma 7 Blocker Discovered:** 
  Running `npx prisma db push` surfaced Prisma 7's breaking change:
  ```
  Error code P1012: The datasource property `url` is no longer supported in schema files.
  Move connection URLs for Migrate to `prisma.config.ts` and pass adapter or accelerateUrl to PrismaClient constructor.
  ```
- **Current Fallback:** Because of this, the application fell back to `src/lib/store.ts` reading/writing to `.data/db.json`.
- **Verdict:** Data **does persist** across server reboots via `.data/db.json`, but **real PostgreSQL persistence via Prisma ORM is currently dormant** until `prisma.config.ts` and the Prisma 7 client adapter are configured.

### B. Authentication & Authorization Gaps
- Currently, authentication is handled in `src/context/AuthContext.tsx` via three hardcoded client personas (`usr-customer-1`, `usr-assistant-1`, `usr-admin-1`).
- Switching roles updates `localStorage.setItem('skipq_active_role', role)`.
- Route Handlers in `/api/bookings/[id]` execute actions (`ASSIGN`, `CANCEL`, status changes) without verifying authentication tokens or asserting that the caller owns the booking or possesses the required role.

### C. Required Action Plan for Backend Completion
1. Configure Prisma 7 with a compliant `prisma.config.ts` and PostgreSQL connection adapter (or seamless dual-mode PostgreSQL/JSON synchronization).
2. Implement real authentication route handlers:
   - `POST /api/auth/register`
   - `POST /api/auth/login`
   - `POST /api/auth/logout`
   - `GET /api/auth/me`
3. Secure sessions using signed HTTP-only cookies (`skipq_session`) and password hashing (PBKDF2/bcrypt).
4. Introduce Zod request validation across booking creation, updates, and authentication.
5. Implement server-side role and ownership enforcement on protected routes.
6. Create dedicated `/business` portal for partner merchant queue delegation.
