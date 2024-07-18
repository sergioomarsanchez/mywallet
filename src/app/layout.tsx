import type { Metadata } from "next";
import SessionWrapper from "../../session-wrapper";
import { Inter } from "next/font/google";
import { ToastProvider } from "./context/ToastContext";
import ToastContainer from "./components/toastContainer";
import "./globals.css";
import { SessionProvider } from "./context/SessionContext";
import WebNavBar from "./components/nav/webNavBar";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Wallet",
  description: "A way to get your finances controlled",
  icons: {
    icon: "public/wallet-svgrepo-com.svg",
    apple: "public/wallet-svgrepo-com.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionWrapper>
        <SessionProvider>
          <ToastProvider>
            <body className={inter.className}>
              <WebNavBar />
              {children}
              <ToastContainer />
            </body>
          </ToastProvider>
        </SessionProvider>
      </SessionWrapper>
    </html>
  );
}
