import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { SerializedError } from "@reduxjs/toolkit";
import { FormEvent, useEffect } from "react";
import { toast } from "sonner";

import { useUpdateProfileMutation } from "@/redux/features/user/userApi";
import { ErrorResponse } from "@/types";

export default function UpdatePassword() {
  const [updateProfile, { isSuccess, isError, error }] =
    useUpdateProfileMutation();

  useEffect(() => {
    if (isError) {
      const errorResponse = error as ErrorResponse | SerializedError;

      const errorMessage =
        (errorResponse as ErrorResponse)?.data?.message ||
        "Something Went Wrong";

      toast.error(errorMessage);
    } else if (isSuccess) {
      toast.success("Password Successfully Updated");
    }
  }, [isError, isSuccess, error]);

  const handlePasswordChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const password = e.currentTarget.password.value;
    const confirmPassword = e.currentTarget.confirmPassword.value;

    if (password !== confirmPassword) {
      toast.error("Password Not matched");
    }
    const formData = new FormData();

    formData.append("data", JSON.stringify({ password }));
    await updateProfile(formData);
  };

  return (
    <form onSubmit={handlePasswordChange}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          autoComplete=""
          color="primary"
          label="Password"
          name="password"
          placeholder="Enter Your Password"
          radius="sm"
          type="password"
          variant="bordered"
        />
        <Input
          autoComplete=""
          color="primary"
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Enter Your Password"
          radius="sm"
          type="password"
          variant="bordered"
        />
      </div>
      <div className="mt-2.5">
        <Button color="primary" size="lg" type="submit">
          Change Password
        </Button>
      </div>
    </form>
  );
}
