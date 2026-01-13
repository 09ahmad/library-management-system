// Type declarations for express-session
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
    username?: string;
    role?: string;
  }
}
