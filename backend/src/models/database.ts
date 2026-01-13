// In-memory database store
import { User, Member, Book, Movie, Issue, FinePayment, UserRole, MemberStatus, BookAvailability, PaymentMode } from './types';

// In-memory data stores
export const users: User[] = [
  { id: '1', username: 'admin', password: 'admin123', role: UserRole.ADMIN, status: MemberStatus.ACTIVE },
  { id: '2', username: 'user', password: 'user123', role: UserRole.USER, status: MemberStatus.ACTIVE }
];

export const members: Member[] = [
  {
    membershipNumber: 'MEM001',
    memberName: 'John Doe',
    address: '123 Main St',
    phoneNo: '123-456-7890',
    startDate: '2024-01-01',
    endDate: '2024-07-01',
    status: MemberStatus.ACTIVE
  },
  {
    membershipNumber: 'MEM002',
    memberName: 'Jane Smith',
    address: '456 Oak Ave',
    phoneNo: '234-567-8901',
    startDate: '2024-02-01',
    endDate: '2024-08-01',
    status: MemberStatus.ACTIVE
  }
];

export const books: Book[] = [
  {
    bookName: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Fiction',
    serialNo: 'BK001',
    availability: BookAvailability.AVAILABLE
  },
  {
    bookName: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Fiction',
    serialNo: 'BK002',
    availability: BookAvailability.AVAILABLE
  },
  {
    bookName: '1984',
    author: 'George Orwell',
    category: 'Fiction',
    serialNo: 'BK003',
    availability: BookAvailability.ISSUED
  }
];

export const movies: Movie[] = [
  {
    movieName: 'The Matrix',
    director: 'Wachowski Brothers',
    category: 'Sci-Fi',
    serialNo: 'MV001',
    availability: BookAvailability.AVAILABLE
  },
  {
    movieName: 'Inception',
    director: 'Christopher Nolan',
    category: 'Sci-Fi',
    serialNo: 'MV002',
    availability: BookAvailability.AVAILABLE
  }
];

export const issues: Issue[] = [
  {
    id: 'ISS001',
    membershipNumber: 'MEM001',
    bookName: '1984',
    serialNo: 'BK003',
    issueDate: '2024-01-15',
    dueDate: '2024-02-14',
    fineAmount: 0
  }
];

export const finePayments: FinePayment[] = [];

// Helper functions for database operations
export const db = {
  // User operations
  findUserByUsername: (username: string): User | undefined => {
    return users.find(u => u.username === username);
  },
  
  findUserById: (id: string): User | undefined => {
    return users.find(u => u.id === id);
  },

  // Member operations
  findMemberByNumber: (membershipNumber: string): Member | undefined => {
    return members.find(m => m.membershipNumber === membershipNumber);
  },

  getAllMembers: (): Member[] => {
    return [...members];
  },

  addMember: (member: Member): void => {
    members.push(member);
  },

  updateMember: (membershipNumber: string, updates: Partial<Member>): boolean => {
    const index = members.findIndex(m => m.membershipNumber === membershipNumber);
    if (index === -1) return false;
    members[index] = { ...members[index], ...updates };
    return true;
  },

  // Book operations
  findBookBySerial: (serialNo: string): Book | undefined => {
    return books.find(b => b.serialNo === serialNo);
  },

  getAllBooks: (): Book[] => {
    return [...books];
  },

  searchBooks: (filters: { bookName?: string; author?: string; category?: string }): Book[] => {
    return books.filter(book => {
      if (filters.bookName && !book.bookName.toLowerCase().includes(filters.bookName.toLowerCase())) {
        return false;
      }
      if (filters.author && !book.author.toLowerCase().includes(filters.author.toLowerCase())) {
        return false;
      }
      if (filters.category && book.category !== filters.category) {
        return false;
      }
      return true;
    });
  },

  addBook: (book: Book): void => {
    books.push(book);
  },

  updateBook: (serialNo: string, updates: Partial<Book>): boolean => {
    const index = books.findIndex(b => b.serialNo === serialNo);
    if (index === -1) return false;
    books[index] = { ...books[index], ...updates };
    return true;
  },

  // Movie operations
  getAllMovies: (): Movie[] => {
    return [...movies];
  },

  addMovie: (movie: Movie): void => {
    movies.push(movie);
  },

  updateMovie: (serialNo: string, updates: Partial<Movie>): boolean => {
    const index = movies.findIndex(m => m.serialNo === serialNo);
    if (index === -1) return false;
    movies[index] = { ...movies[index], ...updates };
    return true;
  },

  // Issue operations
  getAllIssues: (): Issue[] => {
    return [...issues];
  },

  getActiveIssues: (): Issue[] => {
    return issues.filter(i => !i.returnDate);
  },

  getOverdueIssues: (): Issue[] => {
    const today = new Date().toISOString().split('T')[0];
    return issues.filter(i => !i.returnDate && i.dueDate < today);
  },

  createIssue: (issue: Issue): void => {
    issues.push(issue);
    // Update book availability
    const book = books.find(b => b.serialNo === issue.serialNo);
    if (book) {
      book.availability = BookAvailability.ISSUED;
    }
  },

  returnBook: (serialNo: string, returnDate: string, remarks?: string): Issue | null => {
    const issue = issues.find(i => i.serialNo === serialNo && !i.returnDate);
    if (!issue) return null;

    issue.returnDate = returnDate;
    issue.remarks = remarks;

    // Calculate fine (assuming 1 day = $1 fine after due date)
    const dueDate = new Date(issue.dueDate);
    const retDate = new Date(returnDate);
    const daysOverdue = Math.max(0, Math.floor((retDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)));
    issue.fineAmount = daysOverdue * 1; // $1 per day

    // Update book availability
    const book = books.find(b => b.serialNo === serialNo);
    if (book) {
      book.availability = BookAvailability.AVAILABLE;
    }

    return issue;
  },

  // Fine payment operations
  addFinePayment: (payment: FinePayment): void => {
    finePayments.push(payment);
    // Update issue fine amount to 0 after payment
    const issue = issues.find(i => 
      i.membershipNumber === payment.membershipNumber && 
      i.bookName === payment.bookName &&
      !i.returnDate
    );
    if (issue) {
      issue.fineAmount = 0;
    }
  }
};
