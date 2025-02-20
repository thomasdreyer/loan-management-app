import React from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

  import { SessionProvider } from 'next-auth/react';
  import type { AppProps } from 'next/app';
  
  export default async function Home({ Component, pageProps }: AppProps) {
    const session = await getServerSession(authOptions);

    if (!session) {
      redirect('/auth/signin');
    }
    return (
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    );
  }
  
