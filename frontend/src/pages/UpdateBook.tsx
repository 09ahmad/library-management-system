import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { bookService } from '../services/api';

const UpdateBook: React.FC = () => {
  const [bookName, setBookName] = useState('');
  const [serialNo, setSerialNo] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [books, setBooks] = useState<any[]>([]);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadBooks();
    const book = (location.state as any)?.book;
    if (book) {
      setBookName(book.bookName);
      setSerialNo(book.serialNo);
      setAuthor(book.author);
      setCategory(book.category);
      setSelectedBook(book);
    }
  }, [location]);

  useEffect(() => {
    if (serialNo) {
      const book = books.find(b => b.serialNo === serialNo);
      if (book) {
        setSelectedBook(book);
        setBookName(book.bookName);
        setAuthor(book.author);
        setCategory(book.category);
      }
    }
  }, [serialNo, books]);

  const loadBooks = async () => {
    try {
      const response = await bookService.getAll();
      if (response.success) {
        setBooks(response.data);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!serialNo) {
      setError('Serial number is required');
      return;
    }

    try {
      const response = await bookService.update(serialNo, {
        bookName,
        author,
        category
      });

      if (response.success) {
        navigate('/confirmation', { state: { message: 'Book updated successfully' } });
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    navigate('/maintenance');
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="form-container">
          <h2>Update Book</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="bookName">Book Name</label>
              <select
                id="bookName"
                value={serialNo}
                onChange={(e) => setSerialNo(e.target.value)}
              >
                <option value="">Select Book</option>
                {books.map((book) => (
                  <option key={book.serialNo} value={book.serialNo}>
                    {book.bookName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="serialNo">Serial No</label>
              <select
                id="serialNo"
                value={serialNo}
                onChange={(e) => setSerialNo(e.target.value)}
              >
                <option value="">Select Serial No</option>
                {books.map((book) => (
                  <option key={book.serialNo} value={book.serialNo}>
                    {book.serialNo}
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
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="button-group">
              <button type="submit" className="btn btn-primary">Update</button>
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

export default UpdateBook;
