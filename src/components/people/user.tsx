import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import {
  useFollowMutation,
  useUnfollowMutation,
} from "@/redux/features/user/userApi";
import { TUser } from "@/types/TUser";

interface UserProps {
  user: TUser;
  me: TUser;
}

export default function User({ user, me }: UserProps) {
  const [isLoading, setIsloading] = useState(false);

  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();

  const handleFollow = async (id: string) => {
    if (!me) {
      return toast.error("You are not logged in");
    }
    setIsloading(true);
    await follow({ followingId: id });
    setIsloading(false);
  };
  const handleUnFollow = async (id: string) => {
    if (!me) {
      return toast.error("You are not logged in");
    }
    setIsloading(true);
    await unfollow({ followingId: id });
    setIsloading(false);
  };

  return (
    <div key={user._id} className="mb-4">
      <div className="flex items-center mb-2">
        <Image
          alt="Friend request profile picture"
          className="rounded-full size-10 object-top object-cover mr-3"
          height="40"
          src={user.avatar as string}
          width="40"
        />
        <div>
          <Link className="block" href={`/profile?id=${user._id}`}>
            <h3 className="font-semibold">{user.name}</h3>
          </Link>
          <span className="text-gray-500 text-sm">
            {user.followers.length || 0} followers
          </span>
        </div>
        <div className="ml-auto">
          {me?.following.includes(user._id as string) ? (
            <Button
              className="bg-blue-500 text-white px-4 py-1 rounded-lg"
              isLoading={isLoading}
              size="sm"
              onClick={() => handleUnFollow(user?._id as string)}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              className="bg-blue-500 text-white px-4 py-1 rounded-lg"
              isLoading={isLoading}
              size="sm"
              onClick={() => handleFollow(user?._id as string)}
            >
              Follow
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
