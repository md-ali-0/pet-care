import logo from "@/assets/logo/logo.png";
import { Link } from "@nextui-org/link";
import Image from "next/image";
import { Dispatch, FC, SetStateAction } from "react";
import SideBarMenuItem from "./dash-sidebar-menu-item";

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <>
            <div
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden ${
                    sidebarOpen ? "block" : "hidden"
                }`}
            ></div>
            <div
                className={`fixed inset-y-0 left-0 z-30 w-64 flex flex-col bg-gray-900 dark:bg-default-50 min-h-screen transition duration-300 transform lg:translate-x-0 lg:static lg:inset-0 ${
                    sidebarOpen
                        ? "translate-x-0 ease-out"
                        : "-translate-x-full ease-in"
                }`}
            >
                <div className="flex items-center justify-center border-b border-gray-800 dark:border-default-100 py-[18px]">
                    <Link href="/dashboard">
                        <Image
                            src={logo}
                            alt=""
                            className="w-14 invert"
                            width={56}
                            height={20}
                        />
                    </Link>
                </div>
                <div className="overflow-y-auto custom-scroll">
                    <nav className="mt-5 px-3">
                        <ul>
                            <h4 className="text-gray-400 font-semibold text-xs mb-1">
                                Main
                            </h4>
                            <SideBarMenuItem
                                menu={{
                                    name: "Dashboard",
                                    icon: "LayoutDashboard",
                                    path: "/dashboard",
                                }}
                            />
                            <SideBarMenuItem
                                menu={{
                                    name: "Posts",
                                    icon: "ListMinus",
                                    path: "/dashboard/posts",
                                }}
                            />
                            <SideBarMenuItem
                                menu={{
                                    name: "Payments",
                                    icon: "BadgeCent",
                                    path: "/dashboard/payments",
                                }}
                            />
                            <SideBarMenuItem
                                menu={{
                                    name: "Users",
                                    icon: "Users",
                                    path: "/dashboard/users",
                                }}
                            />

                            {/* <h4 className="text-gray-400 font-semibold text-xs mt-2">
                                Settings
                            </h4> */}
                            <SideBarMenuItem
                                menu={{
                                    name: "Back to Home",
                                    icon: "House",
                                    path: "/",
                                }}
                            />
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
