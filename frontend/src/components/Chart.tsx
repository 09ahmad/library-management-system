import React from 'react';
import { Link } from 'react-router-dom';

const Chart: React.FC = () => {
  return (
    <div className="chart-panel">
      <h3>Transaction Navigation</h3>
      <ul>
        <li>
          <Link to="/transactions/book-available">Is book available?</Link>
        </li>
        <li>
          <Link to="/transactions/issue-request">Issue book?</Link>
        </li>
        <li>
          <Link to="/transactions/return-book">Return book?</Link>
        </li>
        <li>
          <Link to="/transactions/pay-fine">Pay fine?</Link>
        </li>
      </ul>
    </div>
  );
};

export default Chart;
