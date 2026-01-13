import React from 'react';
import { useNavigate } from 'react-router-dom';

const Instructions: React.FC = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    // Navigate based on user role - will be handled by App routing
    navigate('/home');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="form-container">
          <h2>Instructions</h2>
          <div className="info-box">
            <h3>Welcome to Library Management System</h3>
            <p>Please read the following instructions:</p>
            <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
              <li>Use the navigation menu to access different features</li>
              <li>Admin users have access to all features including Maintenance</li>
              <li>Regular users can access Transactions and Reports only</li>
              <li>All mandatory fields are marked with an asterisk (*)</li>
              <li>Please ensure all information is accurate before submitting</li>
            </ul>
          </div>
          <div className="button-group">
            <button className="btn btn-primary" onClick={handleContinue}>
              Continue
            </button>
            <button className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
