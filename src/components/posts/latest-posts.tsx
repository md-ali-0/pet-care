"use client";

import { SerializedError } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { toast } from "sonner";

import PostCard from "./post-card";

import { useGetAllPostsQuery } from "@/redux/features/posts/postApi";
import { ErrorResponse } from "@/types";

export default function LatestPosts({ search }: { search: string }) {
  const { data, isSuccess, isError, error } = useGetAllPostsQuery([
    {
      name: "sort",
      value: "-createdAt",
    },
    {
      name: "searchTerm",
      value: search,
    },
  ]);

  useEffect(() => {
    if (isError) {
      const errorResponse = error as ErrorResponse | SerializedError;
      const errorMessage =
        (errorResponse as ErrorResponse)?.data?.message ||
        "Something Went Wrong";

      toast.error(errorMessage);
    }
  }, [isError, isSuccess, error]);

  return (
    <div className="space-y-5">
      {data?.data?.map((post) => <PostCard key={post._id} post={post} />)}
    </div>
  );
}
