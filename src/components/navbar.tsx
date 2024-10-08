"use client";

import logo from '@/assets/logo/logo.png';
import { Link } from "@nextui-org/link";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import { LucideSquareUser } from 'lucide-react';
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AiOutlineHome, AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { FiActivity, FiLogOut } from "react-icons/fi";
import { LuBook } from "react-icons/lu";
import NavbarAuth from "./navbar-auth";
import { ThemeSwitch } from "./theme-switch";

export default function Navbar() {
  const pathname = usePathname();
  const menuItems = [
    { name: "Feed", icon: AiOutlineHome, path: "/" },
    { name: "Profile", icon: AiOutlineUser, path: "/user/profile" },
    { name: "About us", icon: LuBook, path: "/about-us" },
    { name: "Contact Us", icon: LucideSquareUser, path: "/contact-us" },
  ];

  const mobileMenuItems = [
    { name: "Home", icon: AiOutlineHome, path: "/" },
    { name: "Profile", icon: AiOutlineUser, path: "/user/profile" },
    { name: "Activity", icon: FiActivity, path: "/activity" },
    { name: "Settings", icon: AiOutlineSetting, path: "/settings" },
    { name: "Log Out", icon: FiLogOut, path: "/logout" },
  ];

  return (
    <NextUINavbar isBlurred isBordered className="fixed" maxWidth="xl">
      {/* <!-- Brand & Toggle --> */}
      <NavbarContent>
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand>
          <Link className="flex items-center gap-1" href="/">
            <Image alt="logo" className='w-32' src={logo} width={500} height={250}/>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* <!-- Center Navigation --> */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link
              className={`flex items-center gap-2 transition-all duration-300 ${
                pathname === item.path
                  ? "text-primary-500 border-b border-primary-500"
                  : "text-foreground"
              } hover:text-primary-400 rounded-xl px-3`}
              color="foreground"
              href={item.path}
            >
              <item.icon size={20} />
              <span className="text-lg">{item.name}</span>
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* <!-- Right Side --> */}
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarAuth />
      </NavbarContent>

      {/* <!-- Mobile Menu --> */}
      <NavbarMenu>
        {mobileMenuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className="w-full"
              color={
                pathname === item.path
                  ? "primary"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              href={item.path}
              size="lg"
            >
              <div className="flex items-center gap-2">
                <item.icon size={20} />
                {item.name}
              </div>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUINavbar>
  );
}
