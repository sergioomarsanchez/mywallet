"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  CreditCardIcon,
  ListBulletIcon,
  Cog6ToothIcon,
  BanknotesIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconFilled,
  CreditCardIcon as CreditCardIconFilled,
  ListBulletIcon as ListBulletIconFilled,
  Cog6ToothIcon as Cog6ToothIconFilled,
  BanknotesIcon as BanknotesIconFilled,
  UserIcon as UserIconFilled,
} from "@heroicons/react/24/solid";

const ProfileMobileNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full bg-gray-800 text-white flex justify-around">
      <Link href="/profile">
        <div className="flex flex-col items-center p-2">
          {pathname === "/profile" ? (
            <UserIconFilled className="h-6 w-6" />
          ) : (
            <UserIcon className="h-6 w-6" />
          )}
          <span className="text-xs">Profile</span>
        </div>
      </Link>
      <Link href="/profile/accounts">
        <div className="flex flex-col items-center p-2">
          {pathname === "/profile/accounts" ? (
            <BanknotesIconFilled className="h-6 w-6" />
          ) : (
            <BanknotesIcon className="h-6 w-6" />
          )}
          <span className="text-xs">Accounts</span>
        </div>
      </Link>
      <Link href="/profile/categories">
        <div className="flex flex-col items-center p-2">
          {pathname === "/profile/categories" ? (
            <ListBulletIconFilled className="h-6 w-6" />
          ) : (
            <ListBulletIcon className="h-6 w-6" />
          )}
          <span className="text-xs">Categories</span>
        </div>
      </Link>
      <Link href="/profile/payment-methods">
        <div className="flex flex-col items-center p-2">
          {pathname === "/profile/payment-methods" ? (
            <CreditCardIconFilled className="h-6 w-6" />
          ) : (
            <CreditCardIcon className="h-6 w-6" />
          )}
          <span className="text-xs">Payment Methods</span>
        </div>
      </Link>
      <Link href="/profile/settings">
        <div className="flex flex-col items-center p-2">
          {pathname === "/profile/settings" ? (
            <Cog6ToothIconFilled className="h-6 w-6" />
          ) : (
            <Cog6ToothIcon className="h-6 w-6" />
          )}
          <span className="text-xs">Settings</span>
        </div>
      </Link>
      <Link href="/profile/dashboard">
        <div className="flex flex-col items-center p-2">
          {pathname === "/profile/dashboard" ? (
            <HomeIconFilled className="h-6 w-6" />
          ) : (
            <HomeIcon className="h-6 w-6" />
          )}
          <span className="text-xs">Dashboard</span>
        </div>
      </Link>
    </nav>
  );
};

export default ProfileMobileNavbar;
