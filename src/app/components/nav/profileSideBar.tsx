"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ComputerDesktopIcon,
  ListBulletIcon,
  Cog6ToothIcon,
  BanknotesIcon,
  UserIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import {
  ComputerDesktopIcon as ComputerDesktopIconFilled,
  ListBulletIcon as ListBulletIconFilled,
  Cog6ToothIcon as Cog6ToothIconFilled,
  BanknotesIcon as BanknotesIconFilled,
  UserIcon as UserIconFilled,
  ClipboardDocumentListIcon as ClipboardDocumentListFilled,
} from "@heroicons/react/24/solid";
import { UserRole } from "@prisma/client";

const ProfileSidebar = ({ role }: { role: UserRole }) => {
  const pathname = usePathname();

  return (
    <aside className="w-fit h-fit ml-5 rounded-2xl bg-black/20 dark:bg-white/5 backdrop-blur-2xl flex flex-col justify-center overflow-clip py-2 border border-slate-200 dark:border-slate-700 mt-10">
      <ul className="space-y-4">
        {[
          {
            href: "/profile",
            icon: UserIcon,
            iconFilled: UserIconFilled,
            label: "Profile",
          },
          {
            href: "/profile/overview",
            icon: ClipboardDocumentListIcon,
            iconFilled: ClipboardDocumentListFilled,
            label: "Overview",
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
                        className="h-6 w-6 mr-2 drop-shadow fill-current text-[#074237]  dark:text-[#4ae4c5]"
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
                      }}
                      className={`${
                        pathname === href
                          ? "text-[#074237] dark:text-[#4ae4c5]"
                          : ""
                      }`}
                    >
                      {label}
                      <div
                        className={`h-[1px] transition-all delay-75 duration-300 ease-in-out bg-[#074237] dark:via-[#4ae4c5] place-self-center bg-gradient-to-r from-white/60 via-transparent to-white/60 dark:from-gray-900 dark:to-gray-900 ${
                          pathname === href ? "w-full" : "w-0"
                        }`}
                      ></div>
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
