import { Request, Response } from 'express';
import { db } from '../models/database';
import { users } from '../models/database';
import { User, UserRole, MemberStatus } from '../models/types';

export class UserController {
  static getAllUsers = (req: Request, res: Response) => {
    // Return users without passwords
    const usersList = users.map(u => ({
      id: u.id,
      username: u.username,
      role: u.role,
      status: u.status
    }));
    res.json({ success: true, data: usersList });
  };

  static addUser = (req: Request, res: Response) => {
    const { userName, role, status } = req.body;

    if (!userName || !role || !status) {
      return res.status(400).json({ 
        success: false, 
        message: 'User name, role, and status are required' 
      });
    }

    // Check if user already exists
    const existingUser = db.findUserByUsername(userName);
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists' 
      });
    }

    // Create new user (in production, password should be hashed)
    const newUser: User = {
      id: String(users.length + 1),
      username: userName,
      password: 'default123', // In production, generate secure password
      role: role as UserRole,
      status: status as MemberStatus
    };

    users.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;
    res.json({ 
      success: true, 
      message: 'User added successfully',
      data: userWithoutPassword
    });
  };

  static updateUser = (req: Request, res: Response) => {
    const { userId } = req.params;
    const { userName, role, status } = req.body;

    const user = db.findUserById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    if (userName) user.username = userName;
    if (role) user.role = role as UserRole;
    if (status) user.status = status as MemberStatus;

    const { password: _, ...userWithoutPassword } = user;
    res.json({ 
      success: true, 
      message: 'User updated successfully',
      data: userWithoutPassword
    });
  };
}
