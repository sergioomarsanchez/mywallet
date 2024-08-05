import React from "react";
import type { LatestTransaction } from "@/lib/actions";
import LatestTransactionRow from "./latestTransactionRow";

interface TransactionsContainerProps {
  title: string;
  transactions: LatestTransaction[];
}

const TransactionsContainer = ({ title, transactions }: TransactionsContainerProps) => {
  return (
    <div>
      <h2 className="text-lg font-bold">{title}</h2>
      {transactions.map((transaction) => (
        <LatestTransactionRow key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};

export default TransactionsContainer;
