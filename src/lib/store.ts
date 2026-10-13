import { prisma } from './prisma';
import {
  Booking,
  BookingStatus,
  BookingStatusHistoryItem,
  ServiceCategory,
  ServiceCategoryType,
  User,
  UserRole,
  AssistantProfile,
  NotificationItem
} from '@/types';
import { Role as PrismaRole, BookingStatus as PrismaStatus, ServiceCategoryType as PrismaCategoryType } from '@prisma/client';

function formatBooking(b: any): Booking {
  return {
    id: b.id,
    bookingNumber: b.bookingNumber,
    customerId: b.customerId,
    customer: b.customer
      ? {
          id: b.customer.id,
          email: b.customer.email,
          name: b.customer.name,
          phone: b.customer.phone || undefined,
          role: b.customer.role as UserRole,
          avatarUrl: b.customer.avatarUrl || undefined,
          createdAt: b.customer.createdAt.toISOString()
        }
      : undefined,
    assistantId: b.assistantId || undefined,
    assistant: b.assistant
      ? {
          id: b.assistant.id,
          userId: b.assistant.userId,
          name: b.assistant.user?.name || 'Local Assistant',
          email: b.assistant.user?.email || '',
          phone: b.assistant.user?.phone || undefined,
          isAvailable: b.assistant.isAvailable,
          isVerified: b.assistant.isVerified,
          rating: b.assistant.rating,
          completedTasks: b.assistant.completedTasks,
          totalEarnings: b.assistant.totalEarnings,
          serviceArea: b.assistant.serviceArea,
          bio: b.assistant.bio || undefined
        }
      : undefined,
    categoryId: b.categoryId,
    category: b.category
      ? {
          id: b.category.id,
          type: b.category.type as ServiceCategoryType,
          name: b.category.name,
          description: b.category.description,
          baseFee: b.category.baseFee,
          icon: b.category.icon,
          estimatedWaitMinutes: b.category.estimatedWaitMinutes,
          popularLocations: b.category.popularLocations || []
        }
      : undefined,
    serviceLocation: b.serviceLocation,
    destination: b.destination || undefined,
    targetTime: b.targetTime ? new Date(b.targetTime).toISOString() : new Date().toISOString(),
    notes: b.notes || undefined,
    status: b.status as BookingStatus,
    estimatedWaitMins: b.estimatedWaitMins,
    timeSavedMins: b.timeSavedMins,
    serviceFee: b.serviceFee,
    createdAt: b.createdAt.toISOString(),
    updatedAt: b.updatedAt.toISOString(),
    statusHistory: (b.statusHistory || []).map((sh: any): BookingStatusHistoryItem => ({
      id: sh.id,
      bookingId: sh.bookingId,
      status: sh.status as BookingStatus,
      note: sh.note || undefined,
      timestamp: sh.timestamp.toISOString(),
      updatedBy: sh.updatedBy || undefined
    }))
  };
}

export const dbStore = {
  async getUsers(): Promise<User[]> {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return users.map((u) => ({
      id: u.id,
      email: u.email,
      name: u.name,
      phone: u.phone || undefined,
      role: u.role as UserRole,
      avatarUrl: u.avatarUrl || undefined,
      createdAt: u.createdAt.toISOString()
    }));
  },

  async getUserById(id: string): Promise<User | null> {
    const u = await prisma.user.findUnique({
      where: { id }
    });
    if (!u) return null;
    return {
      id: u.id,
      email: u.email,
      name: u.name,
      phone: u.phone || undefined,
      role: u.role as UserRole,
      avatarUrl: u.avatarUrl || undefined,
      createdAt: u.createdAt.toISOString()
    };
  },

  async getUserByEmail(email: string): Promise<(User & { passwordHash?: string }) | null> {
    const u = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });
    if (!u) return null;
    return {
      id: u.id,
      email: u.email,
      name: u.name,
      phone: u.phone || undefined,
      role: u.role as UserRole,
      passwordHash: u.passwordHash || undefined,
      avatarUrl: u.avatarUrl || undefined,
      createdAt: u.createdAt.toISOString()
    };
  },

  async createUser(data: {
    name: string;
    email: string;
    passwordHash?: string;
    phone?: string;
    role?: UserRole;
  }): Promise<User> {
    const normalizedEmail = data.email.toLowerCase();

    return await prisma.$transaction(async (tx) => {
      const existing = await tx.user.findUnique({
        where: { email: normalizedEmail }
      });
      if (existing) {
        throw new Error('User with this email already exists');
      }

      const role = (data.role || 'CUSTOMER') as PrismaRole;
      const created = await tx.user.create({
        data: {
          name: data.name,
          email: normalizedEmail,
          phone: data.phone || null,
          role,
          passwordHash: data.passwordHash || null
        }
      });

      if (role === 'ASSISTANT') {
        await tx.assistantProfile.create({
          data: {
            userId: created.id,
            isAvailable: true,
            isVerified: true,
            rating: 5.0,
            completedTasks: 0,
            totalEarnings: 0.0,
            serviceArea: 'Bhimavaram Central',
            bio: 'Verified community assistant ready for queue proxy tasks.'
          }
        });
      }

      return {
        id: created.id,
        email: created.email,
        name: created.name,
        phone: created.phone || undefined,
        role: created.role as UserRole,
        avatarUrl: created.avatarUrl || undefined,
        createdAt: created.createdAt.toISOString()
      };
    });
  },

  async getCategories(): Promise<ServiceCategory[]> {
    const categories = await prisma.serviceCategory.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'asc' }
    });
    return categories.map((c) => ({
      id: c.id,
      type: c.type as ServiceCategoryType,
      name: c.name,
      description: c.description,
      baseFee: c.baseFee,
      icon: c.icon,
      estimatedWaitMinutes: c.estimatedWaitMinutes,
      popularLocations: c.popularLocations || []
    }));
  },

  async getCategoryById(id: string): Promise<ServiceCategory | null> {
    const isType = Object.values(PrismaCategoryType).includes(id as any);
    const c = await prisma.serviceCategory.findFirst({
      where: isType
        ? { OR: [{ id }, { type: id as PrismaCategoryType }] }
        : { id }
    });
    if (!c) return null;
    return {
      id: c.id,
      type: c.type as ServiceCategoryType,
      name: c.name,
      description: c.description,
      baseFee: c.baseFee,
      icon: c.icon,
      estimatedWaitMinutes: c.estimatedWaitMinutes,
      popularLocations: c.popularLocations || []
    };
  },

  async getAssistants(): Promise<AssistantProfile[]> {
    const assistants = await prisma.assistantProfile.findMany({
      include: { user: true },
      orderBy: { rating: 'desc' }
    });
    return assistants.map((a) => ({
      id: a.id,
      userId: a.userId,
      name: a.user.name,
      email: a.user.email,
      phone: a.user.phone || undefined,
      isAvailable: a.isAvailable,
      isVerified: a.isVerified,
      rating: a.rating,
      completedTasks: a.completedTasks,
      totalEarnings: a.totalEarnings,
      serviceArea: a.serviceArea,
      bio: a.bio || undefined
    }));
  },

  async getAssistantById(id: string): Promise<AssistantProfile | null> {
    const a = await prisma.assistantProfile.findFirst({
      where: {
        OR: [{ id }, { userId: id }]
      },
      include: { user: true }
    });
    if (!a) return null;
    return {
      id: a.id,
      userId: a.userId,
      name: a.user.name,
      email: a.user.email,
      phone: a.user.phone || undefined,
      isAvailable: a.isAvailable,
      isVerified: a.isVerified,
      rating: a.rating,
      completedTasks: a.completedTasks,
      totalEarnings: a.totalEarnings,
      serviceArea: a.serviceArea,
      bio: a.bio || undefined
    };
  },

  async toggleAssistantAvailability(assistantId: string, isAvailable: boolean): Promise<AssistantProfile | null> {
    const target = await prisma.assistantProfile.findFirst({
      where: {
        OR: [{ id: assistantId }, { userId: assistantId }]
      }
    });
    if (!target) return null;

    const updated = await prisma.assistantProfile.update({
      where: { id: target.id },
      data: { isAvailable },
      include: { user: true }
    });

    return {
      id: updated.id,
      userId: updated.userId,
      name: updated.user.name,
      email: updated.user.email,
      phone: updated.user.phone || undefined,
      isAvailable: updated.isAvailable,
      isVerified: updated.isVerified,
      rating: updated.rating,
      completedTasks: updated.completedTasks,
      totalEarnings: updated.totalEarnings,
      serviceArea: updated.serviceArea,
      bio: updated.bio || undefined
    };
  },

  async getBookings(): Promise<Booking[]> {
    const bookings = await prisma.booking.findMany({
      include: {
        customer: true,
        assistant: { include: { user: true } },
        category: true,
        statusHistory: { orderBy: { timestamp: 'asc' } }
      },
      orderBy: { createdAt: 'desc' }
    });
    return bookings.map(formatBooking);
  },

  async getBookingById(id: string): Promise<Booking | null> {
    const b = await prisma.booking.findFirst({
      where: {
        OR: [{ id }, { bookingNumber: id }]
      },
      include: {
        customer: true,
        assistant: { include: { user: true } },
        category: true,
        statusHistory: { orderBy: { timestamp: 'asc' } }
      }
    });
    if (!b) return null;
    return formatBooking(b);
  },

  async createBooking(input: {
    categoryId: string;
    serviceLocation: string;
    destination?: string;
    targetTime?: string;
    notes?: string;
    customerId?: string;
    customerName?: string;
    customerPhone?: string;
    customerEmail?: string;
  }): Promise<Booking> {
    return await prisma.$transaction(async (tx) => {
      // 1. Resolve Category
      const isType = Object.values(PrismaCategoryType).includes(input.categoryId as any);
      let category = await tx.serviceCategory.findFirst({
        where: isType
          ? { OR: [{ id: input.categoryId }, { type: input.categoryId as PrismaCategoryType }] }
          : { id: input.categoryId }
      });
      if (!category) {
        category = await tx.serviceCategory.findFirst();
      }
      if (!category) {
        throw new Error('No service category found in database');
      }

      // 2. Resolve Customer
      let customer = input.customerId
        ? await tx.user.findUnique({ where: { id: input.customerId } })
        : null;

      if (!customer && input.customerEmail) {
        const email = input.customerEmail.toLowerCase();
        customer = await tx.user.findUnique({ where: { email } });
        if (!customer) {
          customer = await tx.user.create({
            data: {
              email,
              name: input.customerName || 'Valued Customer',
              phone: input.customerPhone || null,
              role: 'CUSTOMER'
            }
          });
        }
      }

      if (!customer) {
        // Fallback to first customer or create one
        customer = await tx.user.findFirst({ where: { role: 'CUSTOMER' } });
        if (!customer) {
          customer = await tx.user.create({
            data: {
              email: 'customer@skipq.in',
              name: 'Arun Varma',
              phone: '+91 98480 12345',
              role: 'CUSTOMER'
            }
          });
        }
      }

      // 3. Generate Unique Booking Number
      const bookingNumber = `SQ-BV-${Math.floor(1000 + Math.random() * 9000)}`;
      const targetTime = input.targetTime ? new Date(input.targetTime) : new Date(Date.now() + 3600000);

      // 4. Create Booking
      const createdBooking = await tx.booking.create({
        data: {
          bookingNumber,
          customerId: customer.id,
          categoryId: category.id,
          serviceLocation: input.serviceLocation,
          destination: input.destination || null,
          targetTime,
          notes: input.notes || null,
          status: 'PENDING',
          estimatedWaitMins: category.estimatedWaitMinutes,
          timeSavedMins: 0,
          serviceFee: category.baseFee
        }
      });

      // 5. Create Initial Status History Item
      await tx.bookingStatusHistory.create({
        data: {
          bookingId: createdBooking.id,
          status: 'PENDING',
          note: 'Booking requested by customer in Bhimavaram',
          updatedBy: customer.name
        }
      });

      // 6. Create Notification
      await tx.notification.create({
        data: {
          userId: customer.id,
          title: 'Booking Received',
          message: `Request ${bookingNumber} has been created and is seeking local assistants.`,
          isRead: false,
          linkUrl: '/dashboard'
        }
      });

      // 7. Return Full Hydrated Booking
      const fullBooking = await tx.booking.findUnique({
        where: { id: createdBooking.id },
        include: {
          customer: true,
          assistant: { include: { user: true } },
          category: true,
          statusHistory: { orderBy: { timestamp: 'asc' } }
        }
      });

      return formatBooking(fullBooking);
    });
  },

  async updateBookingStatus(
    bookingId: string,
    newStatus: BookingStatus,
    note?: string,
    updatedBy?: string,
    assistantId?: string
  ): Promise<Booking | null> {
    return await prisma.$transaction(async (tx) => {
      const booking = await tx.booking.findFirst({
        where: {
          OR: [{ id: bookingId }, { bookingNumber: bookingId }]
        },
        include: { assistant: true }
      });

      if (!booking) return null;

      let resolvedAssistantId: string | null = booking.assistantId;
      if (assistantId) {
        const ast = await tx.assistantProfile.findFirst({
          where: {
            OR: [{ id: assistantId }, { userId: assistantId }]
          }
        });
        if (ast) {
          resolvedAssistantId = ast.id;
        }
      }

      // Calculations if completed
      let timeSavedMins = booking.timeSavedMins;
      if (newStatus === 'COMPLETED') {
        timeSavedMins = booking.estimatedWaitMins;
        if (resolvedAssistantId) {
          await tx.assistantProfile.update({
            where: { id: resolvedAssistantId },
            data: {
              completedTasks: { increment: 1 },
              totalEarnings: { increment: booking.serviceFee * 0.8 }
            }
          });
        }
      }

      // Update Booking
      await tx.booking.update({
        where: { id: booking.id },
        data: {
          status: newStatus as PrismaStatus,
          assistantId: resolvedAssistantId,
          timeSavedMins
        }
      });

      // Add History
      await tx.bookingStatusHistory.create({
        data: {
          bookingId: booking.id,
          status: newStatus as PrismaStatus,
          note: note || `Status updated to ${newStatus}`,
          updatedBy: updatedBy || 'System'
        }
      });

      // Customer notification
      await tx.notification.create({
        data: {
          userId: booking.customerId,
          title: `Update on ${booking.bookingNumber}`,
          message: note || `Your booking is now ${newStatus.replace('_', ' ')}.`,
          isRead: false,
          linkUrl: '/dashboard'
        }
      });

      const updated = await tx.booking.findUnique({
        where: { id: booking.id },
        include: {
          customer: true,
          assistant: { include: { user: true } },
          category: true,
          statusHistory: { orderBy: { timestamp: 'asc' } }
        }
      });

      return formatBooking(updated);
    });
  },

  async assignAssistant(bookingId: string, assistantId: string, assistantName?: string): Promise<Booking | null> {
    return await this.updateBookingStatus(
      bookingId,
      'ACCEPTED',
      `Assigned to verified assistant ${assistantName || 'Local Assistant'}`,
      assistantName || 'Assistant',
      assistantId
    );
  },

  async cancelBooking(bookingId: string, reason?: string, cancelledBy?: string): Promise<Booking | null> {
    return await this.updateBookingStatus(
      bookingId,
      'CANCELLED',
      reason ? `Cancelled: ${reason}` : 'Booking was cancelled by user',
      cancelledBy || 'Customer'
    );
  },

  async getNotifications(userId: string): Promise<NotificationItem[]> {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
    return notifications.map((n) => ({
      id: n.id,
      userId: n.userId,
      title: n.title,
      message: n.message,
      isRead: n.isRead,
      linkUrl: n.linkUrl || undefined,
      createdAt: n.createdAt.toISOString()
    }));
  },

  async markNotificationRead(id: string): Promise<void> {
    await prisma.notification.updateMany({
      where: { id },
      data: { isRead: true }
    });
  },

  async getStats() {
    const [bookings, assistants] = await Promise.all([
      prisma.booking.findMany(),
      prisma.assistantProfile.findMany()
    ]);

    const completed = bookings.filter((b) => b.status === 'COMPLETED');
    const active = bookings.filter((b) => b.status === 'ACCEPTED' || b.status === 'IN_PROGRESS');
    const pending = bookings.filter((b) => b.status === 'PENDING');
    const totalMinutesSaved =
      completed.reduce((acc, b) => acc + (b.timeSavedMins || 30), 0) + active.length * 15;

    return {
      totalBookings: bookings.length,
      activeRequests: active.length,
      pendingRequests: pending.length,
      completedRequests: completed.length,
      totalHoursSaved: Math.round((totalMinutesSaved / 60) * 10) / 10,
      activeAssistantsCount: assistants.filter((a) => a.isAvailable).length,
      pilotLocation: 'Bhimavaram, Andhra Pradesh'
    };
  }
};

export default dbStore;
