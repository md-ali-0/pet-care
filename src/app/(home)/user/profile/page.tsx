import MyProfileContnet from "@/components/user/my-profile-contnet";
import MyProfileHeader from "@/components/user/my-profile-header";
import { getSession } from "@/libs/session";
import { getUsersPosts } from "@/utils/actions/profile";

export default async function MyProfilePage() {
  const session = await getSession();

  const { data: userPosts } = await getUsersPosts(session?.user as string);

  return (
    <>
      <MyProfileHeader />
      <MyProfileContnet userPosts={userPosts || []} />
    </>
  );
}
