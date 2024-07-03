import React from "react";
import { fetchAccountById, fetchTransactionsByAccountId } from "@/lib/actions";
import { Account, Transaction } from "src/app/types/back";
import AccountDetails from "@/components/accounts/accountDetails";


interface AccountPageProps {
  params: { id: string };
}

const AccountPage = async ({ params }: AccountPageProps) => {
  const account: Account | null = await fetchAccountById(params.id);
  const transactions : Transaction[] | null = await fetchTransactionsByAccountId(params.id)

  if (!account) {
    return <div>Account not found</div>;
  }

  return <AccountDetails account={account} transactions={transactions} />;
};

export default AccountPage;
