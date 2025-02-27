import Link from "next/link";
import { useMenu } from "../../hooks/useMenu";
import ThemeToggle from "../ThemeToggle";
import { signOut } from "next-auth/react";

const Menu = () => {
    const { menuOpen, setMenuOpen } = useMenu();

    return ( 
        <>
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
        </>
     );
}
 
export default Menu;