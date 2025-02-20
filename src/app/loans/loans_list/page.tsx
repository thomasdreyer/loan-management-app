'use client';
import React, { useEffect, useState } from 'react';

const LoanList = () => {
  const [loans, setLoans] = useState([{ id: 0, name: 'Loan 1', amount: 1000 }]);

  useEffect(() => {
    // Fetch loan data here (simulated with a static array for now)
    const fetchedLoans = [
      { id: 1, name: 'Loan 1', amount: 1000 },
      { id: 2, name: 'Loan 2', amount: 1500 },
    ];
    setLoans(fetchedLoans);
  }, []);

  return (
    <div>
      <h1>Loan List</h1>
      <ul>
        {loans.map((loan) => (
          <li key={loan.id}>
            <a href={`/loans/${loan.id}`}>{loan.name} - ${loan.amount}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoanList;
