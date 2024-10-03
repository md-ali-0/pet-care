"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
import { Tab, Tabs } from "@nextui-org/tabs";
import { useState } from "react";

import AboutProfile from "./about-profile";
import UpdatePassword from "./update-password";
import UpdateProfile from "./update-profile";

import { useGetMeQuery } from "@/redux/features/user/userApi";
import { TUser } from "@/types/TUser";

export default function MyProfileContnet() {
  const { data: user, isLoading } = useGetMeQuery(undefined);
  const [selected, setSelected] = useState<string>("About");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [updatedBio, setUpdatedBio] = useState(user?.bio || "");

  // Demo Data (in place of actual API data)
  const demoPosts = [
    {
      id: "1",
      title: "My First Post",
      content: "This is the content of my first post.",
    },
    {
      id: "2",
      title: "Traveling to the Mountains",
      content: "Content about my recent travel adventures.",
    },
  ];
  const demoFollowers = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Alice Johnson" },
  ];

  const handleEditPost = (postId: string) => {
    setEditingPost(postId);
    setShowEditModal(true);
  };

  const handleSavePost = () => {
    // Simulate saving the post
    setShowEditModal(false);
    setEditingPost(null);
  };

  if (isLoading) {
    return (
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={(key) => setSelected(String(key))}
      >
        <Tab key="About" title="About">
          <Card>
            <CardHeader>
              <Skeleton className="w-full h-6" />
            </CardHeader>
            <CardBody>
              <Skeleton className="w-[60%] h-4" />
              <Skeleton className="w-[80%] h-4" />
              <Skeleton className="w-[40%] h-4" />
            </CardBody>
          </Card>
        </Tab>

        <Tab key="Update Profile" title="Update Profile">
          <Card>
            <CardHeader>
              <Skeleton className={"w-full h-6"} />
            </CardHeader>
            <CardBody>
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-[60%] h-8" />
            </CardBody>
          </Card>
        </Tab>

        <Tab key="Posts" title="Posts">
          <Card>
            <CardHeader>
              <Skeleton className={"w-full h-6"} />
            </CardHeader>
            <CardBody>
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-full h-5" />
            </CardBody>
          </Card>
        </Tab>

        <Tab key="Followers" title="Followers">
          <Card>
            <CardHeader>
              <Skeleton className={"w-full h-6"} />
            </CardHeader>
            <CardBody>
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-full h-5" />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    );
  }

  return (
    <Tabs
      aria-label="Options"
      selectedKey={selected}
      onSelectionChange={(key) => setSelected(String(key))}
    >
      <Tab key="About" title="About">
        <Card>
          <CardHeader>
            <h3 className="text-xl font-medium">About</h3>
          </CardHeader>
          <CardBody>
            <AboutProfile user={user as TUser} />
          </CardBody>
        </Card>
      </Tab>

      <Tab key="Update Profile" title="Update Profile">
        <Card>
          <CardHeader>
            <h3 className="text-xl font-medium">Update Profile</h3>
          </CardHeader>
          <CardBody>
            <UpdateProfile user={user as TUser} />
          </CardBody>
        </Card>
        <Card className="mt-5">
          <CardHeader>
            <h3 className="text-xl font-medium">Update Password</h3>
          </CardHeader>
          <CardBody>
            <UpdatePassword />
          </CardBody>
        </Card>
      </Tab>

      <Tab key="Posts" title="Posts">
        <Card>
          <CardHeader>
            <h3 className="text-xl font-medium">Your Posts</h3>
          </CardHeader>
          <CardBody>
            {demoPosts.length > 0 ? (
              <ul>
                {demoPosts.map((post) => (
                  <li key={post.id} className="mb-4">
                    <h4 className="font-bold">{post.title}</h4>
                    <p>{post.content}</p>
                    <Button onClick={() => handleEditPost(post.id)}>
                      Edit
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No posts available.</p>
            )}
          </CardBody>
        </Card>
      </Tab>

      <Tab key="Followers" title="Followers">
        <Card>
          <CardHeader>
            <h3 className="text-xl font-medium">Your Followers</h3>
          </CardHeader>
          <CardBody>
            {demoFollowers.length > 0 ? (
              <ul>
                {demoFollowers.map((follower) => (
                  <li key={follower.id} className="mb-4">
                    <p>{follower.name}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No followers yet.</p>
            )}
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
}
