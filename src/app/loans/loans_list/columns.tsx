"use client";
import React from 'react';
import { ColumnDef } from "@tanstack/react-table";

export type Loan = {
  id: number;
  name: string;
  amount: number;
};

export const columns: ColumnDef<Loan>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Loan Name",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const value = row.getValue("amount");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(Number(value));
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];
