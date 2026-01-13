import React from 'react';
import { useNavigate } from 'react-router-dom';
import Chart from '../components/Chart';

const TransactionsMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <div className="main-content">
        <Chart />
        <div className="form-container">
          <h2>Transactions Menu</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button className="btn btn-primary" onClick={() => navigate('/transactions/book-available')}>
              Book Available
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/transactions/issue-request')}>
              Issue Request
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/transactions/return-book')}>
              Return Book
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/transactions/pay-fine')}>
              Pay Fine
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/transactions/active-issue')}>
              Active Issue
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/transactions/overdue-return')}>
              Overdue Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsMenu;
