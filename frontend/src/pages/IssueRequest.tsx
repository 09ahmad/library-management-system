import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { memberService, bookService, issueService } from '../services/api';
import Chart from '../components/Chart';

const IssueRequest: React.FC = () => {
  const [membershipNumber, setMembershipNumber] = useState('');
  const [bookName, setBookName] = useState('');
  const [serialNo, setSerialNo] = useState('');
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [members, setMembers] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadData();
    const selectedBook = (location.state as any)?.selectedBook;
    if (selectedBook) {
      setBookName(selectedBook.bookName);
      setSerialNo(selectedBook.serialNo);
    }
  }, [location]);

  const loadData = async () => {
    try {
      const [membersRes, booksRes] = await Promise.all([
        memberService.getAll(),
        bookService.getAll()
      ]);
      if (membersRes.success) setMembers(membersRes.data.filter((m: any) => m.status === 'Active')));
      if (booksRes.success) setBooks(booksRes.data.filter((b: any) => b.availability === 'Available'));
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleBookChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBookName = e.target.value;
    setBookName(selectedBookName);
    const book = books.find(b => b.bookName === selectedBookName);
    if (book) {
      setSerialNo(book.serialNo);
    }
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!membershipNumber || !bookName || !serialNo) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await issueService.create({
        membershipNumber,
        bookName,
        serialNo,
        issueDate
      });

      if (response.success) {
        navigate('/confirmation', { state: { message: 'Book issued successfully' } });
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
          <h2>Issue Request</h2>
          <form onSubmit={handleConfirm}>
            <div className="form-group">
              <label htmlFor="membershipNumber">Membership Number *</label>
              <select
                id="membershipNumber"
                value={membershipNumber}
                onChange={(e) => setMembershipNumber(e.target.value)}
                required
              >
                <option value="">Select Membership</option>
                {members.map((member) => (
                  <option key={member.membershipNumber} value={member.membershipNumber}>
                    {member.membershipNumber} - {member.memberName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="bookName">Book Name *</label>
              <select
                id="bookName"
                value={bookName}
                onChange={handleBookChange}
                required
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
              <label htmlFor="serialNo">Serial No *</label>
              <select
                id="serialNo"
                value={serialNo}
                onChange={(e) => setSerialNo(e.target.value)}
                required
              >
                <option value="">Select Serial No</option>
                {books
                  .filter(b => b.bookName === bookName)
                  .map((book) => (
                    <option key={book.serialNo} value={book.serialNo}>
                      {book.serialNo}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="issueDate">Issue Date</label>
              <input
                type="date"
                id="issueDate"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="read-only-field"
                readOnly
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="button-group">
              <button type="submit" className="btn btn-primary">Confirm</button>
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

export default IssueRequest;
