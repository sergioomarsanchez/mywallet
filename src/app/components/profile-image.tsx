"use client";
import { usePathname } from "next/navigation";
import { lazy } from "react";

export default function ProfileImage() {
  const pathName = usePathname();
  
  return (
    <img
      className="absolute -z-10 opacity-10 bottom-40 right-40"
      src={
        pathName === "/profile/categories"
          ? "/images/chart.png"
          : "/images/cash.png"
      }
      width={760}
      height={1024}
      loading="lazy"
      alt={pathName === "/profile/categories"
        ? "chart image in the background"
        : "pile of cash image in the background"}
    />
  );
}
