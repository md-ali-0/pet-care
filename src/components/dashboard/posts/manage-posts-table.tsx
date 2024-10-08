"use client";

import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/dropdown";

import { ColumnDef } from "@tanstack/react-table";
import { LucideMoreVertical } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";

import Alert from "@/components/ui/alert";
import Loading from "@/components/ui/loading";
import { useDeletePostMutation, useGetAllPostsQuery } from "@/redux/features/posts/postApi";
import { ErrorResponse, TMeta, TPost } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import Image from "next/image";
import { DataTable } from "../data-table";
import EditPostStatusDialog from "./edit-post-modal";

const ManagePostsTable: FC = () => {
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [postToEdit, setPostToEdit] = useState<TPost | null>(null);
    const [postToDelete, setpostToDelete] = useState<TPost | null>(null);

    const [
        deletePost,
        {
            isSuccess: isDeleteSuccess,
            isError: isDeleteError,
            error: deleteError,
        },
    ] = useDeletePostMutation();

    useEffect(() => {
        if (isDeleteError) {
            const errorResponse = deleteError as
                | ErrorResponse
                | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        } else if (isDeleteSuccess) {
            toast.success("User Deleted successfully");
        }
    }, [isDeleteError, isDeleteSuccess, deleteError]);

    const handleDelete = async () => {
        await deletePost(postToDelete?._id);
        setDeleteDialogOpen(false);
    };

    const { data, isError, isLoading, isSuccess, error } = useGetAllPostsQuery([
        {
            name: "limit",
            value: limit,
        },
        {
            name: "page",
            value: page,
        },
        {
            name: "searchTerm",
            value: search,
        },
    ]);

    useEffect(() => {
        if (isError) {
            toast.error("Something Went Wrong");
        }
    }, [isError, isSuccess, error]);

    const handleEditClick = (user: TPost) => {
        setPostToEdit(user);
        setEditDialogOpen(true);
    };

    const handleDeleteClick = (user: TPost) => {
        setpostToDelete(user);
        setDeleteDialogOpen(true);
    };

    const columns: ColumnDef<TPost>[] = [
        {
            accessorKey: "author",
            header: "Author",
            cell: ({ row }) => {
                return (
                    <div>
                        <Image
                            src={row.original.author.avatar as string}
                            width={50}
                            height={50}
                            alt={row.original.author.name}
                            className="w-10 rounded-md object-cover"
                        />
                    </div>
                );
            },
        },
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => {
                return (
                    <div>
                        <h3 className="text-wrap">{row.original.title}</h3>
                    </div>
                );
            },
        },
        {
            accessorKey: "category",
            header: "Category",
        },
        {
            accessorKey: "voteCount.upvotes",
            header: "UpVote",
        },
        {
            accessorKey: "voteCount.downvotes",
            header: "DownVotes",
        },
        {
            accessorKey: "isPremium",
            header: "Is Premium",
            cell: ({ row }) => {
                return (
                    <span className="capitalize">
                        {row.original.isPremium ? 'Active' : "Inactive"}
                    </span>
                );
            },
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                return (
                    <span className="capitalize">
                        {row.original.status}
                    </span>
                );
            },
        },
        {
            accessorKey: "action",
            header: "Action",
            cell: ({ row }) => {
                return (
                    <Dropdown>
                        <DropdownTrigger>
                            <button>
                                <LucideMoreVertical size={20} />
                            </button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem
                                key="edit"
                                onClick={() => handleEditClick(row.original)}
                            >
                                Update Status
                            </DropdownItem>
                            <DropdownItem
                                key="delete"
                                onClick={() => handleDeleteClick(row.original)}
                                className="text-danger"
                                color="danger"
                            >
                                Delete
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                );
            },
        },
    ];

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <DataTable
                columns={columns}
                data={data?.data || []}
                onSearchValueChange={setSearch}
                onPageChange={setPage}
                onPageSizeChange={setLimit}
                meta={data?.meta as TMeta}
            />
            <EditPostStatusDialog
                post={postToEdit}
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
            />
            <Alert
                visible={deleteDialogOpen}
                setVisible={setDeleteDialogOpen}
                confirmHandler={handleDelete}
            />
        </>
    );
};

export default ManagePostsTable;
