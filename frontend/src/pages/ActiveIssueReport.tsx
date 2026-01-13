import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { issueService } from '../services/api';

const ActiveIssueReport: React.FC = () => {
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadActiveIssues();
  }, []);

  const loadActiveIssues = async () => {
    try {
      const response = await issueService.getActive();
      if (response.success) {
        setIssues(response.data);
      }
    } catch (error) {
      console.error('Error loading active issues:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/reports');
  };

  if (loading) {
    return <div className="main-content">Loading...</div>;
  }

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="table-container">
          <h2>Active Issue Report (Read-only)</h2>
          <div className="button-group" style={{ marginBottom: '20px' }}>
            <button className="btn btn-secondary" onClick={handleBack}>Back</button>
          </div>
          {issues.length === 0 ? (
            <p>No active issues found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Membership Number</th>
                  <th>Book Name</th>
                  <th>Serial No</th>
                  <th>Issue Date</th>
                  <th>Due Date</th>
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

export default ActiveIssueReport;
