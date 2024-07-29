"use client";
import React, { useState } from "react";
import ResetPasswordRequestModal from "./requestPasswordRequestModal";
import DeleteUserContainer from "../profile/deleteUserContainer";

function ProfileDetails({
  isProvider,
  userImg,
  userName,
  userEmail,
  userId,
}: {
  isProvider: boolean;
  userImg: string | null | undefined;
  userName: string | null | undefined;
  userEmail: string | null | undefined;
  userId: string;
}) {
  const [openResetPasswordModal, setOpenResetPasswordModal] =
    useState<boolean>(false);
  return (
    <div>
      <div className="flex h-screen w-full justify-center pt-2 px-4">
        <div className="w-full p-6 space-y-6">
          <section>
            <div className="flex items-center">
              <div className="mr-4">
                <img
                  className="w-20 h-20 rounded-full"
                  src={userImg || "/images/auth-image.jpg"}
                  width={80}
                  height={80}
                  alt="User avatar"
                />
              </div>
              <div className="btn-sm">{userName}</div>
            </div>
          </section>
          <section>
            <h2 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">
              Email
            </h2>
            <div className="text-sm">
              Excepteur sint occaecat cupidatat non proident sunt in culpa qui
              officia.
            </div>
            <div className="flex flex-wrap mt-5">
              <div className="mr-2">
                <label className="sr-only" htmlFor="email">
                  Business email
                </label>
                <span>{userEmail}</span>
              </div>
            </div>
          </section>
          {!isProvider && (
            <section>
              <h2 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">
                Password
              </h2>
              <div className="text-sm">
                You can change your password here.
              </div>
              <div className="mt-5">
                <ResetPasswordRequestModal
                  open={openResetPasswordModal}
                  setOpen={setOpenResetPasswordModal}
                  profile={true}
                />
              </div>
            </section>
          )}
          <section>
            <h2 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">
              Smart Sync update for Mac
            </h2>
            <div className="text-sm">
              With this update, online-only files will no longer appear to take
              up hard drive space.
            </div>
            <div className="flex items-center mt-5">
              <div className="form-switch">
                <input type="checkbox" id="toggle" className="sr-only" />
                <label
                  className="bg-slate-400 dark:bg-slate-700"
                  htmlFor="toggle"
                >
                  <span
                    className="bg-white shadow-sm"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Enable smart sync</span>
                </label>
              </div>
              <div className="flex justify-center items-center text-sm text-slate-400 dark:text-slate-500 italic ml-2">
                Delete my account: <DeleteUserContainer userId={userId} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
