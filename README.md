# Library Management System

A full-stack Library Management System built with React, TypeScript, Node.js, and Express.

## Features

- **Role-based Access Control**: Admin and User roles with different permissions
- **Book Management**: Add, update, search, and manage books
- **Movie Management**: Add, update, and manage movies
- **Membership Management**: Add and update member information
- **Transaction Management**: Issue books, return books, pay fines
- **Reports**: View active issues and overdue returns
- **Maintenance**: Admin-only access to system maintenance features

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Backend**: Node.js + Express + TypeScript
- **Database**: In-memory store (can be easily replaced with SQLite)
- **Authentication**: Session-based login
- **Styling**: Basic CSS

## Project Structure

```
assignment/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Data models and database
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Auth middleware
│   │   └── server.ts       # Express server
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React context (Auth)
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   ├── App.tsx         # Main app component
│   │   └── index.tsx       # Entry point
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

1. **Install root dependencies:**
   ```bash
   npm install
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   cd ..
   ```

3. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

## Running the Application

### Option 1: Run both servers together (Recommended)

From the root directory:
```bash
npm run dev
```

This will start both the backend (port 5000) and frontend (port 3000) servers concurrently.

### Option 2: Run servers separately

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend (in a new terminal):**
```bash
cd frontend
npm start
```

## Default Login Credentials

- **Admin:**
  - Username: `admin`
  - Password: `admin123`

- **User:**
  - Username: `user`
  - Password: `user123`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/session` - Get current session

### Books
- `GET /api/books` - Get all books
- `GET /api/books/search` - Search books
- `GET /api/books/:serialNo` - Get book by serial number
- `POST /api/books` - Add new book
- `PUT /api/books/:serialNo` - Update book

### Members
- `GET /api/members` - Get all members
- `GET /api/members/:membershipNumber` - Get member by number
- `POST /api/members` - Add new member
- `PUT /api/members/:membershipNumber` - Update member

### Issues
- `GET /api/issues` - Get all issues
- `GET /api/issues/active` - Get active issues
- `GET /api/issues/overdue` - Get overdue issues
- `POST /api/issues` - Create new issue
- `POST /api/issues/return` - Return a book

### Fines
- `POST /api/fines/pay` - Pay fine

### Movies
- `GET /api/movies` - Get all movies
- `POST /api/movies` - Add new movie
- `PUT /api/movies/:serialNo` - Update movie

### Users (Admin only)
- `GET /api/users` - Get all users
- `POST /api/users` - Add new user
- `PUT /api/users/:userId` - Update user

## Screen Flow

1. **SP Login** → Enter credentials
2. **Instructions** → Read instructions and continue
3. **Home Page** → Based on role (Admin/User)
4. **Transactions** → Book operations
5. **Master** → View master lists
6. **Maintenance** → Admin-only maintenance (Add/Update books, members, users)
7. **Reports** → View reports

## Key Features by Screen

### Transactions
- Book Available: Search for books
- Issue Request: Issue books to members
- Return Book: Return books and calculate fines
- Pay Fine: Pay overdue fines
- Active Issue: View all active issues
- Overdue Return: View overdue returns

### Master Lists
- Books: View and manage books
- Movies: View and manage movies
- Membership: View all memberships

### Maintenance (Admin Only)
- Add/Update Membership
- Add/Update Book
- Add/Update Movie
- User Management

### Reports
- Active Issue Report
- Overdue Return Report

## Notes

- All data is stored in-memory and will be reset on server restart
- Session-based authentication is used
- Role-based access control is enforced on both frontend and backend
- All mandatory fields are validated
- Fine calculation: $1 per day after due date

## Development

### Building for Production

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
```

The built frontend files will be in `frontend/build/`.

## Assumptions and Defaults

1. **Fine Calculation**: $1 per day after due date
2. **Due Date**: 30 days from issue date
3. **Membership Duration**: 6 months from start date
4. **Password Storage**: Plain text (for demo purposes only - should be hashed in production)
5. **Data Persistence**: In-memory (data resets on server restart)

## License

This project is created for educational purposes.
