# SkipQ — Full-Stack 3D Queue Assistance Platform

<p align="center">
  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=80" alt="SkipQ Platform Banner" width="100%" style="border-radius: 12px; max-height: 380px; object-fit: cover;" />
</p>

<p align="center">
  <strong>Skip the Queue. Save Your Time.</strong><br>
  On-demand verified queue proxy assistance and physical errand delegation, powered by 3D digital-twin visualization, Next.js 16, Prisma 7, and Neon Serverless PostgreSQL.
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#neon-database-setup">Neon PostgreSQL</a> •
  <a href="#api-reference">API Reference</a> •
  <a href="#testing--verification">Testing</a> •
  <a href="#security--authorization">Security</a>
</p>

---

## Overview

**SkipQ** is a production-grade full-stack queue assistance platform designed to solve one of the most pervasive real-world pain points: **hours wasted standing in line**.

Whether it's crowded municipal administrative offices, railway ticket counters, temple darshan token queues, hospital appointment counters, or retail store pickup lines, SkipQ matches customers with verified local community assistants who hold queue spots, collect tokens, and streamline service handovers.

### Pilot Deployment
- **Flagship Pilot Location:** Bhimavaram, West Godavari District, Andhra Pradesh, India
- **Key Hubs Covered:** Aadhaar Seva Kendra (Old Bus Stand Road), Somaram Temple Darshan Counters, Bhimavaram Railway Reservation Counters, D-Mart Supermarket, Samsung / Xiaomi Authorized Centers, APEPDCL Electricity Billing Centers.

---

## Key Features

### 1. Interactive 3D Digital Twin Visualizer
- Built using **Three.js**, **React Three Fiber (R3F)**, and **Drei**.
- Interactive 3D queue simulation rendering real-time avatars, dynamic lighting, ambient occlusion, responsive camera rigs, and particle effects.
- Dynamic queue depth visualizer showing customers their exact relative turn in the queue.

### 2. Multi-Role Full-Stack Workflows
- **Customer Experience (`/dashboard`):**
  - Instant multi-step booking wizard with service category selection, pickup/destination inputs, and dynamic fee computation.
  - Live booking status cards with interactive timeline, assistant details, and direct cancellation guards.
  - Real-time customer notification inbox with read state persistence.
- **Assistant Portal (`/assistant`):**
  - Assistant dashboard with real-time availability toggle switch.
  - Feed of open community queue requests in Bhimavaram.
  - One-click task acceptance with duplicate assignment conflict rejection.
  - Complete lifecycle status manager (`PENDING` → `ACCEPTED` → `IN_PROGRESS` → `COMPLETED`).
- **Business Operations (`/business`):**
  - Partner portal for merchants, hospitals, and offices to request bulk queue management and manage footfall overflow.
- **Admin Command Center (`/admin`):**
  - Real-time platform analytics: Total bookings, active requests, pending queues, verified assistant count, and total cumulative hours saved for the community.
  - Global booking monitor with filterable statuses and user inspection.

### 3. Modern Hybrid Authentication & Role Authorization
- Custom PBKDF2 password hashing (10,000 rounds, 64-byte salt) with zero external binary vulnerabilities.
- Cryptographically signed HMAC-SHA256 session tokens stored in secure, `httpOnly`, `sameSite: lax` cookies.
- Hardened role-based access control protecting customer data, assistant assignments, and admin telemetry.

### 4. Live Neon Serverless PostgreSQL Persistence
- Zero local mock reliance: 100% of Users, Assistant Profiles, Service Categories, Bookings, Status Histories, and Notifications persist to Neon PostgreSQL.
- Serverless connection pooling with `@neondatabase/serverless` and Prisma 7 driver adapter.
- Atomic multi-step operations executing inside Prisma `$transaction` blocks.

---

## Tech Stack

| Layer | Technology | Description |
|---|---|---|
| **Core Framework** | [Next.js 16.4.0](https://nextjs.org) | App Router with Turbopack, Partial Prefetching, and Cache Components |
| **Frontend UI** | [React 19.3.0](https://react.dev) | Modern Server & Client Components with Suspense and Concurrent rendering |
| **Type Safety** | [TypeScript 5](https://www.typescriptlang.org) | Strict type checking across full-stack models, routes, and schemas |
| **3D Rendering** | [Three.js](https://threejs.org) & [R3F](https://r3f.docs.pmnd.rs) | Three.js v0.186, React Three Fiber v9, and Drei v10 |
| **Styling & Design** | [Tailwind CSS v4](https://tailwindcss.com) | Modern CSS utility system with curated dark-mode glassmorphism |
| **Animations** | [Motion](https://motion.dev) & [GSAP](https://gsap.com) | Smooth spring physics, micro-interactions, and canvas confetti |
| **Database** | [Neon PostgreSQL](https://neon.tech) | Serverless PostgreSQL with auto-scaling connection pooling (`aws-ap-southeast-1`) |
| **ORM & Driver** | [Prisma 7.10.0](https://www.prisma.io) | Prisma 7 Client with `@prisma/adapter-neon` and `@neondatabase/serverless` |
| **Validation** | [Zod 4](https://zod.dev) | Schema parsing and runtime validation on all inputs and API payloads |
| **Unit Testing** | [Vitest 5.0.4](https://vitest.dev) | Lightning-fast test runner for crypto, schema, and database store logic |
| **E2E Testing** | [Playwright 1.64.0](https://playwright.dev) | Multi-browser headless integration suite testing full user workflows |

---

## Architecture

```
                          ┌──────────────────────────────────────┐
                          │         SkipQ Web Application        │
                          │        Next.js 16 + React 19         │
                          └──────────────────┬───────────────────┘
                                             │
             ┌───────────────────────────────┼──────────────────────────────┐
             ▼                               ▼                              ▼
  ┌─────────────────────┐         ┌─────────────────────┐        ┌─────────────────────┐
  │   3D Canvas Engine  │         │   Next.js API Layer │        │ Multi-Role Dashboards│
  │ Three.js / R3F      │         │ /api/auth/*         │        │ Customer (/dashboard)│
  │ Digital Twin Queue  │         │ /api/bookings/*     │        │ Assistant (/assistant)│
  │ Interactive Tokens  │         │ /api/assistants/*   │        │ Admin (/admin)       │
  │ Responsive Cameras  │         │ /api/categories/*   │        │ Business (/business) │
  └─────────────────────┘         └──────────┬──────────┘        └─────────────────────┘
                                             │
                                             ▼
                                  ┌─────────────────────┐
                                  │   Prisma 7 Client   │
                                  │   Adapter-Neon      │
                                  └──────────┬──────────┘
                                             │
                                             ▼
                                  ┌─────────────────────┐
                                  │   Neon PostgreSQL   │
                                  │   Serverless Branch │
                                  │  Connection Pooler  │
                                  └─────────────────────┘
```

---

## Project Structure

```
SkipQ/
├── prisma/
│   └── schema.prisma            # Prisma schema models (Users, Bookings, Categories, etc.)
├── prisma.config.ts             # Prisma 7 configuration file with dotenv loading
├── scripts/
│   ├── migrate-json-to-neon.ts  # Migration script from legacy JSON to Neon PostgreSQL
│   ├── e2e-database-verification.ts # 13-step live PostgreSQL verification test suite
│   └── test-neon-connection.ts  # Database latency and connectivity testing tool
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── assistants/      # Assistant availability and profile routes
│   │   │   ├── auth/            # Register, login, me, logout, switch-role routes
│   │   │   ├── bookings/        # Booking creation, filtering, and [id] status routes
│   │   │   ├── categories/      # Service categories fetch endpoint
│   │   │   ├── notifications/   # Customer notifications & read updates
│   │   │   └── stats/           # Real-time platform KPI telemetry
│   │   ├── about/               # Platform mission & story
│   │   ├── admin/               # Admin command center & booking monitor
│   │   ├── assistant/           # Assistant dashboard & open task claiming
│   │   ├── business/            # Business & merchant partnership portal
│   │   ├── contact/             # Support & customer feedback
│   │   ├── dashboard/           # Customer live booking & history dashboard
│   │   ├── demo/                # Interactive 3D queue demonstration sandbox
│   │   ├── faq/                 # Frequently asked questions
│   │   ├── how-it-works/        # Visual queue proxy workflow walkthrough
│   │   ├── pricing/             # Transparent pricing and tiers
│   │   ├── services/            # Catalog of available assistance categories
│   │   ├── layout.tsx           # Root layout with navbar, footer, auth context
│   │   ├── page.tsx             # Homepage with 3D canvas and booking modal
│   │   └── globals.css          # Tailwind CSS tokens and base styles
│   ├── components/
│   │   ├── 3d/                  # Three.js canvas components, tokens, lighting
│   │   ├── layout/              # Navbar, Footer, MobileNav, RolePill
│   │   ├── ui/                  # BookingModal, StatCard, Cards, Buttons
│   │   └── providers/           # AuthProvider, ToastProvider
│   ├── lib/
│   │   ├── auth.ts              # PBKDF2 hashing, signed session cookies, guards
│   │   ├── db.ts                # Unified database export
│   │   ├── prisma.ts            # Prisma Neon singleton client
│   │   ├── store.ts             # PostgreSQL Prisma repository implementation
│   │   └── validation.ts        # Zod validation schemas
│   └── types/                   # Shared TypeScript interfaces and enums
├── tests/
│   ├── e2e/                     # Playwright multi-page end-to-end test suites
│   └── unit/                    # Vitest unit test suites for crypto and store
├── .env.example                 # Environment variable template
├── NEON_INTEGRATION_REPORT.md   # Official Neon deployment and test verification report
├── next.config.ts               # Next.js 16 Turbopack and Cache Components config
├── package.json                 # Project dependencies and script runner definitions
└── tsconfig.json                # TypeScript compiler configuration
```

---

## Quick Start

### 1. Prerequisites
- **Node.js:** v22.14.0 or higher
- **npm:** v10 or higher
- **Git:** v2.30 or higher
- **Neon Cloud Account:** [Neon Console](https://console.neon.tech)

### 2. Clone the Repository
```bash
git clone https://github.com/Praneeth2711/skipq.git
cd skipq
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Copy the `.env.example` template:
```bash
cp .env.example .env
```
Fill in your Neon connection strings:
```env
# Neon Pooled Connection String (for runtime API routes)
DATABASE_URL="postgresql://neondb_owner:YOUR_PASSWORD@ep-your-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"

# Neon Direct Connection String (for Prisma schema push)
DATABASE_URL_UNPOOLED="postgresql://neondb_owner:YOUR_PASSWORD@ep-your-direct.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"

# Neon Branch
NEON_BRANCH="production"

# App URL & Session Secret
NEXT_PUBLIC_APP_URL="http://localhost:3000"
SESSION_SECRET="your-cryptographically-secure-random-secret"
```

---

## Neon Database Setup

### 1. Synchronize Prisma Schema to Neon
Push your schema directly to Neon PostgreSQL without migrations lock:
```bash
npx prisma db push
```

### 2. Generate Prisma Client
Generate the type-safe Prisma client:
```bash
npx prisma generate
```

### 3. Seed Default Categories & Sample Users
Run the migration script to populate default service categories and pilot records:
```bash
npx tsx scripts/migrate-json-to-neon.ts
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## API Reference

| Endpoint | Method | Role | Description |
|---|---|---|---|
| `/api/auth/register` | `POST` | Public | Register new customer or assistant (rejects ADMIN) |
| `/api/auth/login` | `POST` | Public | Authenticate with email and PBKDF2 password |
| `/api/auth/me` | `GET` | Authenticated | Inspect active session token and profile |
| `/api/auth/logout` | `POST` | Authenticated | Clear session cookie |
| `/api/auth/switch-role` | `POST` | Dev / Admin | Switch active testing role (protected in production) |
| `/api/categories` | `GET` | Public | List active service categories and fees |
| `/api/bookings` | `GET` | Authenticated | List bookings filterable by customer, assistant, or status |
| `/api/bookings` | `POST` | Customer | Create a queue assistance booking |
| `/api/bookings/[id]` | `GET` | Owner / Staff | Retrieve booking details (cross-customer blocked) |
| `/api/bookings/[id]` | `PATCH` | Assistant / Admin | Accept (`ASSIGN`), update status, or cancel booking |
| `/api/assistants` | `GET` | Public | List verified community assistants |
| `/api/assistants` | `PATCH` | Assistant | Toggle assistant availability switch |
| `/api/notifications` | `GET` | Authenticated | Fetch user notification feed |
| `/api/notifications` | `PATCH` | Authenticated | Mark notification item as read |
| `/api/stats` | `GET` | Public | Platform KPIs (hours saved, completed tasks, active volume) |

---

## Testing & Verification

### 1. Prisma Validation
```bash
npx prisma validate
```
Validates the database schema without connecting to external networks.

### 2. TypeScript Compilation Check
```bash
npx tsc --noEmit
```
Verifies strict type consistency across full-stack components.

### 3. Vitest Unit Tests
```bash
npm test
```
Executes 17 automated tests verifying PBKDF2 cryptography, HMAC token signing, Zod validation, role authorization, atomic transactions, and availability toggles.

### 4. Playwright End-to-End Suite
```bash
npm run test:e2e
```
Executes multi-page navigation tests, complete customer registration flows, booking wizards, and 3D canvas interaction tests across Chromium.

### 5. 13-Step Live Neon Database Verification
```bash
npx tsx scripts/e2e-database-verification.ts
```
Executes all 13 end-to-end database verification requirements against the live Neon PostgreSQL database (zero mock responses):
1. Register dynamic customer.
2. Verify customer in PostgreSQL via Prisma.
3. Authenticate customer login.
4. Create queue assistance booking.
5. Verify booking in PostgreSQL via Prisma.
6. Simulate server restart / Prisma reconnection cycle.
7. Confirm booking persistence across restart.
8. Authenticate authorized assistant.
9. Accept booking with duplicate assignment prevention.
10. Progress booking to `IN_PROGRESS` and `COMPLETED`.
11. Verify customer sees status update and notification.
12. Verify admin dashboard telemetry reflects completion.
13. Verify unauthorized user receives HTTP 403 Forbidden.

### 6. Production Build
```bash
npm run build
```
Creates an optimized production bundle with Turbopack, Partial Prefetching, and Cache Components.

---

## Security & Authorization

- **Zero-Binary Password Hashing:** Uses Node.js native `crypto.pbkdf2Sync` with SHA-512, eliminating vulnerability-prone native C++ dependencies like bcrypt.
- **Admin Privilege Escalation Protection:** Public registration strictly disallows `role: 'ADMIN'`. Role switching to admin in production requires an existing authenticated admin session.
- **Cross-Customer Data Isolation:** Every booking query verifies that the requesting caller is either the owner, the assigned assistant, or an admin.
- **Duplicate Acceptance Locks:** Prevents race conditions where two assistants attempt to claim the same booking simultaneously by returning HTTP 409 Conflict.
- **Atomic State Transitions:** Booking status updates, timestamp logging, and assistant earnings payouts run inside atomic PostgreSQL `$transaction` blocks.
- **Secret Hygiene:** Environment variables, database credentials, and `.neon` state are strictly excluded from source control via `.gitignore`.

---

## Database Models

```prisma
model User {
  id            String            @id @default(cuid())
  email         String            @unique
  name          String
  phone         String?
  role          Role              @default(CUSTOMER)
  passwordHash  String?
  avatarUrl     String?
  createdAt     DateTime          @default(now())
  updatedAt     DateTime          @updatedAt
  
  bookings      Booking[]         @relation("CustomerBookings")
  assistant     AssistantProfile?
  notifications Notification[]

  @@map("users")
}

model AssistantProfile {
  id              String        @id @default(cuid())
  userId          String        @unique
  user            User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  isAvailable     Boolean       @default(true)
  isVerified      Boolean       @default(true)
  rating          Float         @default(4.9)
  completedTasks  Int           @default(0)
  totalEarnings   Float         @default(0.0)
  serviceArea     String        @default("Bhimavaram Central")
  bio             String?
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
  
  assignedBookings Booking[]    @relation("AssistantAssignments")

  @@map("assistant_profiles")
}

model Booking {
  id                 String                @id @default(cuid())
  bookingNumber      String                @unique
  customerId         String
  customer           User                  @relation("CustomerBookings", fields: [customerId], references: [id])
  assistantId        String?
  assistant          AssistantProfile?     @relation("AssistantAssignments", fields: [assistantId], references: [id])
  categoryId         String
  category           ServiceCategory       @relation(fields: [categoryId], references: [id])
  serviceLocation    String
  destination        String?
  targetTime         DateTime
  notes              String?
  status             BookingStatus         @default(PENDING)
  estimatedWaitMins  Int                   @default(30)
  timeSavedMins      Int                   @default(0)
  serviceFee         Float                 @default(49.0)
  createdAt          DateTime              @default(now())
  updatedAt          DateTime              @updatedAt
  
  statusHistory      BookingStatusHistory[]

  @@map("bookings")
}
```

---

## Production Deployment

### Frontend Hosting (Vercel)
1. Push this repository to GitHub.
2. Import project into [Vercel Dashboard](https://vercel.com).
3. Set the Environment Variables:
   - `DATABASE_URL` (Neon pooled string)
   - `DATABASE_URL_UNPOOLED` (Neon direct string)
   - `SESSION_SECRET` (Secure 32+ character random secret)
   - `NEXT_PUBLIC_APP_URL` (`https://your-domain.vercel.app`)
4. Deploy! Next.js will build with Turbopack and deploy to the global edge network.

### Database Hosting (Neon)
The PostgreSQL database is provisioned and running on **Neon** (`aws-ap-southeast-1`). Database branches and point-in-time restores can be managed directly via the Neon CLI or web console.

---

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/QueueOptimization`).
3. Commit your changes (`git commit -m "Add real-time SMS queue alerts"`).
4. Push to the branch (`git push origin feature/QueueOptimization`).
5. Open a Pull Request.

---

## License & Author

**Author:** [Praneeth Perumalla](https://github.com/Praneeth2711)  
**Project:** SkipQ Queue Assistance Platform  
**License:** MIT License. Free for commercial and community use.
