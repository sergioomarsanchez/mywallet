import { getServerSession } from "next-auth";
import { authOption } from "../../lib/auth";
import React from "react";
import CategoriesContainer from "@/components/categories/categoriesContainer";
import {
  fetchLatestCreditTransactionsByUserId,
  fetchLatestDebitTransactionsByUserId,
  getCategoryMovements,
} from "@/lib/actions";
import { addDays } from "date-fns";
import { Currency } from "@prisma/client";
import type { LatestTransaction } from "@/lib/actions";
import TransactionsContainer from "@/components/categories/latestTransactionsContainer";

type CategoryKeys =
  | "Salary"
  | "FreelanceContractWork"
  | "RentalIncome"
  | "Gifts"
  | "Investments"
  | "Housing"
  | "Transportation"
  | "Food"
  | "Entertainment"
  | "Utilities"
  | "Insurance"
  | "Healthcare"
  | "DebtRepayment"
  | "Savings"
  | "Taxes"
  | "Other";

const CategoriesPage = async () => {
  const session = await getServerSession(authOption);
  if (!session || !session.user) {
    return <div>Please log in to view your overview.</div>;
  }

  const userId = session.user.id;
  const initialMonth = addDays(new Date(), 1);
  const initialCurrency = "USD";

  const data = await getCategoryMovements(
    userId,
    initialMonth,
    initialCurrency
  );

  const creditTransactions: LatestTransaction[] =
    await fetchLatestCreditTransactionsByUserId(userId);
  const debitTransactions: LatestTransaction[] =
    await fetchLatestDebitTransactionsByUserId(userId);

  const incomeData = Object.entries(data.income).map(([category, amount]) => ({
    category: category as CategoryKeys,
    amount,
  }));

  const spendingData = Object.entries(data.spending).map(
    ([category, amount]) => ({
      category: category as CategoryKeys,
      amount,
    })
  );

  return (
    <main className="flex min-h-[80vh] flex-col justify-start px-2 md:p-5 lg:ml-10">
      <div className="flex w-full justify-center md:pt-5">
        <div className="w-full pb-12 lg:pb-4">
          <CategoriesContainer
            userId={userId}
            initialIncomeData={incomeData}
            initialSpendingData={spendingData}
            initialMonth={initialMonth}
            initialCurrency={initialCurrency}
          />
        </div>
      </div>
      <div className="flex gap-10 w-full justify-center md:pt-5">
        <div className="w-1/2 pb-12 lg:pb-4">
          <TransactionsContainer
            title="Latest Credit Transactions"
            transactions={creditTransactions}
          />
        </div>
        <div className="w-1/2 pb-12 lg:pb-4">
          <TransactionsContainer
            title="Latest Debit Transactions"
            transactions={debitTransactions}
          />
        </div>
      </div>
    </main>
  );
};

export default CategoriesPage;
