import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { SessionProvider } from "./components/SessionProvider";
import UserButton from "./components/UserButton";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "NextJS ChatGPT App",
  description: "ChatGPT brought to you by NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased px-2 md:px-5`}
      >
        <header className="text-white font-bold bg-green-900 text-2xl">
          <div className="flex flex-grow">
            <Link href="/">GPT Chat</Link>
            <Link href="/about" className="ml-5 font-light">About</Link>
          </div>
          <div>
            <UserButton />
          </div>
        </header>
        <div className="flex flex-col md:flex-row">
          <div className="flex-grow">
            {children}
          </div>
        </div>
      </body>
    </html>
    </SessionProvider>
  );
}
