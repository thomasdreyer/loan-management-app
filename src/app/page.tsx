import React from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  // Render your authenticated content here
  return (
    <div>
      <h1>Welcome, {session.user?.name}</h1>
      {/* Your content */}
    </div>
  );
}
