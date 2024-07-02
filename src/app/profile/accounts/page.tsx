import { getServerSession } from "next-auth";
import { authOption } from "../../lib/auth";
import React from "react";
import { redirect } from "next/navigation";
import CurrencyTabs from "@/components/accounts/currencyTabs";
import { fetchAccounts } from "@/lib/actions";
import type { Account } from "src/app/types/back";

const AccountPage = async () => {
  const session = await getServerSession(authOption);

  if (!session) {
    return (
      <main className="flex justify-center p-2 md:p-5 xl:p-24">
        <h1 className="text-lg lg:text-2xl place-self-start my-5">
          Ups, you are not authorized to see this page, please go back to{" "}
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
  const accounts: Account[] | null= (await fetchAccounts(session?.user?.id)) ?? [];


  return (
    <main className="flex flex-col justify-center p-2 md:p-5 lg:ml-10">
      <h1 className="text-lg lg:text-2xl place-self-center lg:place-self-start my-5">
        Your accounts
      </h1>
      <div className="flex h-screen w-full justify-center pt-2 md:pt-5 px-4">
        <div className="w-full">
          <CurrencyTabs userId={session?.user?.id} accounts={accounts} />
        </div>
      </div>
    </main>
  );
};

export default AccountPage;
