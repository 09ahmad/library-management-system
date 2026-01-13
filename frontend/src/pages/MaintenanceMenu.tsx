import React from 'react';
import { useNavigate } from 'react-router-dom';

const MaintenanceMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="form-container">
          <h2>Maintenance Menu</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button className="btn btn-primary" onClick={() => navigate('/maintenance/add-membership')}>
              Add Membership
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/maintenance/update-membership')}>
              Update Membership
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/maintenance/add-book')}>
              Add Book
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/maintenance/update-book')}>
              Update Book
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/maintenance/user-management')}>
              User Management
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

export default MaintenanceMenu;
