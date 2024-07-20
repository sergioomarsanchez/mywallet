"use client";
import React, { useState } from "react";
import SignIn from "./signin";
import SignUp from "./signup";

const SignInUp = () => {
  const [openSigninModal, setOpenSigninModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);

  return (
    <div className="flex justify-end items-center gap-5 my-5">
      <SignIn
        setOpenSigninModal={setOpenSigninModal}
        openSigninModal={openSigninModal}
      />

      <SignUp
        setOpenSignupModal={setOpenSignupModal}
        openSignupModal={openSignupModal}
      />
    </div>
  );
};

export default SignInUp;
