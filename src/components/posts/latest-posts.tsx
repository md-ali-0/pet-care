"use client";

import { SerializedError } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";

import PostCard from "./post-card";

import { useGetAllPostsQuery } from "@/redux/features/posts/postApi";
import { ErrorResponse } from "@/types";

export default function LatestPosts({
    search,
    category,
}: {
    search: string | undefined;
    category: string | undefined;
}) {
    const [page, setPage] = useState(1); // Page state
    const [limit] = useState(2); // Limit for how many posts to fetch per page
    const [posts, setPosts] = useState<any[]>([]);

    const { ref, inView } = useInView();

    const { data, isSuccess, isError, error, isFetching } = useGetAllPostsQuery(
        [
            {
                name: "sort",
                value: "-createdAt",
            },
            {
                name: "category",
                value: category,
            },
            {
                name: "searchTerm",
                value: search,
            },
            {
                name: "status",
                value: "publish",
            },
            {
                name: "page",
                value: page, // Add this
            },
            {
                name: "limit",
                value: limit, // Add this
            },
        ]
    );

    console.log(data);

    useEffect(() => {
        if (isSuccess && data?.data?.length! > 0) {
            setPosts((prevPosts) => [...prevPosts, ...data?.data!]); // Append new posts
        }
    }, [isSuccess, data]);

    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;
            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something went wrong";
            toast.error(errorMessage);
        }
    }, [isError, error]);

    // Trigger loading more data when inView becomes true
    useEffect(() => {
        if (inView && !isFetching && data?.data?.length! > 0) {
            setPage((prevPage) => prevPage + 1); // Increment the page to load more
        }
    }, [data?.data?.length, inView, isFetching]);

    return (
        <div className="space-y-5">
            {posts.map((post) => (
                <PostCard key={post._id} post={post} />
            ))}
            {/* Ref to track when user reaches the end */}
            <div ref={ref}>
                {isFetching && (
                    <div className="flex items-center justify-center space-x-2">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
                        <p className="text-primary-500 text-sm font-medium">
                            Loading...
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
