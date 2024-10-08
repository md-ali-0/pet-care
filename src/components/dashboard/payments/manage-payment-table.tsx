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
import { useDeletePaymentMutation, useGetAllPaymentsQuery } from "@/redux/features/payment/paymentApi";
import { ErrorResponse, TMeta } from "@/types";
import { IPayment } from "@/types/TPayment";
import { SerializedError } from "@reduxjs/toolkit";
import Image from "next/image";
import { DataTable } from "../data-table";

const ManagePaymentsTable: FC = () => {
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [postToEdit, setPaymentToEdit] = useState<IPayment | null>(null);
    const [postToDelete, setPaymentToDelete] = useState<IPayment | null>(null);

    const [
        deletePayment,
        {
            isSuccess: isDeleteSuccess,
            isError: isDeleteError,
            error: deleteError,
        },
    ] = useDeletePaymentMutation();

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
            toast.success("Payment Deleted successfully");
        }
    }, [isDeleteError, isDeleteSuccess, deleteError]);

    const handleDelete = async () => {
        await deletePayment(postToDelete?._id);
        setDeleteDialogOpen(false);
    };

    const { data, isError, isLoading, isSuccess, error } = useGetAllPaymentsQuery([
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

    const handleEditClick = (payment: IPayment) => {
        setPaymentToEdit(payment);
        setEditDialogOpen(true);
    };

    const handleDeleteClick = (payment: IPayment) => {
        setPaymentToDelete(payment);
        setDeleteDialogOpen(true);
    };

    const columns: ColumnDef<IPayment>[] = [
        {
            accessorKey: "user",
            header: "User",
            cell: ({ row }) => {
                return (
                    <div>
                        <Image
                            src={row.original.user.avatar as string}
                            width={50}
                            height={50}
                            alt={row.original.user.name}
                            className="w-10 rounded-md object-cover"
                        />
                    </div>
                );
            },
        },
        {
            accessorKey: "currency",
            header: "Currency",
            cell: ({ row }) => {
                return (
                    <div>
                        <h3 className="text-wrap">{row.original.currency}</h3>
                    </div>
                );
            },
        },
        {
            accessorKey: "transectionId",
            header: "Transection Id",
        },
        {
            accessorKey: "payment_method",
            header: "Payment Method",
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

    console.log(data);
    
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
            {/* <EditPostStatusDialog
                post={postToEdit}
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
            /> */}
            <Alert
                visible={deleteDialogOpen}
                setVisible={setDeleteDialogOpen}
                confirmHandler={handleDelete}
            />
        </>
    );
};

export default ManagePaymentsTable;
