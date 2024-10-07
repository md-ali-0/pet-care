import PostCard from "../posts/post-card";

import { TPost } from "@/types";

export default function PostsSection({ userPosts }: { userPosts: TPost[] }) {
  return (
    <div className="space-y-5">
      {userPosts.length > 0 ? (
        userPosts?.map((post: TPost) => <PostCard key={post._id} post={post} />)
      ) : (
        <h3 className="text-2xl text-center my-5"> No Post Found </h3>
      )}
    </div>
  );
}
