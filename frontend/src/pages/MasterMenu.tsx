import React from 'react';
import { useNavigate } from 'react-router-dom';

const MasterMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="form-container">
          <h2>Master Menu</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button className="btn btn-primary" onClick={() => navigate('/master/books')}>
              Books
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/master/movies')}>
              Movies
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/master/membership')}>
              Membership
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

export default MasterMenu;
