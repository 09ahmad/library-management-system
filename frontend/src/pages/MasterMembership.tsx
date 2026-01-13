import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { memberService } from '../services/api';

const MasterMembership: React.FC = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const response = await memberService.getAll();
      if (response.success) {
        setMembers(response.data);
      }
    } catch (error) {
      console.error('Error loading members:', error);
    } finally {
      setLoading(false);
    }
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
          <h2>Master List - Membership</h2>
          <div className="button-group" style={{ marginBottom: '20px' }}>
            <button className="btn btn-secondary" onClick={handleBack}>Back</button>
          </div>
          {members.length === 0 ? (
            <p>No members found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Membership Number</th>
                  <th>Member Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.membershipNumber}>
                    <td>{member.membershipNumber}</td>
                    <td>{member.memberName}</td>
                    <td>{member.startDate}</td>
                    <td>{member.endDate}</td>
                    <td>{member.status}</td>
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

export default MasterMembership;
