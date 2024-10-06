"use client";

import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Skeleton } from "@nextui-org/skeleton";
import { SerializedError } from "@reduxjs/toolkit";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LuMoreHorizontal, LuSend, LuSendHorizonal } from "react-icons/lu";
import { toast } from "sonner";

import { useSession } from "@/provider/session-provider";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetAllCommentsQuery,
  useUpdateCommentMutation,
} from "@/redux/features/comment/commentApi";
import { ErrorResponse, TComment, TPost } from "@/types";

interface PostDetailsModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  post: TPost;
}

export default function PostDetailsModal({
  isModalOpen,
  closeModal,
  post,
}: PostDetailsModalProps) {
  const { session, isLoading } = useSession();
  const [comment, setComment] = useState(""); // Comment content
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null); // Track if editing a comment

  const [createComment, { isSuccess, isError, error }] =
    useCreateCommentMutation();

  const [
    deleteComment,
    {
      isSuccess: isDeleteCommentSuccess,
      isError: isDeleteCommentError,
      error: deleteCommenterror,
    },
  ] = useDeleteCommentMutation();

  const [
    updateComment,
    {
      isSuccess: isUpdateCommentSuccess,
      isError: isUpdateCommentError,
      error: updateCommenterror,
    },
  ] = useUpdateCommentMutation();

  const { data, isLoading: isCommentLoading } = useGetAllCommentsQuery([
    {
      name: "post",
      value: post._id,
    },
  ]);

  useEffect(() => {
    if (isError) {
      const errorResponse = error as ErrorResponse | SerializedError;
      const errorMessage =
        (errorResponse as ErrorResponse)?.data?.message ||
        "Something Went Wrong";

      toast.error(errorMessage);
    } else if (isSuccess) {
      toast.success("Comment Posted Successfully");
    }
  }, [isError, isSuccess, error]);

  useEffect(() => {
    if (isDeleteCommentError) {
      const errorResponse = deleteCommenterror as
        | ErrorResponse
        | SerializedError;
      const errorMessage =
        (errorResponse as ErrorResponse)?.data?.message ||
        "Something Went Wrong";

      toast.error(errorMessage);
    } else if (isDeleteCommentSuccess) {
      toast.success("Comment Deleted Successfully");
    }
  }, [isDeleteCommentError, isDeleteCommentSuccess, deleteCommenterror]);

  useEffect(() => {
    if (isUpdateCommentError) {
      const errorResponse = updateCommenterror as
        | ErrorResponse
        | SerializedError;
      const errorMessage =
        (errorResponse as ErrorResponse)?.data?.message ||
        "Something Went Wrong";

      toast.error(errorMessage);
    } else if (isUpdateCommentSuccess) {
      toast.success("Comment Updated Successfully");
    }
  }, [isUpdateCommentError, isUpdateCommentSuccess, updateCommenterror]);

  const onSubmit = async () => {
    if (!comment) {
      toast.error("Write something to comment.");

      return;
    }

    if (editingCommentId) {
      // Update existing comment
      const data = {
        id: editingCommentId, // Pass the comment ID being edited
        data: { comment }, // Send the updated comment content
      };

      await updateComment(data); // Call update mutation
      setEditingCommentId(null); // Reset editing state
    } else {
      // Create new comment
      const data = {
        post: post._id,
        comment,
      };

      await createComment(data); // Call create mutation
    }

    setComment(""); // Clear the input field
  };

  const handleEditComment = (comment: TComment) => {
    setComment(comment.comment); // Prefill input with the comment to be edited
    setEditingCommentId(comment._id); // Set the comment's ID for update
  };

  const handleDeleteComment = async (comment: TComment) => {
    await deleteComment(comment._id);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
      scrollBehavior={"inside"}
      size="xl"
      onClose={closeModal}
      onOpenChange={closeModal}
    >
      <ModalContent>
        <ModalHeader>
          <div>
            <h3 className="block text-lg font-semibold mb-2">{post?.title}</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />

          <div className="flex text-default-500 flex-wrap gap-2 mb-4">
            {post?.imageUrls?.map((image, idx) => (
              <Image
                key={idx}
                alt={`Image ${idx + 1}`}
                className="w-full max-w-40 h-64 object-cover object-center rounded-lg"
                height="150"
                src={image}
                width="165"
              />
            ))}
          </div>
          {/* Comment Section */}
          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">
              Comments ({data?.data?.length})
            </h4>
            {isCommentLoading ? (
              <Skeleton>
                <div className="w-20" />
                <div className="w-32" />
              </Skeleton>
            ) : (
              data?.data?.map((comment: TComment, idx: number) => (
                <div key={idx} className="relative flex items-start my-2.5">
                  <Image
                    alt="Profile picture of a person"
                    className="size-8 rounded-full mr-2"
                    height="32"
                    src={comment.author.avatar as string}
                    width="32"
                  />
                  <div className="bg-default-100 flex-1 rounded-lg px-2.5 py-1.5">
                    <div className="flex justify-between items-center">
                      <h2 className="font-semibold text-gray-800">
                        {comment.author.name}
                      </h2>
                      <span className="text-gray-500 text-sm">
                        {formatDistanceToNow(new Date(comment.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-1">{comment.comment}</p>
                  </div>
                  {session?.email === comment.author.email ? (
                    <Dropdown>
                      <DropdownTrigger>
                        <button className="p-1">
                          <LuMoreHorizontal
                            className="cursor-pointer"
                            size={16} // Reduced icon size
                          />
                        </button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Static Actions">
                        <DropdownItem
                          key="edit"
                          className="py-1 px-2"
                          onClick={() => handleEditComment(comment)} // Call handleEditComment
                        >
                          Edit
                        </DropdownItem>
                        <DropdownItem
                          key="delete"
                          className="py-1 px-2 text-danger"
                          color="danger"
                          onClick={() => handleDeleteComment(comment)}
                        >
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  ) : null}
                </div>
              ))
            )}
          </div>
        </ModalBody>

        <ModalFooter className="block py-1.5">
          {session?.user ? (
            <div className="flex items-center mt-4 gap-2">
              <div>
                {isLoading ? (
                  <Skeleton className="size-10 rounded-full mr-4"> </Skeleton>
                ) : (
                  session?.user && (
                    <Image
                      alt={session?.name as string}
                      className="rounded-full size-10 mr-4"
                      height="50"
                      src={session?.avatar as string}
                      width="50"
                    />
                  )
                )}
              </div>
              <Input
                isClearable
                label="Write a comment.."
                type="text"
                value={comment}
                variant="flat"
                onChange={(e) => setComment(e.currentTarget.value)}
                onClear={() => {
                  setComment("");
                  setEditingCommentId(null);
                }}
              />
              <Button isIconOnly color="primary" size="lg" onClick={onSubmit}>
                {editingCommentId ? <LuSend /> : <LuSendHorizonal />}{" "}
                {/* Show 'Update' if editing */}
              </Button>
            </div>
          ) : (
            <div className="py-2.5 text-center">
              <h3 className="text-danger-500 font-semibold">
                Login or Sign up To Make Comment !
              </h3>
              <div className="flex justify-center items-center gap-2 mt-2">
                <Button
                  as={Link}
                  color="primary"
                  href="/auth/signin"
                  size="sm"
                  variant="flat"
                >
                  Sign In
                </Button>
                <span className="text-sm text-default-500">Or</span>
                <Button
                  as={Link}
                  className="ring-0 outline-none"
                  color="primary"
                  href="/auth/signup"
                  size="sm"
                  variant="shadow"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
