import { Card } from "@nextui-org/card";
import {
  LuBadge,
  LuGlobe,
  LuLogOut,
  LuSettings,
  LuTv,
  LuUser2,
} from "react-icons/lu";

import NewUsers from "@/components/people/new-users";
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
        <NewUsers />
      </div>
    </div>
  );
}
