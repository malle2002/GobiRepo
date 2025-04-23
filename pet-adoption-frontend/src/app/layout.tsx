import "./globals.css";
import { Poppins } from "next/font/google";
import { ThemeProvider } from '@/src/providers/ThemeProvider';
import Layout from "./(main)/layout/page";
import { Providers } from "../providers/providers";

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
        <html lang="en">
          <body className={`${poppins.className} antialiased`}>
            <ThemeProvider>
              <Layout>
                {children}
              </Layout>
            </ThemeProvider>
          </body>
        </html>
    </Providers>
  );
}
