"use client";

import NewUsers from "@/components/people/new-users";
import CreatePost from "@/components/posts/create-post";
import LatestPosts from "@/components/posts/latest-posts";
import Banner from "@/components/premium/banner";
import { Link } from "@nextui-org/link";
import { useState } from "react";

import { useSession } from "@/provider/session-provider";
import { baseApi } from "@/redux/api/baseApi";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { useAppDispatch } from "@/redux/hooks";
import { signout } from "@/utils/actions/auth";
import { Card } from "@nextui-org/card";
import {
    Calendar,
    LucideHome,
    Settings,
    Users,
    UserSquare
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
    const [search, setSearch] = useState<string | undefined>("");
    const { data: me } = useGetMeQuery(undefined);

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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* <!-- Sidebar --> */}
            {/* <div className="w-full lg:col-span-3 hidden lg:block space-y-5">
                <Card className="p-4">
                    <input
                        type="search"
                        placeholder="Search here..."
                        className="py-2 px-4 block w-full outline-none border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        value={search}
                        onChange={(e) => setSearch(e.currentTarget.value)}
                    />
                    <div className="flex justify-end items-center py-2 gap-2">
                        <Button
                            size="sm"
                            color="danger"
                            variant="flat"
                            onClick={() => {
                                setSearch("");
                            }}
                        >
                            Clear
                        </Button>
                        <Button size="sm" color="primary">
                            Filter
                        </Button>
                    </div>
                </Card>
                <Card className="p-4 sticky top-20" radius="sm">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-4">
                            New Feeds
                        </h2>
                        <ul>
                            <li className="flex items-center mb-4 cursor-pointer">
                                <Link href="/">
                                    <LuTv
                                        className="text-blue-500 mr-3"
                                        size={20}
                                    />
                                    <span>Newsfeed</span>
                                </Link>
                            </li>
                            <li className="flex items-center cursor-pointer">
                                <Link href="/user/profile">
                                    <LuUser
                                        className="text-blue-500 mr-3"
                                        size={20}
                                    />
                                    <span>Author Profile</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {session?.user && (
                        <div>
                            <h2 className="text-lg font-semibold mb-4">
                                Account
                            </h2>
                            <ul>
                                <li
                                    className="flex items-center mb-4 cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    <LuLogOut className="ext-gray-500 mr-3" />
                                    <span>Logout</span>
                                </li>
                            </ul>
                        </div>
                    )}
                </Card>
            </div> */}
            <aside className="lg:col-span-3 rounded-xl shadow-sm">
                {/* Profile Section */}
                <Card className="sticky top-20">
                    <div className="p-8 text-center">
                        <div className="mb-4">
                            <Image
                                src={me?.avatar as string}
                                alt="Profile"
                                width={96}
                                height={96}
                                className="rounded-full mx-auto size-24"
                            />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            {me?.name}
                        </h2>
                        <p className="text-sm text-gray-500 my-2.5">
                            {me?.bio}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-5">
                            <div>
                                <div className="font-semibold text-gray-900">
                                    {me?.posts?.length}
                                </div>
                                <div className="text-xs text-gray-500">
                                    Post
                                </div>
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900">
                                    {me?.followers?.length}
                                </div>
                                <div className="text-xs text-gray-500">
                                    Followers
                                </div>
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900">
                                    {me?.following?.length}
                                </div>
                                <div className="text-xs text-gray-500">
                                    Following
                                </div>
                            </div>
                        </div>

                        {/* View Profile Button */}
                        <Link href="user/profile" className="block w-full py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            View Profile
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="px-2 pb-4">
                        <ul className="space-y-1">
                            <li>
                                <Link
                                    href="/"
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <LucideHome className="w-5 h-5 text-gray-500" />
                                    Feed
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/user/profile?active=Followers"
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <UserSquare className="w-5 h-5 text-gray-500" />
                                    Follwers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/user/profile?active=Following"
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <Users className="w-5 h-5 text-gray-500" />
                                    Following
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/user/profile?active=About"
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <Calendar className="w-5 h-5 text-gray-500" />
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/user/profile?active=EditProfile"
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <Settings className="w-5 h-5 text-gray-500" />
                                    Settings
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </Card>
            </aside>
            {/* <!-- Main Content --> */}
            <div className="w-full md:col-span-8 lg:col-span-6">
                {/* <!-- Create Post --> */}
                <CreatePost />
                {/* <!-- Post --> */}
                <LatestPosts search={search} />
            </div>
            {/* <!-- Friend Requests --> */}

            <div className="w-full md:col-span-4 lg:col-span-3  hidden md:block space-y-5">
                <Banner />
                <NewUsers />
            </div>
        </div>
    );
}
