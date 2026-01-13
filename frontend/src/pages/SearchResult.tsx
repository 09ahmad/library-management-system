import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Chart from '../components/Chart';

const SearchResult: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const results = (location.state as any)?.results || [];

  const handleSelect = (book: any) => {
    // Navigate to issue request with selected book
    navigate('/transactions/issue-request', { state: { selectedBook: book } });
  };

  const handleBack = () => {
    navigate('/transactions/book-available');
  };

  const handleCancel = () => {
    navigate('/transactions');
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <Chart />
        <div className="table-container">
          <h2>Search Result</h2>
          {results.length === 0 ? (
            <p>No books found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Book Name</th>
                  <th>Author</th>
                  <th>Serial No</th>
                  <th>Availability</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {results.map((book: any) => (
                  <tr key={book.serialNo}>
                    <td>{book.bookName}</td>
                    <td>{book.author}</td>
                    <td>{book.serialNo}</td>
                    <td>{book.availability}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleSelect(book)}
                        disabled={book.availability !== 'Available'}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="button-group" style={{ marginTop: '20px' }}>
            <button className="btn btn-secondary" onClick={handleBack}>Back</button>
            <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
