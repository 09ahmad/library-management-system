import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { issueService } from '../services/api';
import Chart from '../components/Chart';

const OverdueReturn: React.FC = () => {
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadOverdueIssues();
  }, []);

  const loadOverdueIssues = async () => {
    try {
      const response = await issueService.getOverdue();
      if (response.success) {
        setIssues(response.data);
      }
    } catch (error) {
      console.error('Error loading overdue issues:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/transactions');
  };

  if (loading) {
    return <div className="main-content">Loading...</div>;
  }

  return (
    <div className="app-container">
      <div className="main-content">
        <Chart />
        <div className="table-container">
          <h2>Overdue Return (Read-only)</h2>
          {issues.length === 0 ? (
            <p>No overdue returns found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Membership Number</th>
                  <th>Book Name</th>
                  <th>Serial No</th>
                  <th>Issue Date</th>
                  <th>Due Date</th>
                  <th>Overdue Days</th>
                  <th>Fine Amount</th>
                </tr>
              </thead>
              <tbody>
                {issues.map((issue) => (
                  <tr key={issue.id}>
                    <td>{issue.membershipNumber}</td>
                    <td>{issue.bookName}</td>
                    <td>{issue.serialNo}</td>
                    <td>{issue.issueDate}</td>
                    <td>{issue.dueDate}</td>
                    <td>{issue.overdueDays || 0}</td>
                    <td>${issue.fineAmount || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="button-group" style={{ marginTop: '20px' }}>
            <button className="btn btn-secondary" onClick={handleBack}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverdueReturn;
