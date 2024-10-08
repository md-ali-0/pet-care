import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useChangePostStatusMutation } from "@/redux/features/posts/postApi";
import { ErrorResponse } from "@/types";
import { TPost } from "@/types/TPost";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { SerializedError } from "@reduxjs/toolkit";

interface EditPostStatusDialogProps {
    post: TPost | null;
    open: boolean;
    onClose: () => void;
}

const EditPostStatusDialog = ({ post, open, onClose }: EditPostStatusDialogProps) => {
    const form = useForm<TPost>({
        defaultValues: post || {
            status: ""
        },
    });

    const [updatePost, { isSuccess, isError, error }] = useChangePostStatusMutation();
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
            post || {
                status: "",
            }
        );
    }, [post, form, form.reset]);

    const onSubmit = async (data: TPost) => {

        const loadingToast = toast.loading("Post is Updating...");
        if (post) {
            await updatePost({ data, id: post._id });
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
                        <label htmlFor="status" className="block mb-1">
                            Post Status
                        </label>
                        <select
                            id="status"
                            {...form.register("status")}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select Status</option>
                            <option value="publish">Publish</option>
                            <option value="unpublish">Unpublish</option>
                        </select>
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

export default EditPostStatusDialog;
