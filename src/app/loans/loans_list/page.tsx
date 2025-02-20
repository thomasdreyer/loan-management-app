// src/components/LoanList.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable } from './DataTable';
import { columns, Loan } from './columns';

const LoanList = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch('/api/loans');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setLoans(data);
      } catch (error) {
        console.error('Failed to fetch loans:', error);
      }
    };

    fetchLoans();
  }, []);

  const handleRowClick = (loan: Loan) => {
    router.push(`/loans/loan_details/${loan.id}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Loan List</h1>
      <DataTable columns={columns} data={loans} onRowClick={handleRowClick} />
    </div>
  );
};

export default LoanList;
