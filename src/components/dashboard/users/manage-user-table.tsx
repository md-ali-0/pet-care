"use client";

import { Badge } from "@nextui-org/badge";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/dropdown";

import { useDeleteUserMutation, useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { ColumnDef } from "@tanstack/react-table";
import { LucideMoreVertical } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";

import Alert from "@/components/ui/alert";
import Loading from "@/components/ui/loading";
import { ErrorResponse, TMeta } from "@/types";
import { TUser } from "@/types/TUser";
import { SerializedError } from "@reduxjs/toolkit";
import { DataTable } from "../data-table";
import EditUserDialog from "./edit-user-modal";

const ManageUsersTable: FC = () => {
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToEdit, setuserToEdit] = useState<TUser | null>(null);
    const [usertoDelete, setusertoDelete] = useState<TUser | null>(null);
    
    const [deleteUser, { isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError }] =
        useDeleteUserMutation();

    useEffect(() => {
        if (isDeleteError) {
            const errorResponse = deleteError as ErrorResponse | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        } else if (isDeleteSuccess) {
            toast.success("User Deleted successfully");
        }
    }, [isDeleteError, isDeleteSuccess, deleteError]);

    const handleDelete = async () => {
        await deleteUser(usertoDelete?._id);
        setDeleteDialogOpen(false)
    };

    const { data, isError, isLoading, isSuccess, error } = useGetAllUsersQuery([
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

    const handleEditClick = (user: TUser) => {
        setuserToEdit(user);
        setEditDialogOpen(true);
    };

    const handleDeleteClick = (user: TUser) => {
        setusertoDelete(user);
        setDeleteDialogOpen(true);
    };

    const columns: ColumnDef<TUser>[] = [
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "phone",
            header: "Phone",
        },
        {
            accessorKey: "address",
            header: "Address",
        },
        {
            accessorKey: "role",
            header: "Role",
            cell: ({ row }) => {
                return (
                    <Badge className="capitalize" variant={"shadow"}>
                        {row.original.role}
                    </Badge>
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
                                Edit
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
            <EditUserDialog
                user={userToEdit}
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
            />
            <Alert visible={deleteDialogOpen} setVisible={setDeleteDialogOpen} confirmHandler={handleDelete}/>
        </>
    );
};

export default ManageUsersTable;
