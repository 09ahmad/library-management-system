import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Confirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const message = (location.state as any)?.message || 'Operation completed successfully';

  const handleOK = () => {
    navigate('/home');
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="form-container">
          <div className="success-message">
            {message}
          </div>
          <div className="button-group">
            <button className="btn btn-primary" onClick={handleOK}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
