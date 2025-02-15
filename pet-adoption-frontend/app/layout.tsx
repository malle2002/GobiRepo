'use client';

import "./globals.css";
import { Poppins } from "next/font/google";
import Layout from "./layout/Layout";
import { ThemeProvider } from '@/context/ThemeContext';
import { SessionProvider } from "next-auth/react";

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});


export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <SessionProvider>
      <html lang="en">
        <body className={`${poppins.className} antialiased`}>
          <ThemeProvider><Layout>{children}</Layout></ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
