import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { AuthRequest } from '../middleware/auth';

export class AuthController {
  static login = (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    const result = AuthService.login(username, password);

    if (result.success && result.user) {
      const session = (req as any).session;
      session.userId = result.user.id;
      session.username = result.user.username;
      session.role = result.user.role;

      return res.json({
        success: true,
        user: {
          id: result.user.id,
          username: result.user.username,
          role: result.user.role
        }
      });
    }

    return res.status(401).json({ success: false, message: result.message || 'Login failed' });
  };

  static logout = (req: Request, res: Response) => {
    ((req as any).session as any).destroy((err: Error | null) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error logging out' });
      }
      res.json({ success: true, message: 'Logged out successfully' });
    });
  };

  static getSession = (req: Request, res: Response) => {
    const session = (req as any).session;
    if (!session || !session.userId) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    return res.json({
      success: true,
      user: {
        id: session.userId,
        username: session.username,
        role: session.role
      }
    });
  };
}
