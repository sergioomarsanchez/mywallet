"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ComputerDesktopIcon,
  ListBulletIcon,
  BanknotesIcon,
  UserIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import {
  ComputerDesktopIcon as ComputerDesktopIconFilled,
  ListBulletIcon as ListBulletIconFilled,
  BanknotesIcon as BanknotesIconFilled,
  UserIcon as UserIconFilled,
  ClipboardDocumentListIcon as ClipboardDocumentListFilled,
} from "@heroicons/react/24/solid";
import { UserRole } from "@prisma/client";

const ProfileMobileNavbar = ({ role }: { role: UserRole }) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed bottom-0 w-screen shadow-lg backdrop-blur-2xl border border-slate-200 dark:border-slate-700 flex justify-around 
      bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-800 dark:to-slate-950 transition-opacity duration-300 ${
        isScrolled ? "opacity-70" : "opacity-100"
      }`}
    >
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
              <div className="flex flex-col items-center py-3 px-0.5 text-[8px]">
                {pathname === href ? (
                  <IconFilled
                    className="h-4 w-4 drop-shadow fill-current text-[#074237] dark:text-[#4ae4c5]"
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
                  }}
                  className={`${
                    pathname === href
                      ? "text-[#074237] dark:text-[#4ae4c5]"
                      : ""
                  }`}
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
