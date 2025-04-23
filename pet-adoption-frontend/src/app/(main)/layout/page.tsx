'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { useAuth } from '@/src/hooks/auth/useAuth';
import Menu from '@/src/components/layout/Menu';
import Footer from '@/src/components/layout/Footer';
import Navbar from '@/src/components/layout/Navbar';
import ChatButton from '@/src/components/chat/ChatButton';
import PageLoader from '@/src/components/PageLoader';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { session, status } = useAuth();

  if (status === 'loading') {
    return (
      <PageLoader/>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="navbar text-base-content rounded-b-2xl  z-50">

        <Navbar/>

        <div className="navbar-end flex gap-2">
          {session ? (
            <div className="relative">
              <Menu/>
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <Link href="/login" className="btn btn-white bg-white hover:bg-white hover:opacity-60 rounded-full px-6">
                Login
              </Link>
              <Link href="/sign-up" className="btn bg-black hover:bg-black hover:opacity-60 text-white shadow border-0 rounded-full px-6">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      <main className="flex-grow">{children}</main>

      <ChatButton session={session} />
      <Footer/>
    </div>
  );
};

export default Layout;