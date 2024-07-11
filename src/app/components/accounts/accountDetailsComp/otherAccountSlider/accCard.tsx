import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";
import { Account } from "src/app/types/back";

function AccCard({ account }: { account: Account }) {
  return (
    <Link href={`/profile/accounts/${account.id}`}>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center gap-2">
          {account.logo ? (
            <img
              src={account.logo}
              alt={account.entityName}
              width={40}
              height={40}
              className="inline-block size-8 rounded-full"
            />
          ) : (
            <CurrencyDollarIcon className="inline-block size-5 rounded-full" />
          )}
          <section className="flex flex-col items-start justify-center w-full">
            <span>{account.entityName}</span>
            <div className="text-xs font-thin flex gap-2">
              <span>{account.accountType}</span>
              <span>{account.currency}</span>
            </div>
          </section>
        </div>
      </div>
    </Link>
  );
}

export default AccCard;
