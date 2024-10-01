"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { forgotPasswordSchema } from "@/schema/forgot-password.schema";
import { forgotPassword } from "@/utils/actions/auth";

interface FormValues {
  email: string;
}

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const sendintToast = toast.loading("Sending Password Reset Email.");

    const response = await forgotPassword(data);

    if (response.success) {
      toast.dismiss(sendintToast);
      toast.success("Password Reset link is send successfully");
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
          errorMessage={errors?.email?.message}
          isInvalid={true}
          label="Email"
          placeholder="Enter your email"
          radius="sm"
          type="email"
          variant="underlined"
          {...register("email", {
            required: "Email is required",
          })}
        />
      </div>
      <Button color="primary" type="submit" variant="shadow">
        Send Reset Password Link
      </Button>
    </form>
  );
}
