import React from "react";
import { getUserBalanceByCurrency } from "@/lib/actions";
import BalanceCard from "./balanceCard";

interface BalanceOverviewProps {
  userId: string;
}

const BalanceOverview = async ({ userId }: BalanceOverviewProps) => {
  const overview = await getUserBalanceByCurrency(userId);
  return (
    <div className="flex flex-wrap gap-1 md:gap-4 lg:mb-8 items-center justify-start">
      {Object.entries(overview.balanceByCurrency).map(
        ([currency, { balance, accountsCount, transactions }]) => (
          <BalanceCard
            key={currency}
            currency={currency}
            balance={balance}
            accountsCount={accountsCount}
            transactions={transactions.length}
          />
        )
      )}
    </div>
  );
};

export default BalanceOverview;
