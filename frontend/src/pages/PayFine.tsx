import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { memberService, fineService } from '../services/api';
import Chart from '../components/Chart';

const PayFine: React.FC = () => {
  const [membershipNumber, setMembershipNumber] = useState('');
  const [bookName, setBookName] = useState('');
  const [fineAmount, setFineAmount] = useState(0);
  const [paymentMode, setPaymentMode] = useState('');
  const [members, setMembers] = useState<any[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadMembers();
    const state = (location.state as any);
    if (state) {
      if (state.membershipNumber) setMembershipNumber(state.membershipNumber);
      if (state.bookName) setBookName(state.bookName);
      if (state.fineAmount) setFineAmount(state.fineAmount);
    }
  }, [location]);

  const loadMembers = async () => {
    try {
      const response = await memberService.getAll();
      if (response.success) {
        setMembers(response.data);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!membershipNumber || !bookName || !fineAmount || !paymentMode) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fineService.pay({
        membershipNumber,
        bookName,
        fineAmount,
        paymentMode
      });

      if (response.success) {
        navigate('/confirmation', { state: { message: 'Fine paid successfully' } });
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
          <h2>Pay Fine</h2>
          <form onSubmit={handlePay}>
            <div className="form-group">
              <label htmlFor="membershipNumber">Membership Number</label>
              <select
                id="membershipNumber"
                value={membershipNumber}
                onChange={(e) => setMembershipNumber(e.target.value)}
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
              <label htmlFor="bookName">Book Name</label>
              <input
                type="text"
                id="bookName"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fineAmount">Fine Amount</label>
              <input
                type="number"
                id="fineAmount"
                value={fineAmount}
                readOnly
                className="read-only-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor="paymentMode">Payment Mode *</label>
              <select
                id="paymentMode"
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                required
              >
                <option value="">Select Payment Mode</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Online">Online</option>
              </select>
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="button-group">
              <button type="submit" className="btn btn-primary">Pay</button>
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

export default PayFine;
