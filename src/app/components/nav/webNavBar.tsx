"use client";
import React, { useState } from "react";
import SignIn from "../signin";
import SignUp from "../signup";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import ProfileDropdown from "../profileDropDown";
import clsx from "clsx";

const WebNavBar = () => {
  const [openSigninModal, setOpenSigninModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav
      className={clsx("fixed  p-4 flex justify-end items-center z-10", {
        "top-[55%] md:top-[50%] left-[6rem] sm:left-[12rem] md:left-[4rem] lg:left-[15%] xl:left-[18%]":
          pathname === "/",
        "top-0 right-0": pathname !== "/",
      })}
    >
      <ul className="flex justify-end items-center gap-5">
        {!session ? (
          <>
            <li>
              <SignIn
                setOpenSigninModal={setOpenSigninModal}
                openSigninModal={openSigninModal}
              />
            </li>
            <li>
              <SignUp
                setOpenSignupModal={setOpenSignupModal}
                openSignupModal={openSignupModal}
              />
            </li>
          </>
        ) : (
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
