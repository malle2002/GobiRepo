'use client';

import { APP_INFORMATION } from '@/constants/theme';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import ThemeToggle from '../../components/ThemeToggle';
import { useSession, signIn, signOut } from "next-auth/react"

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession()

  return (
    <div className="min-h-screen flex flex-col">
      <div className="navbar bg-base-100 text-base-content rounded-b-2xl">

        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow gap-4">
              <li><a href="/">Home</a></li>
              <li><a href="/find-a-pet">Find a Pet</a></li>
              <li><a href="/contact-us">Contacts</a></li>
              <li><a href="/about-us">About Us</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost text-2xl hidden lg:flex">
            <Image alt="logo" height={32} width={32} src={"/paw_logo.png"} style={{width:"auto", height:"auto"}}/>
            {APP_INFORMATION.name}
          </a>
        </div>

        <div className="navbar-center">
          <a className="btn btn-ghost text-2xl lg:hidden">
            <Image alt="logo" height={32} width={32} src={"/paw_logo.png"}/>
            {APP_INFORMATION.name}
          </a>
          {session && (
            <button type="button" className='btn btn-outline rounded-badge size-fit ml-5 md:hidden'><span className='text-2xl'>+</span></button>
          )}
          <ul className="menu menu-horizontal px-1 hidden lg:flex text-base gap-2">
            <li><a href="/" className='rounded-full'>Home</a></li>
            <li><a href="/find-a-pet" className='rounded-full'>Find a Pet</a></li>
            <li><button type="button" className='btn btn-outline rounded-badge'><span className='text-2xl'>+</span></button></li>
            <li><a href="/contact-us" className='rounded-full'>Contacts</a></li>
            <li><a href="/about-us" className='rounded-full'>About Us</a></li>
          </ul>
        </div>

        <div className="navbar-end flex gap-2">
          {session ? (
            <div className="relative">
              <button onClick={() => setMenuOpen(!menuOpen)} className="btn btn-circle btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" width="45px" height="45px" viewBox="0 0 24 24" fill="none">
                  <path d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="12" cy="12" r="2" stroke="#1C274C" strokeWidth="1.5"/>
                  <path d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>              
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-base-200 shadow-lg rounded-lg p-2 opacity-75 z-50">
                  <Link href="/profile" className="block px-4 py-2 hover:bg-base-300 rounded">
                    Profile
                  </Link>
                  <ThemeToggle/>
                  <button onClick={ () => signOut() } className="block w-full text-left px-4 py-2 mt-2 bg-error hover:opacity-80 text-white rounded">
                    Logout
                  </button>
                </div>
              )}
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

      <footer className="footer bg-base-200 text-base-content p-10 border-t border-black">
        <aside className=''>
          <Image alt="logo" height={50} width={50} src={"/paw_logo.png"}/>
          <p>
            {APP_INFORMATION.name}
            <br />
            Making the adoption process easier since 2025.
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </div>
  );
};

export default Layout;
