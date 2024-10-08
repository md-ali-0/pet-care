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
import { baseApi } from "@/redux/api/baseApi";
import { useAppDispatch } from "@/redux/hooks";
import { signout } from "@/utils/actions/auth";

export default function NavbarAuth() {
    const { session, setIsLoading } = useSession();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const handleLogout = async () => {
        try {
            setIsLoading(true);
            await signout();
            setIsLoading(false);

            toast.success("Logout Successfully");
            dispatch(baseApi.util.invalidateTags(["userData"]));
            router.replace("/auth/signin");
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

                        {session?.role === "admin" ? (
                            <DropdownItem
                                key="settings"
                                as={Link}
                                href="/dashboard"
                            >
                                Dashboard
                            </DropdownItem>
                        ) : (
                            <DropdownItem
                                key="settings"
                                as={Link}
                                href="/user/profile"
                            >
                                My Profile
                            </DropdownItem>
                        )}
                        <DropdownItem
                            key="logout"
                            color="danger"
                            onClick={handleLogout}
                        >
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
