import { APP_INFORMATION } from "@/src/constants/theme";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <>
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow gap-4">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/find-a-pet">Find a Pet</Link></li>
                        <li><Link href="/pets/upload-a-pet" className='rounded-full'>Upload a Pet</Link></li>
                        <li><Link href="/contact-us">Contacts</Link></li>
                        <li><Link href="/about-us">About Us</Link></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-2xl hidden lg:flex">
                    <Image alt="logo" height={32} width={32} src={"/paw_logo.png"} />
                    {APP_INFORMATION.name}
                </a>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost text-2xl lg:hidden">
                    <Image alt="logo" height={32} width={32} src={"/paw_logo.png"}/>
                    {APP_INFORMATION.name}
                </a>
                <ul className="menu menu-horizontal px-1 hidden lg:flex text-base gap-2">
                    <li><Link href="/" className='rounded-full'>Home</Link></li>
                    <li><Link href="/find-a-pet" className='rounded-full'>Find a Pet</Link></li>
                    <li><Link href="/pets/upload-a-pet" className='rounded-full'>Upload a Pet</Link></li>
                    <li><Link href="/contact-us" className='rounded-full'>Contacts</Link></li>
                    <li><Link href="/about-us" className='rounded-full'>About Us</Link></li>
                </ul>
            </div>
        </>
    )
}