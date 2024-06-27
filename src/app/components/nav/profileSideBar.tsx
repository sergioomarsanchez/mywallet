"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ComputerDesktopIcon,
  CreditCardIcon,
  ListBulletIcon,
  Cog6ToothIcon,
  BanknotesIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  ComputerDesktopIcon as ComputerDesktopIconFilled,
  CreditCardIcon as CreditCardIconFilled,
  ListBulletIcon as ListBulletIconFilled,
  Cog6ToothIcon as Cog6ToothIconFilled,
  BanknotesIcon as BanknotesIconFilled,
  UserIcon as UserIconFilled,
} from "@heroicons/react/24/solid";

const ProfileSidebar = ({ role }) => {
  const pathname = usePathname();

  return (
    <aside className="w-fit h-fit ml-2 rounded-2xl bg-black/20 dark:bg-white/5 backdrop-blur-2xl flex flex-col justify-center overflow-clip py-2 border border-slate-200 dark:border-slate-700 mt-24">
      <ul className="space-y-4">
        {[
          {
            href: "/profile",
            icon: UserIcon,
            iconFilled: UserIconFilled,
            label: "Profile",
          },
          {
            href: "/profile/accounts",
            icon: BanknotesIcon,
            iconFilled: BanknotesIconFilled,
            label: "Accounts",
          },
          {
            href: "/profile/categories",
            icon: ListBulletIcon,
            iconFilled: ListBulletIconFilled,
            label: "Categories",
          },
          {
            href: "/profile/methods",
            icon: CreditCardIcon,
            iconFilled: CreditCardIconFilled,
            label: "Payment Methods",
          },
          {
            href: "/profile/settings",
            icon: Cog6ToothIcon,
            iconFilled: Cog6ToothIconFilled,
            label: "Settings",
          },
          {
            href: "/profile/dashboard",
            icon: ComputerDesktopIcon,
            iconFilled: ComputerDesktopIconFilled,
            label: "Dashboard",
            adminOnly: true,
          },
        ].map(
          ({ href, icon: Icon, iconFilled: IconFilled, label, adminOnly }) =>
            (!adminOnly || role === "Admin") && (
              <li
                key={href}
                className="hover:bg-gray-400 dark:hover:bg-gray-700 px-2 py-1 flex items-center"
              >
                <Link href={href}>
                  <div className={`flex items-center`}>
                    {pathname === href ? (
                      <IconFilled
                        className="h-6 w-6 mr-2 drop-shadow fill-current text-[#198671]"
                        style={{
                          filter: "drop-shadow(0px 0px 6px #198671)",
                        }}
                      />
                    ) : (
                      <Icon className="h-6 w-6 mr-2" />
                    )}
                    <span
                      style={{
                        textShadow:
                          pathname === href ? "0px 0px 6px #198671" : "",
                        color: pathname === href ? "#198671" : "",
                      }}
                    >
                      {label}
                    </span>
                  </div>
                </Link>
              </li>
            )
        )}
      </ul>
    </aside>
  );
};

export default ProfileSidebar;
