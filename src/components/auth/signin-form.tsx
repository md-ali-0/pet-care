"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "sonner";
import { z } from "zod";

// Assuming these imports exist in your project structure
import { useSession } from "@/provider/session-provider";
import { signin } from "@/utils/actions/auth";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";

const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof signInSchema>;

export default function LoginPage() {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const { setIsLoading } = useSession();

    const {
        register,
        setValue,
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

    const toggleVisibility = () => setIsVisible(!isVisible);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setIsLoading(true);
        const response = await signin(data);

        console.log(response);
        if (response.success) {
            localStorage.setItem("accessToken", response?.data?.accessToken);
            toast.success("User Sign In Successfully");
            router.push("/");
        } else {
            toast.error(response?.errors);
        }
        setIsLoading(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

                <div className="flex items-center justify-between">
                    <Checkbox size="sm" {...register("rememberMe")}>
                        Remember me
                    </Checkbox>
                    <div className="text-sm">
                        <Link
                            color="primary"
                            href="/auth/forgot-password"
                            size="sm"
                        >
                            Forgot password?
                        </Link>
                    </div>
                </div>

                <Button
                    color="primary"
                    type="submit"
                    className="w-full"
                    variant="shadow"
                >
                    Sign In
                </Button>
            </form>

            <div className="text-center">
                <p className="text-sm text-gray-600">
                    Need to create an account?{" "}
                    <Link
                        href="/auth/signup"
                        className="font-medium text-blue-600 hover:text-blue-500"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>

            {/* Demo Credentials */}
            <div className="mt-2 space-y-3">
                <p className="text-sm text-gray-500 text-center">
                    Demo Credentials
                </p>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between p-2 border rounded">
                        <div>
                            <p className="text-sm font-medium">Admin</p>
                            <p className="text-xs text-gray-500">
                                admin@gmail.com / 123456
                            </p>
                        </div>
                        <Button
                            size="sm"
                            variant="light"
                            onClick={() => {
                                setValue("email", "admin@gmail.com");
                                setValue("password", "123456");
                            }}
                        >
                            Copy
                        </Button>
                    </div>

                    <div className="flex items-center justify-between p-2 border rounded">
                        <div>
                            <p className="text-sm font-medium">User</p>
                            <p className="text-xs text-gray-500">
                                pet@gmail.com / 159357
                            </p>
                        </div>
                        <Button
                            size="sm"
                            variant="light"
                            onClick={() => {
                                setValue("email", "pet@gmail.com");
                                setValue("password", "159357");
                            }}
                        >
                            Copy
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
