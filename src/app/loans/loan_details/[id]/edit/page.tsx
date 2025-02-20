"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditLoan() {
  const { id } = useParams();
  const router = useRouter();
  const [loan, setLoan] = useState({
    amount: "",
    interest: "",
    term: "",
    status: "pending",
  });
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch loan details
  useEffect(() => {
    if (id) {
      fetch(`/api/loans/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) throw new Error(data.error);
          setLoan({
            amount: data.amount || "",
            interest: data.interest || "",
            term: data.term || "",
            status: data.status || "pending",
          });
          setClient(data.client); // Store client details
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const res = await fetch(`/api/loans/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" }, // ✅ Ensure JSON content type
        body: JSON.stringify({
          amount: loan.amount,
          interest: loan.interest,
          term: loan.term,
          status: loan.status,
        }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update loan");
      }
  
      router.push(`/loans/loan_details/${id}`); // Redirect after update
    } catch (err) {
      setError(err.message);
    }
  };
  

  // Handle input changes
  const handleChange = (e) => {
    setLoan({ ...loan, [e.target.name]: e.target.value });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Loan</h2>
      {client && (
        <p className="text-gray-600 mb-4">
          Editing loan for <strong>{client.name} ({client.email})</strong>
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="amount"
          value={loan.amount}
          onChange={handleChange}
          placeholder="Loan Amount"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="interest"
          value={loan.interest}
          onChange={handleChange}
          placeholder="Interest Rate (%)"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="term"
          value={loan.term}
          onChange={handleChange}
          placeholder="Term (Months)"
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="status"
          value={loan.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="completed">Completed</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Update Loan
        </button>
      </form>
    </div>
  );
}
