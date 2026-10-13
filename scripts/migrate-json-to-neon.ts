import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { prisma } from '../src/lib/prisma';
import { Role, BookingStatus, ServiceCategoryType } from '@prisma/client';

async function migrateData() {
  console.log('--- MIGRATING LOCAL DATA TO NEON POSTGRESQL ---');
  const dbFile = path.join(process.cwd(), '.data', 'db.json');

  if (!fs.existsSync(dbFile)) {
    console.log('No .data/db.json found. Skipping migration.');
    return;
  }

  const raw = fs.readFileSync(dbFile, 'utf-8');
  const data = JSON.parse(raw);

  // 1. Service Categories
  console.log(`Migrating ${(data.categories || []).length} categories...`);
  for (const cat of data.categories || []) {
    await prisma.serviceCategory.upsert({
      where: { type: cat.type as ServiceCategoryType },
      update: {
        name: cat.name,
        description: cat.description,
        baseFee: cat.baseFee,
        icon: cat.icon,
        estimatedWaitMinutes: cat.estimatedWaitMinutes || 30,
        popularLocations: cat.popularLocations || [],
      },
      create: {
        id: cat.id,
        type: cat.type as ServiceCategoryType,
        name: cat.name,
        description: cat.description,
        baseFee: cat.baseFee,
        icon: cat.icon,
        estimatedWaitMinutes: cat.estimatedWaitMinutes || 30,
        popularLocations: cat.popularLocations || [],
      },
    });
  }

  // 2. Users
  console.log(`Migrating ${(data.users || []).length} users...`);
  for (const user of data.users || []) {
    await prisma.user.upsert({
      where: { email: user.email.toLowerCase() },
      update: {
        name: user.name,
        phone: user.phone || null,
        role: user.role as Role,
        passwordHash: user.passwordHash || null,
        avatarUrl: user.avatarUrl || null,
      },
      create: {
        id: user.id,
        email: user.email.toLowerCase(),
        name: user.name,
        phone: user.phone || null,
        role: user.role as Role,
        passwordHash: user.passwordHash || null,
        avatarUrl: user.avatarUrl || null,
        createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
      },
    });
  }

  // 3. Assistants
  console.log(`Migrating ${(data.assistants || []).length} assistant profiles...`);
  for (const ast of data.assistants || []) {
    // Ensure the user exists
    const user = await prisma.user.findUnique({ where: { id: ast.userId } });
    if (!user) {
      console.warn(`User ${ast.userId} not found for assistant ${ast.id}, skipping`);
      continue;
    }

    await prisma.assistantProfile.upsert({
      where: { userId: ast.userId },
      update: {
        isAvailable: ast.isAvailable ?? true,
        isVerified: ast.isVerified ?? true,
        rating: ast.rating || 4.9,
        completedTasks: ast.completedTasks || 0,
        totalEarnings: ast.totalEarnings || 0.0,
        serviceArea: ast.serviceArea || 'Bhimavaram Central',
        bio: ast.bio || null,
      },
      create: {
        id: ast.id,
        userId: ast.userId,
        isAvailable: ast.isAvailable ?? true,
        isVerified: ast.isVerified ?? true,
        rating: ast.rating || 4.9,
        completedTasks: ast.completedTasks || 0,
        totalEarnings: ast.totalEarnings || 0.0,
        serviceArea: ast.serviceArea || 'Bhimavaram Central',
        bio: ast.bio || null,
      },
    });
  }

  // 4. Bookings
  console.log(`Migrating ${(data.bookings || []).length} bookings...`);
  for (const booking of data.bookings || []) {
    // Check customer exists
    const customer = await prisma.user.findUnique({ where: { id: booking.customerId } });
    if (!customer) {
      console.warn(`Customer ${booking.customerId} not found for booking ${booking.id}, skipping`);
      continue;
    }

    // Check category exists
    const category = await prisma.serviceCategory.findUnique({ where: { id: booking.categoryId } });
    if (!category) {
      console.warn(`Category ${booking.categoryId} not found for booking ${booking.id}, skipping`);
      continue;
    }

    // Check assistant if assigned
    let assistantId: string | null = null;
    if (booking.assistantId) {
      const ast = await prisma.assistantProfile.findUnique({ where: { id: booking.assistantId } });
      if (ast) assistantId = ast.id;
    }

    const createdBooking = await prisma.booking.upsert({
      where: { bookingNumber: booking.bookingNumber },
      update: {
        status: booking.status as BookingStatus,
        serviceLocation: booking.serviceLocation,
        destination: booking.destination || null,
        targetTime: booking.targetTime ? new Date(booking.targetTime) : new Date(),
        notes: booking.notes || null,
        estimatedWaitMins: booking.estimatedWaitMins || 30,
        timeSavedMins: booking.timeSavedMins || 0,
        serviceFee: booking.serviceFee || 49.0,
        assistantId: assistantId,
      },
      create: {
        id: booking.id,
        bookingNumber: booking.bookingNumber,
        customerId: booking.customerId,
        categoryId: booking.categoryId,
        assistantId: assistantId,
        serviceLocation: booking.serviceLocation,
        destination: booking.destination || null,
        targetTime: booking.targetTime ? new Date(booking.targetTime) : new Date(),
        notes: booking.notes || null,
        status: booking.status as BookingStatus,
        estimatedWaitMins: booking.estimatedWaitMins || 30,
        timeSavedMins: booking.timeSavedMins || 0,
        serviceFee: booking.serviceFee || 49.0,
        createdAt: booking.createdAt ? new Date(booking.createdAt) : new Date(),
        updatedAt: booking.updatedAt ? new Date(booking.updatedAt) : new Date(),
      },
    });

    // Migrate status histories if present
    if (Array.isArray(booking.statusHistory)) {
      for (const history of booking.statusHistory) {
        const existingHistory = await prisma.bookingStatusHistory.findUnique({
          where: { id: history.id },
        });
        if (!existingHistory) {
          await prisma.bookingStatusHistory.create({
            data: {
              id: history.id,
              bookingId: createdBooking.id,
              status: history.status as BookingStatus,
              note: history.note || null,
              updatedBy: history.updatedBy || null,
              timestamp: history.timestamp ? new Date(history.timestamp) : new Date(),
            },
          });
        }
      }
    }
  }

  // 5. Notifications
  console.log(`Migrating ${(data.notifications || []).length} notifications...`);
  for (const notif of data.notifications || []) {
    const user = await prisma.user.findUnique({ where: { id: notif.userId } });
    if (!user) continue;

    const existingNotif = await prisma.notification.findUnique({ where: { id: notif.id } });
    if (!existingNotif) {
      await prisma.notification.create({
        data: {
          id: notif.id,
          userId: notif.userId,
          title: notif.title,
          message: notif.message,
          isRead: notif.isRead ?? false,
          linkUrl: notif.linkUrl || null,
          createdAt: notif.createdAt ? new Date(notif.createdAt) : new Date(),
        },
      });
    }
  }

  console.log('MIGRATION COMPLETED SUCCESSFULLY!');
  const totalUsers = await prisma.user.count();
  const totalCategories = await prisma.serviceCategory.count();
  const totalAssistants = await prisma.assistantProfile.count();
  const totalBookings = await prisma.booking.count();
  console.log(`Neon Database totals: ${totalUsers} Users, ${totalCategories} Categories, ${totalAssistants} Assistants, ${totalBookings} Bookings.`);
}

migrateData()
  .catch((e) => {
    console.error('Migration failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
