import { useUpdateUserMutation } from "@/redux/features/user/userApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ErrorResponse } from "@/types";
import { TUser } from "@/types/TUser";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { SerializedError } from "@reduxjs/toolkit";

interface EditUserDialogProps {
    user: TUser | null;
    open: boolean;
    onClose: () => void;
}

const EditUserDialog = ({ user, open, onClose }: EditUserDialogProps) => {
    const form = useForm<TUser>({
        defaultValues: user || {
            name: "",
            email: "",
            password: "",
            phone: "",
            address: "",
            role: "user",
        },
    });

    const [updateUser, { isSuccess, isError, error }] = useUpdateUserMutation();
    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        } else if (isSuccess) {
            toast.success("User Successfully Updated");
        }
    }, [isError, isSuccess, error]);

    useEffect(() => {
        form.reset(
            user || {
                name: "",
                email: "",
                password: "",
                phone: "",
                address: "",
                role: "user",
            }
        );
    }, [user, form, form.reset]);

    const onSubmit = async (data: TUser) => {
        const loadingToast = toast.loading("User is Updating...");
        if (user) {
            await updateUser({ data: data, id: user._id });
        }
        onClose();
        toast.dismiss(loadingToast);
    };

    return (
        <Modal isOpen={open} onClose={onClose} scrollBehavior="inside">
            <ModalContent>
                <ModalHeader>
                    <h2 className="text-xl font-semibold mb-4">Edit User</h2>
                </ModalHeader>
                <ModalBody>

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid grid-cols-2 gap-4"
                >
                    <div className="col-span-2">
                        <label htmlFor="name" className="block mb-1">
                            User Name
                        </label>
                        <input
                            id="name"
                            placeholder="Enter User Name"
                            {...form.register("name")}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="email" className="block mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter User Email"
                            {...form.register("email")}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="role" className="block mb-1">
                            User Role
                        </label>
                        <select
                            id="role"
                            {...form.register("role")}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="phone" className="block mb-1">
                            Phone
                        </label>
                        <input
                            id="phone"
                            type="text"
                            placeholder="Enter User Phone"
                            {...form.register("phone")}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="address" className="block mb-1">
                            Address
                        </label>
                        <input
                            id="address"
                            type="text"
                            placeholder="Enter User Address"
                            {...form.register("address")}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="flex justify-end gap-4 col-span-2 mt-4">
                        <Button
                            variant="faded"
                            color="danger"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            color={"primary"}
                            variant="shadow"
                            type="submit"
                        >
                            Save
                        </Button>
                    </div>
                </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default EditUserDialog;
