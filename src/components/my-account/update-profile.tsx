import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUpdateProfileMutation } from "@/redux/features/user/userApi";
import { profileUpdateSchema } from "@/schema/profile-update.schema";
import { ErrorResponse } from "@/types";
import { TUser } from "@/types/TUser";

export default function UpdateProfile({ user }: { user: TUser }) {
  const [updateProfile, { isSuccess, isError, error }] =
    useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUser>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
      bio: user?.bio,
    },
  });

  useEffect(() => {
    // Reset form values when user data is available
    if (user) {
      reset({
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        address: user?.address,
        bio: user?.bio,
      });
    }
  }, [user, reset]);

  useEffect(() => {
    if (isError) {
      const errorResponse = error as ErrorResponse | SerializedError;

      const errorMessage =
        (errorResponse as ErrorResponse)?.data?.message ||
        "Something Went Wrong";

      toast.error(errorMessage);
    } else if (isSuccess) {
      toast.success("Profile Successfully Updated");
    }
  }, [isError, isSuccess, error]);

  const onSubmit = async (data: TUser) => {
    const formData = new FormData();

    const userData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      bio: data.bio,
    };

    formData.append("data", JSON.stringify(userData));

    if (user) {
      await updateProfile(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          isRequired
          color="primary"
          errorMessage={errors?.name?.message}
          isInvalid={!!errors?.name?.message}
          label="Name"
          placeholder="Enter Your Name"
          radius="sm"
          type="text"
          variant="bordered"
          {...register("name")}
        />
        <Input
          isRequired
          color="primary"
          errorMessage={errors?.email?.message}
          isInvalid={!!errors?.email?.message}
          label="Email"
          placeholder="Enter Your Email"
          radius="sm"
          type="email"
          variant="bordered"
          {...register("email")}
        />
        <Input
          isRequired
          color="primary"
          errorMessage={errors?.phone?.message}
          isInvalid={!!errors?.phone?.message}
          label="Phone"
          placeholder="Enter Your Phone"
          radius="sm"
          type="text"
          variant="bordered"
          {...register("phone")}
        />
        <Input
          isRequired
          color="primary"
          errorMessage={errors?.address?.message}
          isInvalid={!!errors?.address?.message}
          label="Address"
          placeholder="Enter Your Address"
          radius="sm"
          type="text"
          variant="bordered"
          {...register("address")}
        />
        <Textarea
          isRequired
          color="primary"
          errorMessage={errors?.bio?.message}
          isInvalid={!!errors?.bio?.message}
          label="Bio"
          placeholder="Enter Your Bio"
          radius="sm"
          rows={3}
          type="text"
          variant="bordered"
          {...register("bio")}
        />
      </div>
      <div className="mt-2.5">
        <Button color="primary" size="lg" type="submit">
          Update Profile
        </Button>
      </div>
    </form>
  );
}
