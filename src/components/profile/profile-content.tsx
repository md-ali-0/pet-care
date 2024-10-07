/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import { Card, CardHeader } from "@nextui-org/card";
import Image from "next/image";
import { useState } from "react";
import { LuCake, LuMail, LuPhoneCall } from "react-icons/lu";

import AboutSection from "./about-section";
import FollowersSection from "./followers-section";
import FollowingSection from "./following-section";
import PostsSection from "./posts-section";

import { TPost } from "@/types";
import { TUser } from "@/types/TUser";

export default function ProfileContent({
  profileData,
  userPosts,
}: {
  profileData: TUser;
  userPosts: TPost[];
}) {
  const [activeTab, setActiveTab] = useState("Feed");

  return (
    <>
      <div className="mt-4">
        <ul className="flex space-x-4 border-b">
          <li
            className={`"px-3 py-2.5 cursor-pointer ${
              activeTab === "Feed" && "border-b-2 border-blue-500 text-blue-500"
            }`}
            onClick={() => setActiveTab("Feed")}
          >
            Feed
          </li>
          <li
            className={`"px-3 py-2.5 cursor-pointer ${
              activeTab === "About" &&
              "border-b-2 border-blue-500 text-blue-500"
            }`}
            onClick={() => setActiveTab("About")}
          >
            About
          </li>
          <li
            className={`"px-3 py-2.5 cursor-pointer ${
              activeTab === "Followers" &&
              "border-b-2 border-blue-500 text-blue-500"
            }`}
            onClick={() => setActiveTab("Followers")}
          >
            Followers
            <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
              {profileData?.followers?.length}
            </span>
          </li>
          <li
            className={`"px-3 py-2.5 cursor-pointer ${
              activeTab === "Following" &&
              "border-b-2 border-blue-500 text-blue-500"
            }`}
            onClick={() => setActiveTab("Following")}
          >
            Following
            <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
              {profileData?.following?.length}
            </span>
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-12 mt-6 gap-5">
        <div className="col-span-12 md:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">About</h2>
            </CardHeader>
            <div className="p-4">
              <p className="text-gray-600 mb-4">{profileData.bio || "N/A"}</p>
              <p className="flex items-center text-gray-600 gap-2 mb-1">
                <LuCake className="inline" size={18} />
                <strong>Born:</strong>
                {profileData?.birthdate
                  ? new Date(profileData?.birthdate).toLocaleDateString()
                  : "N/A"}
              </p>
              <p className="flex items-center text-gray-600 gap-2 mb-1">
                <LuPhoneCall className="inline" size={18} />
                <strong>Phone:</strong>
                {profileData?.phone}
              </p>
              <p className="flex items-center text-gray-600 gap-2 mb-1">
                <LuMail className="inline" size={18} />
                <strong>Email:</strong>
                {profileData?.email}
              </p>
            </div>
          </Card>
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Photos</h2>
            </CardHeader>
            <div className="flex flex-wrap p-4">
              {userPosts?.map((post: TPost) => (
                <div key={post._id} className="flex flex-wrap">
                  {post.imageUrls?.map((item, idx) => (
                    <Image
                      key={idx}
                      alt=""
                      className="inline rounded-lg m-2"
                      height={150}
                      src={item}
                      width={150}
                    />
                  ))}
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="col-span-12 md:col-span-8">
          {activeTab === "Feed" && <PostsSection userPosts={userPosts} />}
          {activeTab === "About" && <AboutSection profileData={profileData} />}
          {activeTab === "Followers" && (
            <FollowersSection profileData={profileData} />
          )}
          {activeTab === "Following" && (
            <FollowingSection profileData={profileData} />
          )}
        </div>
      </div>
    </>
  );
}
