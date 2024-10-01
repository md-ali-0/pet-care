"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { resetPasswordSchema } from "@/schema/reset-password.schema";
import { resetPassword } from "@/utils/actions/auth";

interface FormValues {
  newPassword: string;
}

interface ChangePasswordFormProps {
  id: string | null;
  token: string | null;
}

export default function ChangePasswordForm({
  id,
  token,
}: ChangePasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!id || !token) {
      toast.error("Invalid request. Missing id or token.");

      return;
    }

    const sendintToast = toast.loading("Changing Password..");

    const response = await resetPassword({
      id,
      newPassword: data.newPassword,
      token,
    });

    if (response.success) {
      toast.dismiss(sendintToast);
      toast.success("Password Changed successfully");
    } else {
      toast.dismiss(sendintToast);
      toast.error(response?.errors);
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2.5">
        <Input
          isRequired
          className=""
          color="primary"
          errorMessage={errors?.newPassword?.message}
          isInvalid={true}
          label="New Password"
          placeholder="Enter your new Password"
          radius="sm"
          type="password"
          variant="underlined"
          {...register("newPassword", {
            required: "Password is required",
          })}
        />
      </div>
      <Button color="primary" type="submit" variant="shadow">
        Change Password
      </Button>
    </form>
  );
}
