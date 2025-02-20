import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { amount, interest, term, clientId, newClient } = await request.json();

    // Validate the input data
    if (!amount || !interest || !term || (!clientId && !newClient)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let client;

    if (clientId) {
      // Check if the client exists
      client = await prisma.client.findUnique({
        where: { id: parseInt(clientId, 10) },
      });

      if (!client) {
        return NextResponse.json({ error: 'Client not found' }, { status: 404 });
      }
    } else if (newClient) {
      // Create a new client
      client = await prisma.client.create({
        data: newClient,
      });
    }

    // Create a new loan record associated with the client
    const newLoan = await prisma.loan.create({
      data: {
        amount,
        interest,
        term,
        clientId: client.id,
      },
    });

    return NextResponse.json(newLoan, { status: 201 });
  } catch (error) {
    console.error('Error creating loan:', error?.stack || error || 'Unknown error');
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const loans = await prisma.loan.findMany();
    return NextResponse.json(loans, { status: 200 });
  } catch (error) {
    console.error('Error fetching loans:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }

  
}
