import logo from "@/assets/logo/logo.png";
import { Link } from "@nextui-org/link";
import Image from "next/image";
import { FaFacebookSquare, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="flex w-full flex-col">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 py-5 lg:px-8">
                <div className="flex items-center justify-center">
                    <Image
                        alt="logo"
                        className="w-32"
                        src={logo}
                        width={500}
                        height={250}
                    />
                </div>
                <span
                    aria-hidden="true"
                    className="w-px h-px block"
                    style={{ marginLeft: "0.25rem", marginTop: "1rem" }}
                />
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                    <Link color="foreground" href="/" size="sm">
                        Home
                    </Link>
                    <Link color="foreground" href="/about-us" size="sm">
                        About
                    </Link>
                    <Link color="foreground" href="/services" size="sm">
                        Services
                    </Link>
                    <Link color="foreground" href="/services" size="sm">
                        Contact
                    </Link>
                    <Link color="foreground" href="/services" size="sm">
                        Services
                    </Link>
                </div>
                <span
                    aria-hidden="true"
                    className="w-px h-px block"
                    style={{ marginLeft: "0.25rem", marginTop: "1.5rem" }}
                />
                <div className="flex justify-center gap-x-4">
                    <Link isExternal href="#" title="facebook page">
                        <span className="sr-only">Facebook</span>
                        <FaFacebookSquare
                            className="text-primary-500"
                            size={22}
                        />
                    </Link>
                    <Link isExternal href="#" title="facebook page">
                        <span className="sr-only">Instagram </span>
                        <FaInstagram className="text-pink-500" size={22} />
                    </Link>
                    <Link isExternal href="#" title="facebook page">
                        <span className="sr-only">X</span>
                        <FaSquareXTwitter
                            className="text-default-900"
                            size={22}
                        />
                    </Link>
                    <Link isExternal href="#" title="facebook page">
                        <span className="sr-only">Youtube </span>
                        <FaYoutube className="text-red-500" size={22} />
                    </Link>
                </div>
                <span
                    aria-hidden="true"
                    className="w-px h-px block"
                    style={{ marginLeft: "0.25rem", marginTop: "1rem" }}
                />
                <p className="mt-1 text-center text-small text-default-400">
                    © 2024 PetCare. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
