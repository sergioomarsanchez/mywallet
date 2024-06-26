export const metadata = {
  title: "Profile",
  description: "Profile Page",
};

import React from "react";
import ProfileSidebar from "../components/nav/profileSideBar";
import ProfileMobileNavBar from "../components/nav/profileMobileNavBar";

export default function ProfilePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex container m-auto pt-20">
      {/* Sidebar for larger screens */}
      <div className="hidden lg:flex">
        <ProfileSidebar />
      </div>
      <div className="flex-1">{children}</div>
      {/* Mobile navbar for smaller screens */}
      <div className="lg:hidden fixed bottom-0 w-full">
        <ProfileMobileNavBar />
      </div>
    </div>
  );
}
