"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyEmail } from "@/lib/actions";
import { useToast } from "src/app/context/ToastContext";
import Loader from "@/components/loader";
import SignIn from "./signin";

type ResetPasswordRequestModalProps = {
  token: string;
};

export default function VerifyEmail({ token }: ResetPasswordRequestModalProps) {
  const router = useRouter();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [openSignIn, setOpenSignIn] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setMessage("Invalid or expired token");
        return;
      }
      setIsLoading(true);
      try {
        await verifyEmail(token);
        setMessage("Email verified successfully");
        addToast("Email verified successfully", "success");
        setOpenSignIn(true);
      } catch (error) {
        setMessage("Failed to verify email. Please try again.");
        addToast("Failed to verify email. Please try again.", "error");
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []);

  return (
    <>
      <p className="text-sm mt-4">{message}</p>
      {isLoading && <Loader />}
      {openSignIn && (
        <SignIn
          openSigninModal={openSignIn}
          setOpenSigninModal={setOpenSignIn}
        />
      )}
    </>
  );
}
