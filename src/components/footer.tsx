import { Link } from "@nextui-org/link";
import { FaFacebookSquare, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
export default function Footer() {
  return (
    <footer className="flex w-full flex-col">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 py-5 lg:px-8">
        <div className="flex items-center justify-center">
          <svg fill="none" height={44} viewBox="0 0 32 32" width={44}>
            <path
              clipRule="evenodd"
              d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
          <span className="text-medium font-medium">ACME</span>
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
            <FaFacebookSquare className="text-primary-500" size={22} />
          </Link>
          <Link isExternal href="#" title="facebook page">
            <span className="sr-only">Instagram </span>
            <FaInstagram className="text-pink-500" size={22} />
          </Link>
          <Link isExternal href="#" title="facebook page">
            <span className="sr-only">X</span>
            <FaSquareXTwitter className="text-default-900" size={22} />
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
          © 2024 Acme Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
