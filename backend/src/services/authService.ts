import { db } from '../models/database';
import { User, UserRole } from '../models/types';

export interface LoginResult {
  success: boolean;
  user?: User;
  message?: string;
}

export class AuthService {
  static login(username: string, password: string): LoginResult {
    const user = db.findUserByUsername(username);
    
    if (!user) {
      return { success: false, message: 'Invalid username or password' };
    }

    if (user.password !== password) {
      return { success: false, message: 'Invalid username or password' };
    }

    if (user.status !== 'Active') {
      return { success: false, message: 'Account is inactive' };
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    return { success: true, user: userWithoutPassword as User };
  }

  static validateSession(session: any): boolean {
    return session && session.userId && session.role;
  }

  static isAdmin(session: any): boolean {
    return session && session.role === UserRole.ADMIN;
  }
}
