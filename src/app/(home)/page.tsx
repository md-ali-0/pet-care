import { Card } from "@nextui-org/card";
import {
  LuBadge,
  LuGlobe,
  LuLogOut,
  LuSettings,
  LuTv,
  LuUser2,
} from "react-icons/lu";

import CreatePost from "@/components/posts/create-post";

export default function Home() {
  return (
    // <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-lg">
    //   <div className="flex items-center space-x-4">
    //     <img
    //       alt="Profile picture of a person"
    //       className="w-12 h-12 rounded-full"
    //       height="50"
    //       src="https://storage.googleapis.com/a1aa/image/MKf4xKR7SXTIVqse6S7PtHWSkupkFEFluo6aidDE8DgTVyiTA.jpg"
    //       width="50"
    //     />
    //     <input
    //       className="flex-grow bg-gray-100 rounded-full px-4 py-2 text-gray-500 focus:outline-none"
    //       placeholder="Write something to Lerio.."
    //       type="text"
    //     />
    //     <i className="far fa-smile text-gray-400" />
    //   </div>
    //   <div className="flex justify-around mt-4">
    //     <div className="flex items-center space-x-2 text-red-500">
    //       <LuVideo />
    //       <span>Live</span>
    //     </div>
    //     <div className="flex items-center space-x-2 text-green-500">
    //       <LuImage />
    //       <span>Photo/Video</span>
    //     </div>
    //     <div className="flex items-center space-x-2 text-yellow-500">
    //       <LuSmile />
    //       <span>Fallings/Activity</span>
    //     </div>
    //   </div>
    // </div>
    <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
      {/* <!-- Sidebar --> */}
      <div className="w-full md:col-span-1">
        <Card className="p-4">
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
      <div className="w-full md:col-span-3">
        {/* <!-- Create Post --> */}
        <CreatePost />
        {/* <!-- Post --> */}
        <Card className="p-4">
          <div className="flex items-center mb-4">
            <img
              alt="User profile picture"
              className="rounded-full mr-3"
              height="40"
              src="https://storage.googleapis.com/a1aa/image/IivhfgyRh1WqayqLULwCwKmIqf9FV343mFeLnn0uAauL1kFnA.jpg"
              width="40"
            />
            <div>
              <h3 className="font-semibold">Surfiya Zakir</h3>
              <span className="text-gray-500 text-sm">3 hour ago</span>
            </div>
            <i className="fas fa-ellipsis-h text-gray-500 ml-auto" />
          </div>
          <p className="text-gray-700 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla
            dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus
            mollis pharetra. Proin blandit ac massa sed rhoncus
            <span className="text-blue-500">See more</span>
          </p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <img
              alt="Image 1"
              className="rounded-lg"
              height="150"
              src="https://storage.googleapis.com/a1aa/image/3Rg3r5rJzJ67KBS0wqTTtHhv07gdU3inuzyHJ9ixgPyoms4E.jpg"
              width="150"
            />
            <img
              alt="Image 2"
              className="rounded-lg"
              height="150"
              src="https://storage.googleapis.com/a1aa/image/EkqM8VMcwpKjHZl5OS5ennjZrpT35kUmCZx9xfvzjNzhayiTA.jpg"
              width="150"
            />
            <div className="relative">
              <img
                alt="Image 3"
                className="rounded-lg"
                height="150"
                src="https://storage.googleapis.com/a1aa/image/U4MMlSfCIESOF6Yy8eOl0ZpfC5chvGsXqxw3aY38b90E1kFnA.jpg"
                width="150"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <span className="text-white text-lg font-semibold">+2</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <i className="fas fa-thumbs-up text-blue-500 mr-2" />
              <span>2.8K Like</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-comment text-gray-500 mr-2" />
              <span>22 Comment</span>
            </div>
            <i className="fas fa-share text-gray-500" />
          </div>
        </Card>
      </div>
      {/* <!-- Friend Requests --> */}

      <div className="w-full md:col-span-1">
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Friend Request</h2>
            <span className="text-blue-500">See all</span>
          </div>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <img
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
              <img
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
              <img
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
