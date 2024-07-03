// src/components/TransactionList.tsx
import React from "react";
import { Transaction } from "src/app/types/back";

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList = ({ transactions }: TransactionListProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <span>{transaction.amount}</span>
            <span>{transaction.entityName}</span>
            <span>{transaction.date.getTime().toString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;

// src/components/AddTransaction.tsx
