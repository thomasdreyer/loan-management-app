'use client';
import React from 'react';
// import { useSession } from 'next-auth/react';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui/card";


export default function Dashboard() {
    const sampleLoanId = "123"; // Replace with dynamic data
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === 'loading') return; // Don't do anything while loading

//     if (!data?.session) {
//       // If there is no session, redirect to sign-in
//       router.push('/auth/signin');
//     }
//   }, [session, status, router]); // Dependency array ensures this runs after session and status changes

  if (status === 'loading') {
    return <div>Loading...</div>; // Or a loader spinner
  }



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Loan Management Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-4">
            <CardTitle>Loan List</CardTitle>
            <p>View all loans in the system.</p>
            <Link href="/loans/loans_list" className="text-blue-500 hover:underline">
              Go to Loan List
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <CardTitle>Create Loan</CardTitle>
            <p>Add a new loan to the system.</p>
            <Link href="/loans/loan_application" className="text-blue-500 hover:underline">
              Create Loan
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <CardTitle>Loan Details</CardTitle>
            <p>View detailed information of a loan.</p>
            <Link href={`/loans/loans_details/${sampleLoanId}`} className="text-blue-500 hover:underline">
              Loan Details
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
