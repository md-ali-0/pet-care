"use client";

import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import Image from "next/image";
import { useState } from "react";
import { LuBadgeCheck, LuCalendarClock } from "react-icons/lu";
import { toast } from "sonner";

import {
  useFollowMutation,
  useGetMeQuery,
  useUnfollowMutation,
} from "@/redux/features/user/userApi";
import { TUser } from "@/types/TUser";

export default function ProfileHeader({ profileData }: { profileData: TUser }) {
  const { data: me } = useGetMeQuery(undefined);
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
    <Card>
      <div className="relative">
        <Image
          alt="Cover Photo"
          className="w-full h-48 object-cover rounded-t-lg"
          height={200}
          src={profileData.cover as string}
          width={800}
        />
        <div className="absolute -bottom-12 left-6 ">
          <Image
            alt="Profile Picture"
            className="size-24 rounded-full border-4 border-white object-center object-cover"
            height={100}
            src={profileData.avatar as string}
            width={100}
          />
        </div>
      </div>
      <div className="p-6 pt-16">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg md:text-2xl font-bold">
              {profileData.name}
              {profileData.isPremium && (
                <LuBadgeCheck className="inline text-blue-500 ml-2" size={20} />
              )}
            </h1>
            <div className="flex flex-wrap items-center md:justify-start text-gray-600 py-1.5">
              <span className="">
                {profileData?.followers?.length} Followers
              </span>
              <span className="mx-2">•</span>
              <span>{profileData?.following?.length} Following</span>
            </div>
            <div className="flex items-center text-gray-600 mt-2">
              <LuCalendarClock className="inline mr-2" />
              <span>
                Joined on{" "}
                {new Date(profileData?.createdAt as Date).toDateString()}
              </span>
            </div>
          </div>
          {me?.following.includes(profileData._id as string) ? (
            <Button
              color="danger"
              isLoading={isLoading}
              variant="shadow"
              onClick={() => handleUnFollow(profileData?._id as string)}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              color="primary"
              isLoading={isLoading}
              variant="shadow"
              onClick={() => handleFollow(profileData?._id as string)}
            >
              Follow
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
