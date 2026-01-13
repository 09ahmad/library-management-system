import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookService, issueService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Chart from '../components/Chart';

const ReturnBook: React.FC = () => {
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [serialNo, setSerialNo] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [returnDate, setReturnDate] = useState(new Date().toISOString().split('T')[0]);
  const [remarks, setRemarks] = useState('');
  const [books, setBooks] = useState<any[]>([]);
  const [issues, setIssues] = useState<any[]>([]);
  const [fineAmount, setFineAmount] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [booksRes, issuesRes] = await Promise.all([
        bookService.getAll(),
        issueService.getAll()
      ]);
      if (booksRes.success) setBooks(booksRes.data);
      if (issuesRes.success) {
        const activeIssues = issuesRes.data.filter((i: any) => !i.returnDate);
        setIssues(activeIssues);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleBookChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSerialNo = e.target.value;
    setSerialNo(selectedSerialNo);
    
    const book = books.find(b => b.serialNo === selectedSerialNo);
    if (book) {
      setBookName(book.bookName);
      setAuthor(book.author);
    }

    const issue = issues.find(i => i.serialNo === selectedSerialNo);
    if (issue) {
      setIssueDate(issue.issueDate);
    }
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!bookName || !serialNo || !returnDate) {
      setError('Book name, serial number, and return date are required');
      return;
    }

    try {
      const response = await issueService.returnBook({
        serialNo,
        returnDate,
        remarks
      });

      if (response.success) {
        setFineAmount(response.fineAmount || 0);
        if (response.fineAmount && response.fineAmount > 0) {
          // Navigate to pay fine if there's a fine
          navigate('/transactions/pay-fine', {
            state: {
              membershipNumber: issues.find(i => i.serialNo === serialNo)?.membershipNumber,
              bookName,
              fineAmount: response.fineAmount
            }
          });
        } else {
          navigate('/confirmation', { state: { message: 'Book returned successfully' } });
        }
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    navigate('/transactions');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <Chart />
        <div className="form-container">
          <h2>Return Book</h2>
          <form onSubmit={handleConfirm}>
            <div className="form-group">
              <label htmlFor="bookName">Book Name *</label>
              <select
                id="bookName"
                value={serialNo}
                onChange={handleBookChange}
                required
              >
                <option value="">Select Book</option>
                {issues.map((issue) => {
                  const book = books.find(b => b.serialNo === issue.serialNo);
                  return book ? (
                    <option key={issue.serialNo} value={issue.serialNo}>
                      {issue.bookName}
                    </option>
                  ) : null;
                })}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <textarea
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                readOnly
                className="read-only-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor="serialNo">Serial No *</label>
              <select
                id="serialNo"
                value={serialNo}
                onChange={(e) => setSerialNo(e.target.value)}
                required
              >
                <option value="">Select Serial No</option>
                {issues.map((issue) => (
                  <option key={issue.serialNo} value={issue.serialNo}>
                    {issue.serialNo}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="issueDate">Issue Date</label>
              <input
                type="text"
                id="issueDate"
                value={issueDate}
                readOnly
                className="read-only-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor="returnDate">Return Date *</label>
              <input
                type="date"
                id="returnDate"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="remarks">Remarks</label>
              <textarea
                id="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="button-group">
              <button type="submit" className="btn btn-primary">Confirm</button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
              <button type="button" className="btn btn-danger" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReturnBook;
