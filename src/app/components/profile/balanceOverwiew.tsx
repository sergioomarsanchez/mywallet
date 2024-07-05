import React from "react";
import { getUserBalanceByCurrency } from "@/lib/actions";

interface BalanceOverviewProps {
  userId: string;
}

const BalanceOverview = async ({ userId }: BalanceOverviewProps) => {
  const overview = await getUserBalanceByCurrency(userId);
  const formatBalance = (balance: number) => {
    // Format the balance with thousand separators
    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const formattedBalance = formatter.format(balance);
    const [integerPart, decimalPart] = formattedBalance.split(".");

    return { integerPart, decimalPart };
  };
  return (
    <div className="flex flex-col md:flex-row gap-4 my-2 justify-center items-center lg:justify-start">
      {Object.entries(overview.balanceByCurrency).map(
        ([currency, { balance, accountsCount, transactions }]) => (
          <div
            key={currency}
            className="card bg-white dark:bg-gray-800 p-4 pt-1 rounded-lg shadow-md w-fit"
          >
            <section className="flex justify-start items-baseline my-2">
              <span className="font-thin text-sm mr-2">{currency}</span>
              <span className="uppercase font-bold text-xl">
                {formatBalance(balance).integerPart}
              </span>
              .
              <span className="text-gray-700 dark:text-gray-300 uppercase tracking-widest">
                {formatBalance(balance).decimalPart}
              </span>
            </section>
            <p className="text-xs">Accounts: {accountsCount}</p>
            <p className="text-xs">Transactions: {transactions.length}</p>
          </div>
        )
      )}
    </div>
  );
};

export default BalanceOverview;
