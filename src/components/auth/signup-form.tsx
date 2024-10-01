"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "sonner";

import { useSession } from "@/provider/session-provider";
import { SignupSchema } from "@/schema/siginup.schema";
import { signup } from "@/utils/actions/auth";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

export default function SignupForm() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const toggleVisibility = () => setIsVisible(!isVisible);
  const { setIsLoading } = useSession();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const response = await signup(data);

    setIsLoading(true);

    if (response.success) {
      toast.success("User Sign Up Successfully");
      router.replace("/auth/signin");
    } else {
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
          errorMessage={errors?.name?.message}
          isInvalid={true}
          label="Name"
          placeholder="Enter your name"
          type="text"
          variant="underlined"
          {...register("name")}
        />
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
          {...register("email")}
        />

        <Input
          isRequired
          className=""
          color="primary"
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <AiOutlineEyeInvisible className="text-xl text-default-400 pointer-events-none" />
              ) : (
                <AiOutlineEye className="text-xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          errorMessage={errors?.password?.message}
          isInvalid={true}
          label="Password"
          placeholder="Enter your password"
          type={isVisible ? "text" : "password"}
          variant="underlined"
          {...register("password")}
        />
      </div>
      <div className="flex items-center justify-between px-1 py-2">
        <Checkbox size="sm">
          I agree with the&nbsp;
          <Link href="#" size="sm">
            Terms
          </Link>
          &nbsp; and&nbsp;
          <Link href="#" size="sm">
            Privacy Policy
          </Link>
        </Checkbox>
      </div>
      <Button color="primary" type="submit" variant="shadow">
        Sign Up
      </Button>
    </form>
  );
}
