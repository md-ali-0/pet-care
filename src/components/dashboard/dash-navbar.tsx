import { useSession } from "@/provider/session-provider";
import { baseApi } from "@/redux/api/baseApi";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { useAppDispatch } from "@/redux/hooks";
import { signout } from "@/utils/actions/auth";
import { Avatar } from "@nextui-org/avatar";
import { Link } from "@nextui-org/link";
import { Skeleton } from "@nextui-org/skeleton";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { toast } from "sonner";

interface DashNavbarProps {
    sidebarOpen: boolean;
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const DashNavbar: FC<DashNavbarProps> = ({ sidebarOpen, setSidebarOpen }) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { data: userData, isLoading, refetch } = useGetMeQuery(undefined);

    const { session, setIsLoading } = useSession();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const handleLogout = async () => {
        try {
            setIsLoading(true);
            await signout();
            setIsLoading(false);

            toast.success("Logout Successfully");
            dispatch(baseApi.util.invalidateTags(['userData']))
            router.replace("/auth/signin");
        } catch (error) {
            throw error;
        }
    };

    return (
        <div className="flex relative items-center justify-between px-6 py-3 dark:bg-default-50 border border-default-100">
            <div className="flex items-center">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-gray-500 focus:outline-none lg:hidden"
                >
                    <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4 6H20M4 12H20M4 18H11"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                <div className="relative mx-2 py-1.5 bg-default-50 rounded-lg border border-default-200 lg:mx-0">
                    <Search
                        fontSize={20}
                        className="text-gray-400  absolute top-1/2 left-3 -translate-y-1/2"
                    />

                    <input
                        className="w-64 pl-10 bg-transparent outline-none pr-4"
                        type="text"
                        placeholder="Search"
                    />
                </div>
            </div>

            <div className="flex gap-4 items-center">
                <div className="flex items-center">
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="relative block w-10 h-10 overflow-hidden rounded-full shadow focus:outline-none"
                        >
                            {isLoading ? (
                                <div className="flex items-center space-x-4">
                                    <Skeleton className="size-10 rounded-full" />
                                </div>
                            ) : (
                                <Avatar src={session?.avatar as string} />
                            )}
                        </button>

                        <div
                            onClick={() => setDropdownOpen(false)}
                            className={`fixed inset-0 z-10 w-full h-full ${
                                dropdownOpen ? "" : "hidden"
                            }`}
                        ></div>

                        <div
                            className={`absolute right-0 z-10 w-48 mt-2 overflow-hidden bg-white dark:bg-muted rounded-md shadow-xl ${
                                dropdownOpen ? "" : "hidden"
                            }`}
                        >
                            <Link
                                href="/dashboard/profile"
                                className="block px-4 py-2 text-sm hover:bg-primary hover:text-white"
                            >
                                Profile
                            </Link>
                            <div
                                onClick={handleLogout}
                                className="block px-4 cursor-pointer py-2 text-sm hover:bg-primary hover:text-white"
                            >
                                Logout
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashNavbar;
