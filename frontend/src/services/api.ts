const API_BASE_URL = '/api';

// Helper function for API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
}

export const authService = {
  login: (username: string, password: string) =>
    apiCall<{ success: boolean; user?: any; message?: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  logout: () =>
    apiCall<{ success: boolean }>('/auth/logout', {
      method: 'POST',
    }),

  getSession: () =>
    apiCall<{ success: boolean; user?: any }>('/auth/session', {
      method: 'GET',
    }),
};

export const bookService = {
  getAll: () =>
    apiCall<{ success: boolean; data: any[] }>('/books'),

  search: (filters: { bookName?: string; author?: string; category?: string }) => {
    const params = new URLSearchParams();
    if (filters.bookName) params.append('bookName', filters.bookName);
    if (filters.author) params.append('author', filters.author);
    if (filters.category) params.append('category', filters.category);
    return apiCall<{ success: boolean; data: any[] }>(`/books/search?${params.toString()}`);
  },

  getBySerial: (serialNo: string) =>
    apiCall<{ success: boolean; data: any }>(`/books/${serialNo}`),

  add: (book: any) =>
    apiCall<{ success: boolean; data: any; message?: string }>('/books', {
      method: 'POST',
      body: JSON.stringify(book),
    }),

  update: (serialNo: string, updates: any) =>
    apiCall<{ success: boolean; data: any; message?: string }>(`/books/${serialNo}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),
};

export const memberService = {
  getAll: () =>
    apiCall<{ success: boolean; data: any[] }>('/members'),

  getByNumber: (membershipNumber: string) =>
    apiCall<{ success: boolean; data: any }>(`/members/${membershipNumber}`),

  add: (member: any) =>
    apiCall<{ success: boolean; data: any; message?: string }>('/members', {
      method: 'POST',
      body: JSON.stringify(member),
    }),

  update: (membershipNumber: string, updates: any) =>
    apiCall<{ success: boolean; data: any; message?: string }>(`/members/${membershipNumber}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),
};

export const issueService = {
  getAll: () =>
    apiCall<{ success: boolean; data: any[] }>('/issues'),

  getActive: () =>
    apiCall<{ success: boolean; data: any[] }>('/issues/active'),

  getOverdue: () =>
    apiCall<{ success: boolean; data: any[] }>('/issues/overdue'),

  create: (issue: any) =>
    apiCall<{ success: boolean; data: any; message?: string }>('/issues', {
      method: 'POST',
      body: JSON.stringify(issue),
    }),

  returnBook: (data: any) =>
    apiCall<{ success: boolean; data: any; message?: string; fineAmount?: number }>('/issues/return', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export const fineService = {
  pay: (payment: any) =>
    apiCall<{ success: boolean; data: any; message?: string }>('/fines/pay', {
      method: 'POST',
      body: JSON.stringify(payment),
    }),
};

export const movieService = {
  getAll: () =>
    apiCall<{ success: boolean; data: any[] }>('/movies'),

  add: (movie: any) =>
    apiCall<{ success: boolean; data: any; message?: string }>('/movies', {
      method: 'POST',
      body: JSON.stringify(movie),
    }),

  update: (serialNo: string, updates: any) =>
    apiCall<{ success: boolean; data: any; message?: string }>(`/movies/${serialNo}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),
};

export const userService = {
  getAll: () =>
    apiCall<{ success: boolean; data: any[] }>('/users'),

  add: (user: any) =>
    apiCall<{ success: boolean; data: any; message?: string }>('/users', {
      method: 'POST',
      body: JSON.stringify(user),
    }),

  update: (userId: string, updates: any) =>
    apiCall<{ success: boolean; data: any; message?: string }>(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),
};
