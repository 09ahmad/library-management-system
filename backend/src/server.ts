import express, { Express } from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';

import authRoutes from './routes/authRoutes';
import bookRoutes from './routes/bookRoutes';
import memberRoutes from './routes/memberRoutes';
import issueRoutes from './routes/issueRoutes';
import fineRoutes from './routes/fineRoutes';
import movieRoutes from './routes/movieRoutes';
import userRoutes from './routes/userRoutes';

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: 'library-management-secret-key', // In production, use environment variable
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/fines', fineRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
