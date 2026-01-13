// Type definitions for the Library Management System

export enum UserRole {
  ADMIN = 'Admin',
  USER = 'User'
}

export enum MemberStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive'
}

export enum BookAvailability {
  AVAILABLE = 'Available',
  ISSUED = 'Issued'
}

export enum PaymentMode {
  CASH = 'Cash',
  CARD = 'Card',
  ONLINE = 'Online'
}

export interface User {
  id: string;
  username: string;
  password: string; // In production, this should be hashed
  role: UserRole;
  status: MemberStatus;
}

export interface Member {
  membershipNumber: string;
  memberName: string;
  address?: string;
  phoneNo?: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  status: MemberStatus;
}

export interface Book {
  bookName: string;
  author: string;
  category: string;
  serialNo: string;
  availability: BookAvailability;
}

export interface Movie {
  movieName: string;
  director: string;
  category: string;
  serialNo: string;
  availability: BookAvailability;
}

export interface Issue {
  id: string;
  membershipNumber: string;
  bookName: string;
  serialNo: string;
  issueDate: string; // ISO date string
  dueDate: string; // ISO date string (typically issueDate + 30 days)
  returnDate?: string; // ISO date string
  fineAmount: number;
  remarks?: string;
}

export interface FinePayment {
  id: string;
  membershipNumber: string;
  bookName: string;
  fineAmount: number;
  paymentMode: PaymentMode;
  paymentDate: string; // ISO date string
}
