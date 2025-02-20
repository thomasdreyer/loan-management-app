'use client';
import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';

export default function Dashboard() {
  const cards = [
    {
      title: 'Loan List',
      description: 'View all loans.',
      href: '/loans/loans_list',
      linkText: 'Go to Loan List',
    },
    {
      title: 'Create Loan',
      description: 'Add a new loan.',
      href: '/loans/loan_application',
      linkText: 'Create Loan',
    },
    // Add more cards as needed
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Loan Management Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">{card.title}</CardTitle>
              <CardDescription className="mt-2 text-gray-600">
                {card.description}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href={card.href}>
                <span className="text-blue-500 hover:underline">
                  {card.linkText}
                </span>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
