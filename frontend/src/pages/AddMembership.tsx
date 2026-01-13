import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { memberService } from '../services/api';

const AddMembership: React.FC = () => {
  const [memberName, setMemberName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!memberName || !startDate) {
      setError('Member name and start date are required');
      return;
    }

    try {
      const response = await memberService.add({
        memberName,
        address,
        phoneNo,
        startDate
      });

      if (response.success) {
        navigate('/confirmation', { state: { message: 'Membership added successfully' } });
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
          <h2>Add Membership</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="memberName">Member Name *</label>
              <input
                type="text"
                id="memberName"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNo">Phone No</label>
              <input
                type="text"
                id="phoneNo"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Start Date *</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="info-box">
              <p>End Date will be automatically calculated (6 months from start date)</p>
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="button-group">
              <button type="submit" className="btn btn-primary">Submit</button>
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

export default AddMembership;
