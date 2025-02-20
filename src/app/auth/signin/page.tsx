'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Import the router for programmatic navigation
import { Button } from '@/components/ui/button';

export default function SignIn() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Get the router instance

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    const response = await signIn('credentials', {
      email,
      password,
      redirect: false, // Don't redirect automatically, handle it manually
    });

    if (response?.error) {
      setError(response.error); // Set the error message if login fails
    } else {
      // Redirect to the dashboard or any other page after successful login
      router.push('/dashboard'); // Use router.push to navigate programmatically
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={(e) => handleSignIn(e)} className="p-4 border rounded">
        <h1 className="text-2xl mb-4">Sign In</h1>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="mb-2 p-2 border"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="mb-2 p-2 border"
        />
        <Button variant="destructive" type="submit" className="p-2 bg-blue-500 text-white">
          Sign In
        </Button>
        {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error */}
      </form>
    </div>
  );
}
