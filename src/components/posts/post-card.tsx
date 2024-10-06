/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { SerializedError } from "@reduxjs/toolkit";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaComment, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { LuMoreHorizontal } from "react-icons/lu";
import { toast } from "sonner";

import Alert from "../ui/alert";
import { ShareModal } from "../ui/share-modal";

import EditPostModal from "./edit-post";
import PostDetailsModal from "./post-details-modal";

import { useSession } from "@/provider/session-provider";
import { useDeletePostMutation } from "@/redux/features/posts/postApi";
import {
  useDownvoteMutation,
  useUpvoteMutation,
} from "@/redux/features/vote/voteApi";
import { ErrorResponse, TPost } from "@/types";

export default function PostCard({ post }: { post: TPost }) {
  const { session } = useSession();
  const [showMore, setShowMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const [
    deletePost,
    {
      isSuccess: isDeletePostSuccess,
      isError: isDeletePostError,
      error: deletePosterror,
    },
  ] = useDeletePostMutation();

  const [visible, setVisible] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (isDeletePostError) {
      const errorResponse = deletePosterror as ErrorResponse | SerializedError;
      const errorMessage =
        (errorResponse as ErrorResponse)?.data?.message ||
        "Something Went Wrong";

      toast.error(errorMessage);
    } else if (isDeletePostSuccess) {
      toast.success("Post Deleted Successfully");
    }
  }, [isDeletePostError, isDeletePostSuccess, deletePosterror]);

  const handleDeletePost = async () => {
    await deletePost(post._id);
    setVisible(false);
  };

  const [upvote] = useUpvoteMutation();
  const [downvote] = useDownvoteMutation();

  const handleupvote = async () => {
    await upvote({ post: post._id });
  };
  const handledownvote = async () => {
    await downvote({ post: post._id });
  };

  return (
    <>
      <Card className="p-3 md:p-4" radius="sm">
        <CardBody>
          <div className="flex items-center mb-4">
            <Image
              alt={post?.author?.name as string}
              className="rounded-full size-10 mr-4"
              height="50"
              src={post?.author?.avatar as string}
              width="50"
            />
            <div className="flex-1">
              <div className="flex items-center">
                <h2 className="font-semibold text-base md:text-lg">
                  {post?.author?.name}
                </h2>
                {session?.email !== post.author.email && (
                  <Button
                    className="hidden md:block ml-2"
                    color="primary"
                    size="sm"
                    variant="flat"
                  >
                    Follow
                  </Button>
                )}
              </div>
              <p className="text-default-500 text-sm">
                {formatDistanceToNow(new Date(post?.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
            {session?.email === post.author.email ? (
              <Dropdown>
                <DropdownTrigger>
                  <button className="p-1">
                    <LuMoreHorizontal
                      className="text-default-500"
                      size={25} // Reduced icon size
                    />
                  </button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem
                    key="edit"
                    className="py-1 px-2"
                    onClick={openEditModal} // Call handleEditComment
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="py-1 px-2 text-danger"
                    color="danger"
                    onClick={() => setVisible(true)}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : null}
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className={
              showMore ? "text-default-700 " : "text-default-700 line-clamp-3"
            }
          />
          {!showMore && post?.content?.length > 200 && (
            <button
              className="inline text-primary-500 text-start mt-1"
              onClick={() => setShowMore(true)}
            >
              See more
            </button>
          )}
          {post?.imageUrls && post?.imageUrls?.length > 0 ? (
            <div
              className={`grid ${
                (post?.imageUrls?.length === 1 && "grid-cols-1") ||
                (post?.imageUrls?.length === 2 && "grid-cols-2") ||
                (post?.imageUrls?.length === 3 &&
                  "grid-cols-2 md:grid-cols-3") ||
                (post?.imageUrls &&
                  post?.imageUrls?.length > 4 &&
                  "grid-cols-2 md:grid-cols-4")
              } gap-2 my-4`}
            >
              {post?.imageUrls
                ?.slice(0, 3)
                .map((image, idx) => (
                  <Image
                    key={idx}
                    alt={`Image ${idx + 1}`}
                    className="h-64 w-full object-cover object-center rounded-lg"
                    height="150"
                    src={image}
                    width="150"
                  />
                ))}
              {post?.imageUrls && post?.imageUrls?.length > 4 && (
                <div className="relative">
                  <Image
                    alt="Image 4"
                    className="h-64 w-full object-cover object-center rounded-lg"
                    height="150"
                    src={post.imageUrls[3]}
                    width="150"
                    onClick={openModal}
                  />
                  <div
                    className="absolute inset-0 bg-black bg-opacity-50 cursor-pointer flex items-center justify-center rounded-lg"
                    onClick={openModal}
                  >
                    <span className="text-white text-lg font-semibold cursor-pointer">
                      +{post?.imageUrls?.length - 3}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </CardBody>
        <CardFooter className="block border-default-200 border-t">
          <div className="flex flex-wrap justify-between items-center mb-4">
            <span className="ml-4 text-default-500">
              {post?.voteCount?.upvotes || 0} upvote
            </span>
            <span className="ml-4 text-default-500">
              {post?.voteCount?.downvotes || 0} downvotes
            </span>
            <span className="ml-4 text-default-500">
              {post?.commentCount || 0} comments
            </span>
          </div>
          <div className="flex justify-between text-default-500">
            <button
              className="flex items-center transition-colors duration-300 transform hover:text-primary-500 space-x-1"
              onClick={handleupvote}
            >
              <FaThumbsUp />
              <span className="hidden sm:block">Upvote</span>
            </button>
            <button
              className="flex items-center transition-colors duration-300 transform hover:text-danger-500 space-x-1"
              onClick={handledownvote}
            >
              <FaThumbsDown />
              <span className="hidden sm:block">Downvote</span>
            </button>
            <button
              className="flex items-center transition-colors duration-300 transform  hover:text-secondary-500 space-x-1"
              onClick={openModal}
            >
              <FaComment />
              <span className="hidden sm:block">Comment</span>
            </button>
            <ShareModal id={post._id} />
          </div>
        </CardFooter>
      </Card>
      <PostDetailsModal
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        post={post}
      />
      <EditPostModal
        closeModal={closeEditModal}
        isModalOpen={isEditModalOpen}
        post={post}
      />
      <Alert
        confirmHandler={handleDeletePost}
        setVisible={setVisible}
        visible={visible}
      />
    </>
  );
}
