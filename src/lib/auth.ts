import crypto from 'crypto';
import { cookies } from 'next/headers';
import { User, UserRole, AssistantProfile } from '@/types';
import { db } from './db';

const SESSION_SECRET = process.env.SESSION_SECRET || 'skipq-bhimavaram-super-secret-key-2026';
const SESSION_COOKIE_NAME = 'skipq_session';

export interface SessionData {
  userId: string;
  email: string;
  role: UserRole;
  name: string;
  expiresAt: number;
}

// 1. Password Hashing with PBKDF2 (Zero external dependencies, NIST compliant)
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, combinedHash: string): boolean {
  if (!combinedHash || !combinedHash.includes(':')) return false;
  const [salt, originalHash] = combinedHash.split(':');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(originalHash));
}

// 2. Cryptographically Signed Session Tokens
export function signSession(data: Omit<SessionData, 'expiresAt'>, maxAgeHours = 72): string {
  const expiresAt = Date.now() + maxAgeHours * 3600 * 1000;
  const payload: SessionData = { ...data, expiresAt };
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payloadBase64)
    .digest('base64url');
  return `${payloadBase64}.${signature}`;
}

export function verifySessionToken(token: string): SessionData | null {
  try {
    if (!token || !token.includes('.')) return null;
    const [payloadBase64, signature] = token.split('.');
    const expectedSignature = crypto
      .createHmac('sha256', SESSION_SECRET)
      .update(payloadBase64)
      .digest('base64url');

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }

    const payload: SessionData = JSON.parse(Buffer.from(payloadBase64, 'base64url').toString('utf-8'));
    if (Date.now() > payload.expiresAt) {
      return null; // Expired
    }
    return payload;
  } catch {
    return null;
  }
}

// 3. Server-side session extraction from Next.js cookies or Authorization header
export async function getSession(request?: Request): Promise<SessionData | null> {
  // Try Authorization header first (Bearer token)
  if (request) {
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7).trim();
      const session = verifySessionToken(token);
      if (session) return session;
    }
  }

  // Next, try cookies
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (cookie?.value) {
      return verifySessionToken(cookie.value);
    }
  } catch {
    // If running in an environment without cookies() context, fallback gracefully
  }

  return null;
}

// 4. Role-based Permission Guards
export async function requireAuth(request?: Request): Promise<{ session: SessionData; user: User } | null> {
  const session = await getSession(request);
  if (!session) return null;

  const user = await db.getUserById(session.userId);
  if (!user) return null;

  return { session, user };
}

export async function requireRole(
  allowedRoles: UserRole[],
  request?: Request
): Promise<{ session: SessionData; user: User } | null> {
  const auth = await requireAuth(request);
  if (!auth) return null;

  if (!allowedRoles.includes(auth.session.role)) {
    return null; // Forbidden
  }
  return auth;
}

export async function requireOwnershipOrRole(
  resourceOwnerId: string,
  allowedRoles: UserRole[],
  request?: Request
): Promise<{ session: SessionData; user: User } | null> {
  const auth = await requireAuth(request);
  if (!auth) return null;

  // Grant if caller is the resource owner OR possesses elevated role
  if (auth.user.id === resourceOwnerId || allowedRoles.includes(auth.session.role)) {
    return auth;
  }
  return null;
}
