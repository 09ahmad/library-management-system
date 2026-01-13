import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { memberService } from '../services/api';

const UpdateMembership: React.FC = () => {
  const [membershipNumber, setMembershipNumber] = useState('');
  const [extendMembership, setExtendMembership] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [newEndDate, setNewEndDate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadMembers();
  }, []);

  useEffect(() => {
    if (membershipNumber) {
      const member = members.find(m => m.membershipNumber === membershipNumber);
      setSelectedMember(member);
      if (member && extendMembership) {
        const currentEnd = new Date(member.endDate);
        currentEnd.setMonth(currentEnd.getMonth() + 6);
        setNewEndDate(currentEnd.toISOString().split('T')[0]);
      }
    }
  }, [membershipNumber, extendMembership, members]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!membershipNumber) {
      setError('Membership number is required');
      return;
    }

    try {
      const response = await memberService.update(membershipNumber, {
        extendMembership
      });

      if (response.success) {
        navigate('/confirmation', { state: { message: 'Membership updated successfully' } });
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
          <h2>Update Membership</h2>
          <form onSubmit={handleSubmit}>
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
            {selectedMember && (
              <div className="info-box">
                <p>Current End Date: {selectedMember.endDate}</p>
              </div>
            )}
            <div className="form-group">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="extendMembership"
                  checked={extendMembership}
                  onChange={(e) => setExtendMembership(e.target.checked)}
                />
                <label htmlFor="extendMembership">Extend Membership</label>
              </div>
            </div>
            {extendMembership && newEndDate && (
              <div className="form-group">
                <label htmlFor="newEndDate">New End Date</label>
                <input
                  type="date"
                  id="newEndDate"
                  value={newEndDate}
                  readOnly
                  className="read-only-field"
                />
              </div>
            )}
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

export default UpdateMembership;
