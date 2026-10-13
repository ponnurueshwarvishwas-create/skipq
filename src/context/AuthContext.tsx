'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, AssistantProfile } from '@/types';

interface AuthContextType {
  currentUser: User;
  currentRole: UserRole;
  assistantProfile: AssistantProfile | null;
  switchRole: (role: UserRole) => Promise<void>;
  setUser: (user: User) => void;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const DEFAULT_USERS: Record<UserRole, User> = {
  CUSTOMER: {
    id: 'usr-customer-1',
    email: 'arun.varma@example.com',
    name: 'Arun Varma',
    phone: '+91 98480 12345',
    role: 'CUSTOMER',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-01-15T10:00:00.000Z'
  },
  ASSISTANT: {
    id: 'usr-assistant-1',
    email: 'suresh.naidu@example.com',
    name: 'Suresh Naidu',
    phone: '+91 98481 23456',
    role: 'ASSISTANT',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-11-20T10:00:00.000Z'
  },
  ADMIN: {
    id: 'usr-admin-1',
    email: 'admin@skipq.in',
    name: 'SkipQ Admin Team',
    phone: '+91 8816 220011',
    role: 'ADMIN',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-08-10T10:00:00.000Z'
  }
};

const DEFAULT_ASSISTANT_PROFILE: AssistantProfile = {
  id: 'ast-1',
  userId: 'usr-assistant-1',
  name: 'Suresh Naidu',
  email: 'suresh.naidu@example.com',
  phone: '+91 98481 23456',
  isAvailable: true,
  isVerified: true,
  rating: 4.92,
  completedTasks: 148,
  totalEarnings: 8420,
  serviceArea: 'Bhimavaram Central & Sunday Market',
  bio: 'Dedicated local assistant with 8+ months experience navigating city office queues and hospital appointment desks.'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole>('CUSTOMER');
  const [currentUser, setCurrentUser] = useState<User>(DEFAULT_USERS.CUSTOMER);
  const [assistantProfile, setAssistantProfile] = useState<AssistantProfile | null>(null);

  useEffect(() => {
    // Check server session first
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.authenticated && data.user) {
          setCurrentUser(data.user);
          setCurrentRole(data.user.role);
          if (data.assistant) {
            setAssistantProfile(data.assistant);
          }
          return;
        }

        // Fallback to local preference
        const saved = localStorage.getItem('skipq_active_role') as UserRole;
        if (saved && DEFAULT_USERS[saved]) {
          setCurrentRole(saved);
          setCurrentUser(DEFAULT_USERS[saved]);
          if (saved === 'ASSISTANT') {
            setAssistantProfile(DEFAULT_ASSISTANT_PROFILE);
          }
        }
      })
      .catch(() => {
        // Fallback gracefully on network error
      });
  }, []);

  const switchRole = async (role: UserRole) => {
    setCurrentRole(role);
    setCurrentUser(DEFAULT_USERS[role]);
    localStorage.setItem('skipq_active_role', role);

    if (role === 'ASSISTANT') {
      setAssistantProfile(DEFAULT_ASSISTANT_PROFILE);
    } else {
      setAssistantProfile(null);
    }

    try {
      await fetch('/api/auth/switch-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role })
      });
    } catch (e) {
      console.error('Failed to sync role to server session:', e);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success && data.user) {
        setCurrentUser(data.user);
        setCurrentRole(data.user.role);
        localStorage.setItem('skipq_active_role', data.user.role);
        return { success: true };
      }
      return { success: false, error: data.error || 'Login failed' };
    } catch {
      return { success: false, error: 'Network error during login' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      switchRole('CUSTOMER');
    }
  };

  const setUser = (user: User) => {
    setCurrentUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole,
        assistantProfile,
        switchRole,
        setUser,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
