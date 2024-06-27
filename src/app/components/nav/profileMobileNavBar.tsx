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

const ProfileMobileNavbar = ({ role }) => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-screen bg-black/20 dark:bg-white/5 backdrop-blur-2xl border border-slate-200 dark:border-slate-700 flex justify-around rounded-t-3xl">
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
            <Link href={href} key={href}>
              <div className="flex flex-col items-center py-2 px-0.5 text-[8px]">
                {pathname === href ? (
                  <IconFilled
                    className="h-4 w-4 drop-shadow-lg fill-current text-[#198671]"
                    style={{
                      filter: "drop-shadow(0px 0px 6px #198671)",
                    }}
                  />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
                <span
                  style={{
                    textShadow: pathname === href ? "0px 0px 6px #198671" : "",
                    color: pathname === href ? "#198671" : "",
                  }}
                >
                  {label}
                </span>
              </div>
            </Link>
          )
      )}
    </nav>
  );
};

export default ProfileMobileNavbar;
