"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "sonner";
import { z } from "zod";

import { useSession } from "@/provider/session-provider";
import { signup } from "@/utils/actions/auth";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";

const SignupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    agreeToTerms: z.boolean().refine((val) => val === true, {
        message: "You must agree to the terms and conditions",
    }),
});

type FormValues = z.infer<typeof SignupSchema>;

export default function SignupForm() {
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();
    const { setIsLoading } = useSession();

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
            agreeToTerms: false,
        },
    });

    const toggleVisibility = () => setIsVisible(!isVisible);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setIsLoading(true);
        const response = await signup(data);

        if (response.success) {
            toast.success("User Sign Up Successfully");
            router.replace("/auth/signin");
        } else {
            toast.error(response?.errors);
        }
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

            <div className="flex items-center justify-between ">
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
            {errors.agreeToTerms && (
                <p className="mt-1 text-xs text-red-500">
                    {errors.agreeToTerms.message}
                </p>
            )}

            <Button className="w-full" color="primary" type="submit" variant="shadow">
                Sign Up
            </Button>
        </form>
    );
}
