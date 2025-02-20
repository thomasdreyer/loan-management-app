"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function LoanDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [loan, setLoan] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`/api/loans/${id}`)
        .then((res) => res.json())
        .then((data) => setLoan(data))
        .catch((err) => setError("Error fetching loan details"));
    }
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!loan) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Loan Details</h2>
      <p><strong>Lender:</strong> {loan.lender}</p>
      <p><strong>Borrower:</strong> {loan.borrower}</p>
      <p><strong>Amount:</strong> ${loan.amount}</p>
      <p><strong>Interest:</strong> {loan.interest}%</p>
      <p><strong>Duration:</strong> {loan.duration} months</p>
      <p><strong>Created At:</strong> {new Date(loan.createdAt).toLocaleDateString()}</p>

      <button
        onClick={() => router.push(`/loans/loan_details/${id}/edit`)}
        className="mt-4 bg-green-500 text-white p-2 rounded"
      >
        Edit Loan
      </button>
    </div>
  );
}
