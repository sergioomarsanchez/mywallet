"use client";
import React, { useState } from "react";
import { Account } from "src/app/types/back";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import DeleteAccountWarningModal from "./deleteAccountWarningModal";
import Link from "next/link";

function AccountCard({ account }: { account: Account }) {
  const [openWarningModal, setOpenWarningModal] = useState<boolean>(false);

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
    <Link href={`/profile/accounts/${account.id}`}>
      <div className="card text-gray-700 dark:text-gray-300 w-[90%] md:w-[clamp(260px,80%,300px)] hover:brightness-90 transition-all cursor-pointer group bg-gradient-to-tl from-gray-400 to-gray-300 hover:from-gray-500 hover:to-gray-300 border-gray-300 dark:from-gray-900 dark:to-gray-950 dark:hover:from-gray-800 dark:hover:to-gray-950 border-r-2 border-t-2 dark:border-gray-900 m-4 rounded-lg overflow-hidden relative">
        <div className="px-8 py-10">
          <header className="flex justify-start items-start gap-5">
            <div className="w-fit h-fit absolute top-0 right-3">
              <DeleteAccountWarningModal
                accountId={account.id}
                openWarningModal={openWarningModal}
                setOpenWarningModal={setOpenWarningModal}
              />
            </div>
            {account.logo ? (
              <img
                className="size-10 rounded-full rounded-tl-none mb-4 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-gray-900 transition-all "
                src={account.logo}
                width={32}
                height={32}
                alt="User"
              />
            ) : (
              <CurrencyDollarIcon className="size-10 rounded-full rounded-tl-none mb-4 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-gray-900 transition-all text-green-800" />
            )}
            <section>
              <div className="uppercase font-bold text-xl">
                {account.entityName}
              </div>
              <div className="text-gray-700 dark:text-gray-300 uppercase tracking-widest">
                {account.accountType}
              </div>
            </section>
          </header>
          <div className="text-gray-400 mt-8 flex flex-col">
            <span className="text-gray-700 dark:text-gray-300">Balance</span>
            <div className="font-bold inline space-2 text-lg text-black dark:text-white">
              {integerPart}
              <span className="text-sm font-light text-gray-700 dark:text-gray-300">
                .{decimalPart}
              </span>
              <span className="text-sm ml-1 font-light text-gray-700 dark:text-gray-300">
                {account.currency}
              </span>
            </div>
          </div>
        </div>

        <div className="h-2 w-full bg-gradient-to-l via-blue-500 group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-0"></div>
        <div className="h-0.5 group-hover:w-full bg-gradient-to-l via-gray-500 dark:via-blue-950 group-hover:via-blue-500 w-[70%] m-auto rounded transition-all"></div>
      </div>
    </Link>
  );
}

export default AccountCard;
