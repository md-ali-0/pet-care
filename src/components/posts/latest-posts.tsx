"use client";

import { SerializedError } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";

import { useGetAllPostsQuery } from "@/redux/features/posts/postApi";
import { ErrorResponse } from "@/types";
import PostCard from "./post-card";

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
    const [hasMore, setHasMore] = useState(true); // State to track if more posts are available

    const { ref, inView } = useInView();

    // API Query hook
    const { data, isSuccess, isError, error, isFetching } = useGetAllPostsQuery(
        [
            { name: "sort", value: "-createdAt" },
            { name: "category", value: category },
            { name: "searchTerm", value: search },
            { name: "status", value: "publish" },
            { name: "page", value: page },
            { name: "limit", value: limit },
        ]
    );

    // Handle success response and append data
    useEffect(() => {
        if (isSuccess && data?.data?.length! > 0) {
            setPosts((prevPosts) => [...prevPosts, ...data?.data!]); // Append new posts
        } else if (isSuccess && data?.data?.length === 0) {
            // If no data is returned, set hasMore to false
            setHasMore(false);
        }
    }, [isSuccess, data]);

    // Handle error response
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
        if (inView && !isFetching && hasMore) {
            setPage((prevPage) => prevPage + 1); // Increment the page to load more
        }
    }, [inView, isFetching, hasMore]);

    // Reset posts and page when search or category changes or is cleared
    useEffect(() => {
        setPage(1); // Reset to first page
        setPosts([]); // Clear the posts list
        setHasMore(true); // Reset hasMore state for fresh search or category change
    }, [search, category]);

    // Display message if no results are found
    if (isSuccess && data?.data?.length === 0) {
        return <p className="text-center py-5">No posts found</p>;
    }

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

                {/* Show message when no more posts are available */}
                {!hasMore && !isFetching && (
                    <p className="text-center text-sm text-gray-500">
                        No more posts to load.
                    </p>
                )}
            </div>
        </div>
    );
}
