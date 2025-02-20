// pages/loans/[id].js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const LoanDetail = () => {
  const [loan, setLoan] = useState({ name:'', amount: 0});
  const router = useRouter();
  const { id } = router.query; // Get loan ID from URL

  useEffect(() => {
    if (id) {
      // Define the type for the loan object
      type Loan = {
        id: string | string[];
        name: string;
        amount: number;
      };

      // Fetch loan details here (simulated with static data for now)
      const fetchedLoan: Loan = { id, name: `Loan ${id}`, amount: 1000 * Number(id) };
      setLoan(fetchedLoan);
    }
  }, [id]);

  if (!loan) return <div>Loading...</div>;

  return (
    <div>
      <h1>Loan Detail</h1>
      <p><strong>Name:</strong> {loan.name}</p>
      <p><strong>Amount:</strong> ${loan.amount}</p>
      <a href="/loans">Back to Loan List</a>
    </div>
  );
};

export default LoanDetail;
