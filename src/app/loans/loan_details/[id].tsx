// pages/loans/loan_details/[id].tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const LoanDetails = () => {
  const [loan, setLoan] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    const fetchLoanDetails = async () => {
      try {
        const response = await fetch(`/api/loans/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch loan details');
        }
        const data = await response.json();
        setLoan(data);
      } catch (error) {
        setError(error?.message);
      }
    };

    fetchLoanDetails();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!loan) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Loan Details</h1>
      <p><strong>Client:</strong> {loan.client}</p>
      <p><strong>Amount:</strong> {loan.amount}</p>
      <p><strong>Reason:</strong> {loan.reason}</p>
      <p><strong>Loan Agreement:</strong> {loan.loanAgreement}</p>
      <p><strong>Payment Overview:</strong> {loan.paymentOverview}</p>
    </div>
  );
};

export default LoanDetails;
