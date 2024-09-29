"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

export default function ForgotPasswordForm() {
  return (
    <form className="flex flex-col gap-3">
      <div className="flex flex-col gap-2.5">
        <Input
          isRequired
          className=""
          color="primary"
          label="Email"
          placeholder="Enter your email"
          radius="sm"
          type="email"
          variant="underlined"
        />
      </div>
      <Button color="primary" type="submit" variant="shadow">
        Send Reset Password Link
      </Button>
    </form>
  );
}
