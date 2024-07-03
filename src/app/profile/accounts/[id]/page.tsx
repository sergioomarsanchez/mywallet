import React from "react";
import { fetchAccountById, fetchTransactionsByAccountId } from "@/lib/actions";
import { Account, Transaction } from "src/app/types/back";
import AccountDetails from "@/components/accounts/accountDetails";
import { redirect } from "next/navigation";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import MobileBalanceCard from "@/components/accounts/accountDetailsComp/mobileBalanceCard";

interface AccountPageProps {
  params: { id: string };
}

const AccountPage = async ({ params }: AccountPageProps) => {
  const account: Account | null = await fetchAccountById(params.id);
  const transactions: Transaction[] | null = await fetchTransactionsByAccountId(
    params.id
  );

  if (!account) {
    return (
      <main className="flex justify-center p-2 md:p-5 xl:p-24">
        <h1 className="text-lg lg:text-2xl place-self-start my-5">
          Ups, Account not found, please go back to{" "}
          <button
            onClick={() => redirect("/")}
            className="underline text-blue-600"
          >
            home
          </button>
        </h1>
      </main>
    );
  }
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

  const { integerPart, decimalPart } = formatBalance(account.balance);

  return (
    <main className="flex flex-col items-center justify-center md:items-start md:p-5 lg:ml-10">
      <header>
        <MobileBalanceCard
          account={account}
          integerPart={integerPart}
          decimalPart={decimalPart}
        />
      </header>
      <div className="flex h-screen w-full justify-center pt-2 md:pt-5 px-4">
        <div className="w-full">
          <AccountDetails account={account} transactions={transactions} />
        </div>
      </div>
    </main>
  );
};

export default AccountPage;
