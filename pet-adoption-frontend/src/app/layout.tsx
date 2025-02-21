'use client';

import "./globals.css";
import { Poppins } from "next/font/google";
import { ThemeProvider } from '@/src/context/ThemeContext';
import { SessionProvider } from "next-auth/react";
import { ChatProvider } from "../context/ChatContext";
import Layout from "./layout/index";

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
