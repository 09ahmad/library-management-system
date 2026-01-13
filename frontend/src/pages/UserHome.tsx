import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserHome: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="app-container">
      <nav className="nav-menu">
        <ul>
          <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/transactions'); }}>Transactions</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/reports'); }}>Reports</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Log Out</a></li>
        </ul>
      </nav>
      <div className="main-content">
        <h1>User Home Page</h1>
        <div className="info-box">
          <p>Welcome to the User Dashboard. Use the navigation menu above to access different features.</p>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
