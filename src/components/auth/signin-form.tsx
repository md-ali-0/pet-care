"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "sonner";

import { useSession } from "@/provider/session-provider";
import { signInSchema } from "@/schema/siginin.schema";
import { signin } from "@/utils/actions/auth";

interface FormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function SigninForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const { setIsLoading } = useSession();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const response = await signin(data);

    setIsLoading(true);

    if (response.success) {
      toast.success("User Sign In Successfully");
      if (redirect) {
        router.replace(redirect);
      } else {
        router.replace("/");
      }
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
        <Checkbox size="sm" {...register("rememberMe")}>
          Remember me
        </Checkbox>
        <Link color="primary" href="/auth/forgot-password" size="sm">
          Forgot password?
        </Link>
      </div>
      <Button color="primary" type="submit" variant="shadow">
        Sign In
      </Button>
    </form>
  );
}
