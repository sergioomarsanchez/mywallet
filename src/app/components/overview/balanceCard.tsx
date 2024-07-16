import React from "react";
import useFormattedNumber from "src/app/hooks/useFormatedNumber";

function BalanceCard({
  currency,
  balance,
  accountsCount,
  transactions,
}: {
  currency: string;
  balance: number;
  accountsCount: number;
  transactions: number;
}) {
  const { integerPart, decimalPart } = useFormattedNumber(balance);

  return (
    <div
      key={currency}
      className="grid grid-flow-col md:grid-flow-row md:p-4 md:pt-1 lg:min-w-48"
    >
      <section className="flex scale-75 md:scale-100 justify-start items-baseline my-2">
        <span className="font-thin text-sm mr-2">{currency}</span>
        <span className="uppercase font-bold text-xl">{integerPart}</span>.
        <span className="uppercase tracking-widest">{decimalPart}</span>
      </section>
      <p className="text-xs hidden lg:flex">Accounts: {accountsCount}</p>
      <p className="text-xs hidden lg:flex">Transactions: {transactions}</p>
    </div>
  );
}

export default BalanceCard;
