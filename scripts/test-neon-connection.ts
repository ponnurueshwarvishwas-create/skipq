import 'dotenv/config';
import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';

async function main() {
  const connectionString = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set in environment!');
  }
  console.log('Testing connection to Neon PostgreSQL...');
  const adapter = new PrismaNeon({ connectionString });
  const prisma = new PrismaClient({ adapter });

  await prisma.$connect();
  console.log('CONNECTED TO NEON SUCCESSFULLY!');

  const userCount = await prisma.user.count();
  console.log('Current User count in Neon DB:', userCount);

  const categoryCount = await prisma.serviceCategory.count();
  console.log('Current ServiceCategory count in Neon DB:', categoryCount);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error('Connection failed:', err);
  process.exit(1);
});
