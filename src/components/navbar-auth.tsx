"use client";

import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Link } from "@nextui-org/link";
import { NavbarItem } from "@nextui-org/navbar";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useSession } from "@/provider/session-provider";
import { signout } from "@/utils/actions/auth";

export default function NavbarAuth() {
  const { session, setIsLoading } = useSession();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signout();
      setIsLoading(false);

      toast.success("Logout Successfully");
      router.push("/");
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      {session?.user ? (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name={session?.name as string}
              size="sm"
              src={session?.avatar as string}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{session?.email}</p>
            </DropdownItem>
            <DropdownItem key="settings" as={Link} href="/my-account/profile">
              My Profile
            </DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <>
          <NavbarItem className="hidden lg:flex">
            <Button
              as={Link}
              color="primary"
              href="/auth/signin"
              variant="flat"
            >
              Sign In
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              className="ring-0 outline-none"
              color="primary"
              href="/auth/signup"
              variant="shadow"
            >
              Sign Up
            </Button>
          </NavbarItem>
        </>
      )}
    </>
  );
}
