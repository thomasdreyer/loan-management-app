'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  let errorMessage = 'An unexpected error occurred. Please try again.';
  if (error === 'OAuthAccountNotLinked') {
    errorMessage = 'An account with your email already exists using a different sign-in method.';
  } else if (error === 'CredentialsSignin') {
    errorMessage = 'Sign in failed. Please check your credentials and try again.';
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Authentication Error</h1>
      <p className="text-red-600 mb-4">{errorMessage}</p>
      <Link href="/auth/signin">
        <span className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Try Signing In Again
        </span>
      </Link>
    </div>
  );
}
