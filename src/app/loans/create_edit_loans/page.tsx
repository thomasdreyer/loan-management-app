// pages/create-edit-loan.js
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface CreateEditLoansProps {
  loanId: number;
}

const CreateEditLoans: React.FC<CreateEditLoansProps> = ({ loanId }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [loan, setLoan] = useState<{ id: number; name: string; amount: number } | null>(null);

  useEffect(() => {
    if (loanId) {
      // Fetch loan data if editing an existing loan (simulated)
      const fetchedLoan = { id: loanId, name: `Loan ${loanId}`, amount: 1000 * loanId };
      setLoan(fetchedLoan);
    }
  }, [loanId]);

  const onSubmit = (data: object) => {
    console.log(data);
    // Send data to backend to save or update the loan
  };

  useEffect(() => {
    if (loan) {
      setValue('name', loan.name);
      setValue('amount', loan.amount);
    }
  }, [loan, setValue]);

  return (
    <div>
      <h1>{loanId ? 'Edit Loan' : 'Create Loan'}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>
          <input {...register('name', { required: true })} />
        </div>
        <div>
          <label>Amount:</label>
          <input {...register('amount')} type="number" />
        </div>
        <button type="submit">{loanId ? 'Update Loan' : 'Create Loan'}</button>
      </form>
    </div>
  );
};

export default CreateEditLoans;
