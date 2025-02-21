import Image from "next/image";
import { APP_INFORMATION } from "../../constants/theme";

export default function Footer() {
    return (
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
    )
}