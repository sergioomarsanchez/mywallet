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

const ProfileSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-fit rounded-2xl bg-gray-800 text-white flex flex-col justify-center overflow-clip">
      <ul className="space-y-4">
        <li className="hover:bg-gray-700 p-4 flex items-center">
          <Link href="/profile">
            <div className="flex items-center">
              {pathname === "/profile" ? (
                <UserIconFilled className="h-6 w-6 mr-2" />
              ) : (
                <UserIcon className="h-6 w-6 mr-2" />
              )}
              <span>Profile</span>
            </div>
          </Link>
        </li>
        <li className="hover:bg-gray-700 p-4 flex items-center">
          <Link href="/profile/accounts">
            <div className="flex items-center">
              {pathname === "/profile/accounts" ? (
                <BanknotesIconFilled className="h-6 w-6 mr-2" />
              ) : (
                <BanknotesIcon className="h-6 w-6 mr-2" />
              )}
              <span>Accounts</span>
            </div>
          </Link>
        </li>
        <li className="hover:bg-gray-700 p-4 flex items-center">
          <Link href="/profile/categories">
            <div className="flex items-center">
              {pathname === "/profile/categories" ? (
                <ListBulletIconFilled className="h-6 w-6 mr-2" />
              ) : (
                <ListBulletIcon className="h-6 w-6 mr-2" />
              )}
              <span>Categories</span>
            </div>
          </Link>
        </li>
        <li className="hover:bg-gray-700 p-4 flex items-center">
          <Link href="/profile/payment-methods">
            <div className="flex items-center">
              {pathname === "/profile/payment-methods" ? (
                <CreditCardIconFilled className="h-6 w-6 mr-2" />
              ) : (
                <CreditCardIcon className="h-6 w-6 mr-2" />
              )}
              <span>Payment Methods</span>
            </div>
          </Link>
        </li>
        <li className="hover:bg-gray-700 p-4 flex items-center">
          <Link href="/profile/settings">
            <div className="flex items-center">
              {pathname === "/profile/settings" ? (
                <Cog6ToothIconFilled className="h-6 w-6 mr-2" />
              ) : (
                <Cog6ToothIcon className="h-6 w-6 mr-2" />
              )}
              <span>Settings</span>
            </div>
          </Link>
        </li>
        <li className="hover:bg-gray-700 p-4 flex items-center">
          <Link href="/profile/dashboard">
            <div className="flex items-center">
              {pathname === "/profile/dashboard" ? (
                <HomeIconFilled className="h-6 w-6 mr-2" />
              ) : (
                <HomeIcon className="h-6 w-6 mr-2" />
              )}
              <span>Dashboard</span>
            </div>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default ProfileSidebar;
