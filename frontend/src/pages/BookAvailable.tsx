import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookService } from '../services/api';
import Chart from '../components/Chart';

const BookAvailable: React.FC = () => {
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [books, setBooks] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const response = await bookService.getAll();
      if (response.success) {
        setBooks(response.data);
        const uniqueCategories = [...new Set(response.data.map((b: any) => b.category))];
        setCategories(uniqueCategories);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!bookName && !author && !category) {
      setError('At least one field is required');
      return;
    }

    try {
      const filters: any = {};
      if (bookName) filters.bookName = bookName;
      if (author) filters.author = author;
      if (category) filters.category = category;

      const response = await bookService.search(filters);
      if (response.success) {
        navigate('/transactions/search-result', { state: { results: response.data } });
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    navigate('/transactions');
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <Chart />
        <div className="form-container">
          <h2>Book Available</h2>
          <form onSubmit={handleSearch}>
            <div className="form-group">
              <label htmlFor="bookName">Book Name</label>
              <select
                id="bookName"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
              >
                <option value="">Select Book</option>
                {books.map((book) => (
                  <option key={book.serialNo} value={book.bookName}>
                    {book.bookName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="button-group">
              <button type="submit" className="btn btn-primary">Search</button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAvailable;
