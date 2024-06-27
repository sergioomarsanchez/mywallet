"use client";
import React from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Link from "next/link";
import ProfileIcon from "../assets/icons/profile-icon";
import { signOut } from "next-auth/react";
import { useSessionContext } from "../context/SessionContext";
import Loader from "./loader";

export default function ProfileDropdown({
  align,
  name,
  role,
  image,
  email,
}: {
  align?: "left" | "right";
  name?: string | null | undefined;
  role?: string | null | undefined;
  image?: string | null | undefined;
  email?: string | null | undefined;
}) {
  const { session, loading } = useSessionContext();
  if (loading) {
    return <Loader />;
  }

  return (
    <Menu as="div" className="relative inline-flex">
      <MenuButton className="inline-flex justify-center items-center group">
        {image ? (
          <img
            className="w-8 h-8 rounded-full"
            src={image}
            width={32}
            height={32}
            alt="User"
          />
        ) : (
          <ProfileIcon className="size-8 rounded-full" />
        )}
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200">
            {name}
          </span>
          <svg
            className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </MenuButton>
      <Transition
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <TransitionChild
          as="div"
          className={`origin-top-right z-10 absolute top-full min-w-[11rem] bg-black/20 dark:bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <div>
            <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200 dark:border-slate-700">
              <div className="font-medium text-slate-800 dark:text-slate-100">
                {email}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 italic">
                {role}
              </div>
            </div>
            <MenuItems as="ul" className="focus:outline-none">
              <MenuItem as="li">
                {({ close }) => (
                  <Link
                    className={`font-medium text-sm flex items-center py-1 px-3 hover:text-inherit text-stone-600 dark:text-inherit hover:dark:text-[#B9D1A7]`}
                    href="/profile"
                    onClick={() => close()}
                  >
                    Profile
                  </Link>
                )}
              </MenuItem>
              <MenuItem as="li">
                {({ close }) => (
                  <Link
                    href="#0"
                    onClick={() => {
                      close();
                      signOut({ callbackUrl: "/" });
                    }}
                    className={`font-medium text-sm flex items-center py-1 px-3 hover:text-inherit text-stone-600 dark:text-inherit hover:dark:text-[#B9D1A7]`}
                  >
                    Sign Out
                  </Link>
                )}
              </MenuItem>
            </MenuItems>
          </div>
        </TransitionChild>
      </Transition>
    </Menu>
  );
}
