"use client";
import React, { useState } from "react";
import SignIn from "../signin";
import SignUp from "../signup";
import { useSession, signOut } from "next-auth/react";

const WebNavBar = () => {
  const [openSigninModal, setOpenSigninModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const { data: session } = useSession();
  console.log(session, "session");
  
  return (
    <nav className="fixed top-0 right-0 px-4 py-2 flex justify-end items-center">
      <ul className="flex justify-end items-center gap-5">
        <li>Home</li>
        <li>Profile</li>
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
          <button onClick={() => signOut({ callbackUrl: "/" })}>
            Sign Out
          </button>
        )}
      </ul>
    </nav>
  );
};

export default WebNavBar;
