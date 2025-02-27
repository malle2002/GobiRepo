'use client';

import "./globals.css";
import { Poppins } from "next/font/google";
import { ThemeProvider } from '@/src/providers/ThemeProvider';
import { SessionProvider } from "next-auth/react";
import Layout from "./layout/index";
import { ChatProvider } from "../providers/ChatProvider";

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <SessionProvider>
      <ChatProvider>
        <html lang="en">
          <body className={`${poppins.className} antialiased`}>
            <ThemeProvider><Layout>{children}</Layout></ThemeProvider>
          </body>
        </html>
      </ChatProvider>
    </SessionProvider>
  );
}
