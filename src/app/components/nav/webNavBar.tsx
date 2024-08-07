"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import ProfileDropdown from "../profileDropDown";
import ContactModal from "./contactModal";

const WebNavBar = () => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const [contactOpen, setContactOpen] = useState(false);

  const isHome = pathName === "/"
  return (
    <nav className="fixed pr-4 md:pr-6 pt-2 md:p-4 flex justify-end items-center z-10 top-0 right-0 scale-90 md:scale-100">
      <ul className="flex justify-end items-center gap-5">
        <li className={`cursor-pointer hover:text-[#4b39c1] dark:hover:text-[#a095e4] transition-colors duration-200 ${isHome?"text-gray-100 hover:text-[#a095e4]":""}`}>
          <ContactModal open={contactOpen} setOpen={setContactOpen} />
        </li>
        {pathName !== "/about" && (
          <li>
            <Link
              href={"/about"}
              passHref
              className={`cursor-pointer hover:text-[#4b39c1] dark:hover:text-[#a095e4] transition-colors duration-200 ${isHome?"text-gray-100 hover:text-[#a095e4]":""}`}
            >
              About
            </Link>
          </li>
        )}
        {pathName !== "/FAQ" && (
          <li>
            <Link
              href={"/FAQ"}
              passHref
              className={`cursor-pointer hover:text-[#4b39c1] dark:hover:text-[#a095e4] transition-colors duration-200 ${isHome?"text-gray-100 hover:text-[#a095e4]":""}`}
            >
              FAQ
            </Link>
          </li>
        )}
        {session && (
          <>
            <li>
              <ProfileDropdown
                align="right"
                name={session?.user?.name}
                role={session?.user?.role ?? "User"}
                image={session?.user?.image}
                email={session?.user?.email}
              />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default WebNavBar;
