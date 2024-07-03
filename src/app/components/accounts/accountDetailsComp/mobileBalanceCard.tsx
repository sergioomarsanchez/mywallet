"use client";
import React, { useState } from "react";
import styles from "./MobileBalanceCard.module.css";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { Account } from "src/app/types/back";
import EditAccount from "./editAccountModal";
import { PencilIcon } from "@heroicons/react/24/outline";

function MobileBalanceCard({
  account,
  integerPart,
  decimalPart,
}: {
  account: Account;
  integerPart: string;
  decimalPart: string;
}) {
  const [openEditAccount, setOpenEditAccount] = useState<boolean>(false);
  return (
    <div className={styles.card}>
      <svg
        fill="none"
        viewBox="0 0 342 175"
        height="175"
        width="342"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.background}
      >
        <path
          fill="url(#paint0_linear_103_640)"
          d="M0 66.4396C0 31.6455 0 14.2484 11.326 5.24044C22.6519 -3.76754 39.6026 0.147978 73.5041 7.97901L307.903 62.1238C324.259 65.9018 332.436 67.7909 337.218 73.8031C342 79.8154 342 88.2086 342 104.995V131C342 151.742 342 162.113 335.556 168.556C329.113 175 318.742 175 298 175H44C23.2582 175 12.8873 175 6.44365 168.556C0 162.113 0 151.742 0 131V66.4396Z"
        ></path>
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            y2="128"
            x2="354.142"
            y1="128"
            x1="0"
            id="paint0_linear_103_640"
          >
            <stop stopColor="#5936B4"></stop>
            <stop stopColor="#362A84" offset="1"></stop>
          </linearGradient>
        </defs>
      </svg>
      <div className={styles.logo}>
        {account.logo ? (
          <img
            className="size-8 rounded-full rounded-tl-none"
            src={account.logo}
            width={32}
            height={32}
            alt="User"
          />
        ) : (
          <CurrencyDollarIcon className="size-8 rounded-full rounded-tl-none text-green-800" />
        )}
      </div>
      <button
        className="absolute right-3 top-[5rem] hover:scale-105 w-fit h-fit z-20"
        onClick={() => setOpenEditAccount(true)}
      >
        <PencilIcon className="font-bold size-5 text-white hover:text-blue-600" />
      </button>
      {openEditAccount && (
        <EditAccount
          account={account}
          openEditAccountModal={openEditAccount}
          setOpenEditAccountModal={setOpenEditAccount}
        />
      )}
      <div className={styles.mainText}>
        <div className="text-gray-400 my-4 flex flex-col">
          <span className="text-gray-300 text-sm font-thin">Balance</span>
          <div className="font-bold inline space-2 text-3xl text-white">
            {integerPart}
            <span className="text-sm font-lighttext-gray-300">
              .{decimalPart}
            </span>
            <span className="text-sm ml-1 font-light text-gray-300">
              {account.currency}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.infoLeft}>
          <p className={styles.textGray}>{account.currency}</p>
          <p className="font-bolder text-lg">{account.entityName}</p>
        </div>
        <p className={styles.infoRight}>{account.accountType}</p>
      </div>
    </div>
  );
}

export default MobileBalanceCard;
