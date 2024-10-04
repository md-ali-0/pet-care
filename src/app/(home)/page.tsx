import { Card } from "@nextui-org/card";
import Image from "next/image";
import {
  LuBadge,
  LuGlobe,
  LuLogOut,
  LuSettings,
  LuTv,
  LuUser2,
} from "react-icons/lu";

import CreatePost from "@/components/posts/create-post";
import LatestPosts from "@/components/posts/latest-posts";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
      {/* <!-- Sidebar --> */}
      <div className="w-full lg:col-span-3 hidden lg:block">
        <Card className="p-4 sticky top-20" radius="sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">New Feeds</h2>
            <ul>
              <li className="flex items-center mb-4">
                <LuTv className="text-blue-500 mr-3" />
                <span>Newsfeed</span>
              </li>
              <li className="flex items-center mb-4">
                <LuBadge className="text-red-500 mr-3" />
                <span>Badges</span>
              </li>
              <li className="flex items-center mb-4">
                <LuGlobe className="text-yellow-500 mr-3" />
                <span>Explore Stories</span>
              </li>
              <li className="flex items-center mb-4">
                <LuUser2 className="text-blue-500 mr-3" />
                <span>Author Profile</span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Account</h2>
            <ul>
              <li className="flex items-center mb-4">
                <LuSettings className="ext-gray-500 mr-3" />
                <span>Settings</span>
              </li>
              <li className="flex items-center mb-4">
                <LuLogOut className="ext-gray-500 mr-3" />
                <span>Logout</span>
              </li>
            </ul>
          </div>
        </Card>
      </div>
      {/* <!-- Main Content --> */}
      <div className="w-full md:col-span-8 lg:col-span-6">
        {/* <!-- Create Post --> */}
        <CreatePost />
        {/* <!-- Post --> */}
        <LatestPosts />
      </div>
      {/* <!-- Friend Requests --> */}

      <div className="w-full md:col-span-4 lg:col-span-3  hidden md:block">
        <Card className="p-4 sticky top-20" radius="sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Friend Request</h2>
            <span className="text-blue-500">See all</span>
          </div>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Image
                alt="Friend request profile picture"
                className="rounded-full mr-3"
                height="40"
                src="https://storage.googleapis.com/a1aa/image/h9uV2KSd2eSjdKehSBku73rMaowzKmLOUmRsZfG3cyBM1kFnA.jpg"
                width="40"
              />
              <div>
                <h3 className="font-semibold">Anthony Daugloi</h3>
                <span className="text-gray-500 text-sm">12 mutual friends</span>
              </div>
            </div>
            <div className="flex justify-between">
              <button className="bg-blue-500 text-white px-4 py-1 rounded-lg">
                Confirm
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-1 rounded-lg">
                Delete
              </button>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Image
                alt="Friend request profile picture"
                className="rounded-full mr-3"
                height="40"
                src="https://storage.googleapis.com/a1aa/image/h9uV2KSd2eSjdKehSBku73rMaowzKmLOUmRsZfG3cyBM1kFnA.jpg"
                width="40"
              />
              <div>
                <h3 className="font-semibold">Mohannad Zitoun</h3>
                <span className="text-gray-500 text-sm">12 mutual friends</span>
              </div>
            </div>
            <div className="flex justify-between">
              <button className="bg-blue-500 text-white px-4 py-1 rounded-lg">
                Confirm
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-1 rounded-lg">
                Delete
              </button>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Image
                alt="Friend request profile picture"
                className="rounded-full mr-3"
                height="40"
                src="https://storage.googleapis.com/a1aa/image/h9uV2KSd2eSjdKehSBku73rMaowzKmLOUmRsZfG3cyBM1kFnA.jpg"
                width="40"
              />
              <div>
                <h3 className="font-semibold">Mohannad Zitoun</h3>
                <span className="text-gray-500 text-sm">12 mutual friends</span>
              </div>
            </div>
            <div className="flex justify-between">
              <button className="bg-blue-500 text-white px-4 py-1 rounded-lg">
                Confirm
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-1 rounded-lg">
                Delete
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
