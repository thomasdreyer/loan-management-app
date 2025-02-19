// src/app/auth/signin/page.tsx
'use client';
import React from 'react';
import { signIn } from 'next-auth/react';

export default function SignIn() {
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const username = form.username.value;
    const password = form.password.value;
    signIn('credentials', { username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSignIn} className="p-4 border rounded">
        <h1 className="text-2xl mb-4">Sign In</h1>
        <input
          name="username"
          type="text"
          placeholder="Username"
          className="mb-2 p-2 border"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="mb-2 p-2 border"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white">
          Sign In
        </button>
      </form>
    </div>
  );
}
