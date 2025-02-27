import Image from "next/image";
import { APP_INFORMATION } from "../../constants/theme";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer bg-base-200 text-base-content p-10 border-t border-black">
            <aside>
                <Image alt="logo" height={50} width={50} src={"/paw_logo.png"}/>
                <p>
                    {APP_INFORMATION.name}
                    <br />
                    Making the adoption process easier since 2025.
                </p>
            </aside>
            {/* <nav>
                <h6 className="footer-title">Services</h6>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </nav> */}
            <nav>
                <Link href={"/about-us"} className="link link-hover">About us</Link>
                <Link href={"/contact-us"} className="link link-hover">Contact</Link>
            </nav>
            <nav>
                <Link href={"https://www.termsfeed.com/live/1fbf9835-934e-48ce-a666-3ea5308fff54"} className="link link-hover">Terms of use</Link>
                <Link href={"https://www.termsfeed.com/live/61babb83-fcab-41ea-b25f-7f93475c6417"} className="link link-hover">Privacy policy</Link>
                <Link href={"https://www.termsfeed.com/live/ab691182-65f3-4a57-b23c-274dbc6350a3"} className="link link-hover">Cookie policy</Link>
            </nav>
      </footer>
    )
}