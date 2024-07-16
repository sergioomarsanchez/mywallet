import React from "react";
import {
  fetchAccountById,
  fetchAccounts,
  fetchTransactionsByAccountId,
} from "@/lib/actions";
import { Account, Transaction } from "src/app/types/back";
import AccountDetails from "@/components/accounts/accountDetails";
import { redirect } from "next/navigation";
import MobileBalanceCard from "@/components/accounts/accountDetailsComp/mobileBalanceCard";
import AccContainer from "@/components/accounts/accountDetailsComp/otherAccountSlider/accContainer";

interface AccountPageProps {
  params: { id: string };
}

const AccountPage = async ({ params }: AccountPageProps) => {
  const account: Account | null = await fetchAccountById(params.id);
  const transactions: Transaction[] | null = await fetchTransactionsByAccountId(
    params.id
  );
  const otherAccounts: Account[] | [] = account
    ? (await fetchAccounts(account?.userId))?.filter(
        (acc: Account) => acc.id !== params.id
      )
    : [];

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

  return (
    <main className="flex flex-col items-center justify-center md:items-start md:p-5 lg:ml-10">
      <header className="flex  md:grid-cols-2 w-full">
        <div
          className={`flex ${
            otherAccounts.length
              ? "justify-center items-center"
              : "md:place-self-start"
          } w-full`}
        >
          <MobileBalanceCard account={account} accounts={otherAccounts} />
        </div>
        {otherAccounts.length && (
          <div className="hidden w-full lg:grid justify-center items-center">
            <AccContainer accounts={otherAccounts} />
          </div>
        )}
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
