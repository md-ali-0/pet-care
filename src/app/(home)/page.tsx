"use client";

import NewUsers from "@/components/people/new-users";
import CreatePost from "@/components/posts/create-post";
import LatestPosts from "@/components/posts/latest-posts";
import Banner from "@/components/premium/banner";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { useState } from "react";
import {
  LuBadge,
  LuGlobe,
  LuLogOut,
  LuTv,
  LuUser2
} from "react-icons/lu";

import { useSession } from "@/provider/session-provider";
import { baseApi } from "@/redux/api/baseApi";
import { useAppDispatch } from "@/redux/hooks";
import { signout } from "@/utils/actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [category, setCaregory] = useState<string | undefined>(undefined);

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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* <!-- Sidebar --> */}
            <div className="w-full lg:col-span-3 hidden lg:block space-y-5">
                <Card className="p-4">
                    <Input
                        isClearable
                        color="primary"
                        label="Search ..."
                        size="sm"
                        type="email"
                        value={search}
                        variant={"bordered"}
                        onValueChange={setSearch}
                    />
                    <div className="flex justify-between items-center py-2">
                        <h3 className="text-default-500">Category : </h3>
                        <RadioGroup orientation="horizontal" size="sm" value={category} onValueChange={setCaregory}>
                            <Radio value="Tip">Tip</Radio>
                            <Radio value="Story">Story</Radio>
                        </RadioGroup>
                    </div>
                    <div className="flex justify-end items-center py-2 gap-2">
                        <Button size="sm" color="danger" variant="flat" onClick={()=>{
                          setSearch(undefined)
                          setCaregory(undefined)
                        }}>
                            Clear
                        </Button>
                        <Button size="sm" color="primary" >
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
                                <LuTv className="text-blue-500 mr-3" size={20} />
                                <span>Newsfeed</span>
                              </Link>
                            </li>
                            <li className="flex items-center mb-4 cursor-pointer" onClick={()=>setCaregory('Tip')}>
                                <LuBadge className="text-red-500 mr-3" size={20} />
                                <span>Explore Tip</span>
                            </li>
                            <li className="flex items-center mb-4 cursor-pointer" onClick={()=>setCaregory('Story')}>
                                <LuGlobe className="text-yellow-500 mr-3" size={20} />
                                <span>Explore Stories</span>
                            </li>
                            <li className="flex items-center cursor-pointer">
                            <Link href="/user/profile">
                            <LuUser2 className="text-blue-500 mr-3" size={20} />
                            <span>Author Profile</span>
                              </Link>
                            </li>
                        </ul>
                    </div>
                    {
                      session?.user && 
                      <div>
                        <h2 className="text-lg font-semibold mb-4">Account</h2>
                        <ul>
                            <li className="flex items-center mb-4 cursor-pointer" onClick={handleLogout}>
                                <LuLogOut className="ext-gray-500 mr-3" />
                                <span>Logout</span>
                            </li>
                        </ul>
                    </div>
                    }
                    
                </Card>
            </div>
            {/* <!-- Main Content --> */}
            <div className="w-full md:col-span-8 lg:col-span-6">
                {/* <!-- Create Post --> */}
                <CreatePost />
                {/* <!-- Post --> */}
                <LatestPosts search={search} category={category} />
            </div>
            {/* <!-- Friend Requests --> */}

            <div className="w-full md:col-span-4 lg:col-span-3  hidden md:block space-y-5">
                <Banner/>
                <NewUsers />
            </div>
        </div>
    );
}
