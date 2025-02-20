'use client';
import React, { useState } from 'react';

const LoanRequestsPage = () => {
  const [requests, setRequests] = useState([
    { id: "1", name: "John Doe", amount: "R50,000", approved: false },
    { id: "2", name: "Jane Smith", amount: "R30,000", approved: false },
  ]);

  const approveLoan = (id: string) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, approved: true } : req))
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Loan Approval</h1>
      <ul className="mt-4">
        {requests.map((req) => (
          <li key={req.id} className="border p-2 my-2">
            <p>{req.name} - {req.amount}</p>
            <button
              onClick={() => approveLoan(req.id)}
              className={`px-4 py-2 mt-2 ${req.approved ? "bg-gray-500" : "bg-green-500"} text-white`}
              disabled={req.approved}
            >
              {req.approved ? "Approved" : "Approve Loan"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoanRequestsPage;
