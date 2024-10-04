"use client";

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
import { usePathname } from "next/navigation";
import { AiOutlineHome, AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { FiActivity, FiLogOut } from "react-icons/fi";
import { LuPlay } from "react-icons/lu";

import { Logo } from "./icons";
import NavbarAuth from "./navbar-auth";
import { ThemeSwitch } from "./theme-switch";

export default function Navbar() {
  const pathname = usePathname();
  const menuItems = [
    { name: "Feed", icon: AiOutlineHome, path: "/" },
    { name: "Tips", icon: FiActivity, path: "/?category=Tip" },
    { name: "Stories", icon: LuPlay, path: "/?category=Story" },
    { name: "Profile", icon: AiOutlineUser, path: "/my-account/profile" },
  ];

  const mobileMenuItems = [
    { name: "Home", icon: AiOutlineHome, path: "/" },
    { name: "Profile", icon: AiOutlineUser, path: "/my-account/profile" },
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
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
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
