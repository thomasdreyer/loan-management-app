'use client';
import { useState } from 'react';

const LoanForm = () => {
  const [amount, setAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [term, setTerm] = useState('');
  const [clientId, setClientId] = useState('');
  const [newClientName, setNewClientName] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loanData = {
      amount: parseFloat(amount),
      interest: parseFloat(interest),
      term: parseInt(term, 10),
      clientId: clientId || null,
      newClient: clientId
        ? null
        : {
            name: newClientName,
            email: newClientEmail,
          },
    };

    try {
      const response = await fetch('/api/loans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loanData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const newLoan = await response.json();
      console.log('Loan created successfully:', newLoan);
      // Reset form fields after successful submission
      setAmount('');
      setInterest('');
      setTerm('');
      setClientId('');
      setNewClientName('');
      setNewClientEmail('');
    } catch (error) {
      console.error('Failed to create loan:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Interest"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Term"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Existing Client ID (leave blank to create new client)"
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
      />
      {!clientId && (
        <>
          <input
            type="text"
            placeholder="New Client Name"
            value={newClientName}
            onChange={(e) => setNewClientName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="New Client Email"
            value={newClientEmail}
            onChange={(e) => setNewClientEmail(e.target.value)}
            required
          />
        </>
      )}
      <button type="submit">Create Loan</button>
    </form>
  );
};

export default LoanForm;
