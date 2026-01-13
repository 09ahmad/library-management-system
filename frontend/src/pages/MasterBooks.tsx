import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookService } from '../services/api';

const MasterBooks: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const response = await bookService.getAll();
      if (response.success) {
        setBooks(response.data);
      }
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    navigate('/maintenance/add-book');
  };

  const handleUpdate = (book: any) => {
    navigate('/maintenance/update-book', { state: { book } });
  };

  const handleBack = () => {
    navigate('/master');
  };

  if (loading) {
    return <div className="main-content">Loading...</div>;
  }

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="table-container">
          <h2>Master List - Books</h2>
          <div className="button-group" style={{ marginBottom: '20px' }}>
            <button className="btn btn-primary" onClick={handleAdd}>Add</button>
            <button className="btn btn-secondary" onClick={handleBack}>Back</button>
          </div>
          {books.length === 0 ? (
            <p>No books found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Book Name</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Serial No</th>
                  <th>Availability</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.serialNo}>
                    <td>{book.bookName}</td>
                    <td>{book.author}</td>
                    <td>{book.category}</td>
                    <td>{book.serialNo}</td>
                    <td>{book.availability}</td>
                    <td>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleUpdate(book)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default MasterBooks;
