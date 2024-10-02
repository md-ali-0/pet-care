import { notFound } from "next/navigation";

import ProfileHeader from "@/components/profile/profile-header";
import { getProfile } from "@/utils/actions/profile";

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

  return (
    <>
      <ProfileHeader profileData={profileData} />
    </>
  );
}
