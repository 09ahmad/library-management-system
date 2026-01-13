import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReportsMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="form-container">
          <h2>Reports Menu</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button className="btn btn-primary" onClick={() => navigate('/reports/active-issue')}>
              Active Issue Report
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/reports/overdue-return')}>
              Overdue Return Report
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/home')}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsMenu;
