"use client";
import React from "react";
import { useSession } from "next-auth/react";
import ProfileDropdown from "../profileDropDown";

const WebNavBar = () => {
  const { data: session } = useSession();

  return (
    <nav className="fixed pr-6 pt-2 md:p-4 flex justify-end items-center z-10 top-0 right-0">
      <ul className="flex justify-end items-center gap-5">
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
