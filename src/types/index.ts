export type UserRole = 'CUSTOMER' | 'ASSISTANT' | 'ADMIN';

export type BookingStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export type ServiceCategoryType =
  | 'QUEUE_ASSISTANCE'
  | 'STORE_PICKUP'
  | 'SERVICE_CENTER'
  | 'ERRAND_ASSISTANCE';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface AssistantProfile {
  id: string;
  userId: string;
  user?: User;
  name?: string;
  email?: string;
  phone?: string;
  isAvailable: boolean;
  isVerified: boolean;
  rating: number;
  completedTasks: number;
  totalEarnings: number;
  serviceArea: string;
  bio?: string;
}

export interface ServiceCategory {
  id: string;
  type: ServiceCategoryType;
  name: string;
  description: string;
  baseFee: number;
  icon: string;
  estimatedWaitMinutes: number;
  popularLocations: string[];
}

export interface BookingStatusHistoryItem {
  id: string;
  bookingId: string;
  status: BookingStatus;
  note?: string;
  timestamp: string;
  updatedBy?: string;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  customerId: string;
  customer?: User;
  assistantId?: string;
  assistant?: AssistantProfile;
  categoryId: string;
  category?: ServiceCategory;
  serviceLocation: string;
  destination?: string;
  targetTime: string;
  notes?: string;
  status: BookingStatus;
  estimatedWaitMins: number;
  timeSavedMins: number;
  serviceFee: number;
  createdAt: string;
  updatedAt: string;
  statusHistory: BookingStatusHistoryItem[];
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  linkUrl?: string;
  createdAt: string;
}

export interface BookingCreationPayload {
  categoryId: string;
  serviceLocation: string;
  destination?: string;
  targetDate: string;
  targetTime: string;
  notes?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
}
