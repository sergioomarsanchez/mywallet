"use client";
import React, { useState } from "react";
import SignIn from "../signin";
import SignUp from "../signup";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import ProfileDropdown from "../profileDropDown";

const WebNavBar = () => {
  const [openSigninModal, setOpenSigninModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 right-0 p-4 flex justify-end items-center">
      <ul className="flex justify-end items-center gap-5">
        <li className="hover:scale-105 active:scale-100">
          <Link href={"/"} passHref>
            Home
          </Link>
        </li>
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
            {/* <li className="hover:scale-105 active:scale-100">
              <Link href={"/welcome"} passHref>
                Profile
              </Link>
            </li>
            <li className="hover:scale-105 active:scale-100">
              <button onClick={() => signOut({ callbackUrl: "/" })}>
                Sign Out
              </button>
            </li> */}
            <li>
              <ProfileDropdown align="right" />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default WebNavBar;
