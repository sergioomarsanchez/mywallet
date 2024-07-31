import { getServerSession } from "next-auth";
import { authOption } from "../../lib/auth";
import React from "react";
import CategoriesContainer from "@/components/categories/categoriesContainer";
import { getCategoryMovements } from "@/lib/actions";

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
  const initialMonth = new Date();
  const initialCurrency = "USD";

  const data = await getCategoryMovements(
    userId,
    initialMonth,
    initialCurrency
  );

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
    </main>
  );
};

export default CategoriesPage;
