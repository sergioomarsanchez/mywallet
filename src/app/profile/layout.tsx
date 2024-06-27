export const metadata = {
  title: "Profile",
  description: "Profile Page",
};

import React from "react";
import ProfileSidebar from "../components/nav/profileSideBar";
import ProfileMobileNavBar from "../components/nav/profileMobileNavBar";
import { getServerSession } from "next-auth";
import { authOption } from "../lib/auth";

export default async function ProfilePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOption);
  const role = session?.user?.role;
  return (
    <div className="relative md:flex md:container md:m-auto pt-20">
      {/* Sidebar for larger screens */}
      <div className="hidden md:flex">
        <ProfileSidebar role={role} />
      </div>
      {children}
      {/* Mobile navbar for smaller screens */}
      <div className="md:hidden w-full">
        <ProfileMobileNavBar role={role} />
      </div>
    </div>
  );
}
