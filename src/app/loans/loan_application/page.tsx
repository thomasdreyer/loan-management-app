'use client';
import React, { useState } from 'react';

const LoanApplicationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    loanType: "Personal Loan",
  });

  const loanTypes = ["Personal Loan", "Car Loan", "Home Loan", "Business Loan"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Loan Application Submitted: ${JSON.stringify(formData)}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Apply for a Loan</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Loan Amount"
          value={formData.amount}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <select
          name="loanType"
          value={formData.loanType}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          {loanTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default LoanApplicationPage;
