import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  session: {
    userId?: string;
    username?: string;
    role?: string;
  };
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  next();
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  if (req.session.role !== 'Admin') {
    return res.status(403).json({ success: false, message: 'Forbidden: Admin access required' });
  }
  next();
};
