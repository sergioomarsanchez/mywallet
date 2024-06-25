import type { Metadata } from "next";
import SessionWrapper from "session-wrapper";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "./context/SessionContext";
import WebNavBar from "./components/nav/webNavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Wallet",
  description: "A way to get your finances controlled",
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
          <body className={inter.className}>
            <WebNavBar />
            {children}
          </body>
        </SessionProvider>
      </SessionWrapper>
    </html>
  );
}
