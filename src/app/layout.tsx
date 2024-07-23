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
  openGraph: {
    title: "My Wallet",
    description: "A way to get your finances controlled",
    url: "http://localhost:3000/", // replace with your actual website URL
    type: "website",
    images: [
      {
        url: "http://localhost:3000/public/wallet-preview.png", // replace with the path to your preview image
        width: 1200,
        height: 630,
        alt: "My Wallet Preview Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Wallet",
    description: "A way to get your finances controlled",
    images: ["http://localhost:3000/public/wallet-preview.png"], // replace with the path to your preview image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/wallet-svgrepo-com.svg" />
        <link rel="apple-touch-icon" href="/wallet-svgrepo-com.svg" />
        <meta property="og:title" content="My Wallet" />
        <meta
          property="og:description"
          content="A way to get your finances controlled"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://localhost:3000/" />
        <meta
          property="og:image"
          content="http://localhost:3000/public/wallet-preview.png"
        />{" "}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="My Wallet" />
        <meta
          name="twitter:description"
          content="A way to get your finances controlled"
        />
        <meta
          name="twitter:image"
          content="http://localhost:3000/public/wallet-preview.png"
        />{" "}
      </head>
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
