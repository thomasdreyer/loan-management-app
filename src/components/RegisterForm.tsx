'use client';
import React from 'react';
import { useState } from 'react';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'TELLER', // Default role
    branch: '',
    department: '',
    accessLevel: 1,
  });

  const [message, setMessage] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage('User created successfully!');
    } else {
      setMessage(`Error: ${data.error}`);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Create a User</h2>
      {message && <p className="text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required className="w-full border p-2 mb-2" />
        <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required className="w-full border p-2 mb-2" />
        <input type="password" placeholder="Password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required className="w-full border p-2 mb-2" />
        <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full border p-2 mb-2">
          <option value="TELLER">TELLER</option>
          <option value="MANAGER">MANAGER</option>
          <option value="ADMIN">ADMIN</option>
          <option value="AUDITOR">AUDITOR</option>
        </select>
        <input type="text" placeholder="Branch" value={formData.branch} onChange={e => setFormData({ ...formData, branch: e.target.value })} className="w-full border p-2 mb-2" />
        <input type="text" placeholder="Department" value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} className="w-full border p-2 mb-2" />
        <input type="number" placeholder="Access Level" value={formData.accessLevel} onChange={e => setFormData({ ...formData, accessLevel: Number(e.target.value) })} className="w-full border p-2 mb-2" />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Create User</button>
      </form>
    </div>
  );
}
