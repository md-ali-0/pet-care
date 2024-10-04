/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import {
  FaComment,
  FaEllipsisH,
  FaShare,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";

import PostDetailsModal from "./post-details-modal";

import { TPost } from "@/types";

export default function PostCard({ post }: { post: TPost }) {
  const [showMore, setShowMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
            <div>
              <div className="flex items-center">
                <h2 className="font-semibold text-base md:text-lg">
                  {post?.author?.name}
                </h2>
                <Button
                  className="hidden md:block ml-2"
                  color="primary"
                  size="sm"
                  variant="flat"
                >
                  Follow
                </Button>
              </div>
              <p className="text-default-500 text-sm">
                {formatDistanceToNow(new Date(post?.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <FaEllipsisH className="text-default-500 ml-auto" size={20} />
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className={
              showMore ? "text-default-700 " : "text-default-700 line-clamp-3"
            }
          />
          {!showMore && post?.content?.length > 200 && (
            <button
              className="inline text-primary-500 text-sm mt-2"
              onClick={() => setShowMore(true)}
            >
              See more
            </button>
          )}
          <div
            className={`grid ${
              (post?.imageUrls?.length === 1 && "grid-cols-1") ||
              (post?.imageUrls?.length === 2 && "grid-cols-2") ||
              (post?.imageUrls?.length === 3 && "grid-cols-2 md:grid-cols-3") ||
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
                  onClick={openModal} // Open modal on click
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
            <button className="flex items-center transition-colors duration-300 transform hover:text-primary-500 space-x-1">
              <FaThumbsUp />
              <span className="hidden sm:block">Upvote</span>
            </button>
            <button className="flex items-center transition-colors duration-300 transform hover:text-danger-500 space-x-1">
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
            <button className="flex items-center transition-colors duration-300 transform hover:text-success-500 space-x-1">
              <FaShare />
              <span className="hidden sm:block">Share</span>
            </button>
          </div>
        </CardFooter>
      </Card>
      <PostDetailsModal
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        post={post}
      />
    </>
  );
}
