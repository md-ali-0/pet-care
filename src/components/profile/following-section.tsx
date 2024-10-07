import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import { TUser } from "@/types/TUser";

export default function FollowingSection({
  profileData,
}: {
  profileData: TUser;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {profileData?.following.length > 0 ? (
        profileData?.following?.map((user: any) => (
          <div
            key={user?._id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
          >
            <img
              alt="Portrait of Frances Guerrero"
              className="w-24 h-24 rounded-full mb-4"
              src={user?.avatar}
            />
            <h2 className="text-lg font-semibold">{user?.name}</h2>
            <div className="flex flex-wrap items-center md:justify-start text-gray-600 py-1.5">
              <span className="">
                {profileData?.followers?.length} Followers
              </span>
              <span className="mx-2">•</span>
              <span>{profileData?.following?.length} Following</span>
            </div>
            <div className="flex mt-4 space-x-2">
              <Button
                as={Link}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
                href={`/profile?id=${user._id}`}
              >
                View Profile
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-1 md:col-span-3">
          <h3 className="text-center my-5">No Following Found</h3>
        </div>
      )}
    </div>
  );
}
