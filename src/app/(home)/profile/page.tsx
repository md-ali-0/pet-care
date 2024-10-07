import { notFound } from "next/navigation";

import ProfileContent from "@/components/profile/profile-content";
import ProfileHeader from "@/components/profile/profile-header";
import { getProfile, getUsersPosts } from "@/utils/actions/profile";

interface ProfilePageProps {
  id: string;
}

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: ProfilePageProps;
}) {
  const { id } = searchParams;

  if (!id) {
    notFound();
  }

  const { data: profileData } = await getProfile(id);

  if (!profileData) {
    notFound();
  }

  const { data: userPosts } = await getUsersPosts(id);

  return (
    <>
      <ProfileHeader profileData={profileData} />
      <ProfileContent profileData={profileData} userPosts={userPosts} />
    </>
  );
}
