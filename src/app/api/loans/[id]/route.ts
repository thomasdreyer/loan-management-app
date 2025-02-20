import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Ensure Prisma is correctly set up

// 🟢 GET Loan by ID (Fixed `params.id` Extraction)
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    if (!params?.id) return NextResponse.json({ error: "Loan ID is required" }, { status: 400 });

    const loan = await prisma.loan.findUnique({
      where: { id: params.id },
      include: { client: true }, // Include client details
    });

    if (!loan) {
      return NextResponse.json({ error: "Loan not found" }, { status: 404 });
    }

    return NextResponse.json(loan);
  } catch (error) {
    console.error("GET API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// 🟢 PATCH - Update Loan Details (Fixed `params.id` & JSON Body Handling)
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    if (!params?.id) return NextResponse.json({ error: "Loan ID is required" }, { status: 400 });

    // ✅ Safely parse JSON and handle empty body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { amount, interest, term, status } = body;
    if (!amount || !interest || !term || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updatedLoan = await prisma.loan.update({
      where: { id: params.id },
      data: { amount, interest, term, status },
    });

    return NextResponse.json(updatedLoan);
  } catch (error) {
    console.error("PATCH API Error:", error);
    return NextResponse.json({ error: "Failed to update loan" }, { status: 500 });
  }
}
