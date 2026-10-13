import { z } from 'zod';

export const BookingCreateSchema = z.object({
  categoryId: z.string().min(1, 'Category ID is required'),
  serviceLocation: z.string().min(3, 'Service location must be at least 3 characters'),
  destination: z.string().optional(),
  targetTime: z.string().optional(),
  notes: z.string().max(500, 'Notes cannot exceed 500 characters').optional(),
  customerId: z.string().optional(),
  customerName: z.string().optional(),
  customerPhone: z.string().optional(),
  customerEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
});

export const BookingUpdateSchema = z.object({
  action: z.enum(['ASSIGN', 'CANCEL']).optional(),
  status: z.enum(['PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
  note: z.string().max(300).optional(),
  updatedBy: z.string().optional(),
  assistantId: z.string().optional(),
  assistantName: z.string().optional(),
  reason: z.string().optional(),
});

export const UserRegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().optional(),
  role: z.enum(['CUSTOMER', 'ASSISTANT']).default('CUSTOMER'),
});

export const UserLoginSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(1, 'Password is required'),
});

export type BookingCreateInput = z.infer<typeof BookingCreateSchema>;
export type BookingUpdateInput = z.infer<typeof BookingUpdateSchema>;
export type UserRegisterInput = z.infer<typeof UserRegisterSchema>;
export type UserLoginInput = z.infer<typeof UserLoginSchema>;
