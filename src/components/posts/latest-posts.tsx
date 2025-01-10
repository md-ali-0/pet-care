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
}: {
    search: string | undefined;
}) {
    const [page, setPage] = useState(1);
    const [limit] = useState(2);
    const [posts, setPosts] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [forceReset, setForceReset] = useState(false);

    const { ref, inView } = useInView();

    const searchTerm = search ? search : "";

    const { data, isSuccess, isError, error, isFetching } = useGetAllPostsQuery(
        [
            { name: "sort", value: "-createdAt" },
            { name: "searchTerm", value: searchTerm },
            { name: "status", value: "publish" },
            { name: "page", value: page },
            { name: "limit", value: limit },
        ]
    );

    useEffect(() => {
        setPage(1);
        setPosts([]);
        setHasMore(true);
    }, [search]);

    useEffect(() => {
        if (isSuccess && page === 1) {
            setPosts(data?.data!);
        } else if (isSuccess && data?.data?.length! > 0) {
            setPosts((prevPosts) => [...prevPosts, ...data?.data!]);
            setHasMore(data?.data?.length === limit);
        } else if (isSuccess && data?.data?.length === 0 && page > 1) {
            setHasMore(false);
        }
    }, [isSuccess, data, page, limit]);

    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;
            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something went wrong";
            toast.error(errorMessage);
        }
    }, [isError, error]);

    useEffect(() => {
        if (inView && !isFetching && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [inView, isFetching, hasMore]);

    useEffect(() => {
        if (forceReset) {
            setForceReset(false);
        }
    }, [forceReset]);

    if (isSuccess && page === 1 && posts.length === 0) {
        return <p className="text-center py-5">No posts found</p>;
    }

    return (
        <div className="space-y-5">
            {posts.map((post) => (
                <PostCard key={post._id} post={post} />
            ))}

            <div ref={ref}>
                {isFetching && (
                    <div className="flex items-center justify-center space-x-2">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
                        <p className="text-primary-500 text-sm font-medium">
                            Loading...
                        </p>
                    </div>
                )}

                {!hasMore && !isFetching && (
                    <p className="text-nter text-sm text-gray-500ce">
                        No more posts to load.
                    </p>
                )}
            </div>
        </div>
    );
}
