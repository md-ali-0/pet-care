"use client";

import Loading from "@/components/ui/loading";
import { updateSession } from "@/libs/session";
import { useSession } from "@/provider/session-provider";
import { useCreatePaymentMutation, useCretePaymentIntentMutation } from "@/redux/features/payment/paymentApi";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { ErrorResponse } from "@/types";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/modal";
import { SerializedError } from "@reduxjs/toolkit";
import {
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
    Elements,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { FC, FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

const stripePromise = loadStripe("pk_test_b2Bf9NGOdya0RmEsDsEuZaUF00t1Wd6U5P");

const PaymentForm: FC = () => {
    const { setIsLoading } = useSession()
    const stripe = useStripe();
    const elements = useElements();
    const [
        cratePaymentIntent,
        {
            isError: isPaymentIntentCreateError,
            error: paymentIntentCreateError,
        },
    ] = useCretePaymentIntentMutation();
    const [createPayment, { isSuccess, isError, error }] =
    useCreatePaymentMutation();

    const { data: userData, isLoading } = useGetMeQuery(undefined);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
    const [name, setName] = useState(userData?.name || "");

    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        }
    }, [isError, isSuccess, error]);

    useEffect(() => {
        if (isPaymentIntentCreateError) {
            const errorResponse = paymentIntentCreateError as
                | ErrorResponse
                | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        }
    }, [isPaymentIntentCreateError, isSuccess, paymentIntentCreateError]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        try {
            const paymentData = {
                amount: 1000,
                currency: "bdt",
            };

            const { data: secretData } = await cratePaymentIntent(paymentData);

            const card = elements.getElement(CardNumberElement);

            if (!card) {
                return;
            }
            const paymentResult = await stripe.confirmCardPayment(
                secretData?.data,
                {
                    payment_method: {
                        card: card!,
                        billing_details: {
                            name: name,
                            email: userData?.email,
                            phone: userData?.phone,
                            address: {
                                line1: userData?.address,
                            },
                        },
                    },
                }
            );

            if (paymentResult.error) {
                toast.error(paymentResult.error.message);
            } else {
                if (paymentResult.paymentIntent?.status === "succeeded") {
                    
                    const data = {
                        user: userData?._id,
                        transectionId: paymentResult.paymentIntent.id,
                        currency: paymentResult.paymentIntent.currency,
                        payment_method:
                            paymentResult.paymentIntent.payment_method_types[0],
                    };
                    await createPayment(data);
                    setIsLoading(true)
                    await updateSession()
                    setIsPaymentSuccessful(true);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("Payment failed!");
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
            <Card>
                <form
                    onSubmit={handleSubmit}
                    className="w-full p-4sm:p-6 lg:max-w-xl lg:p-8"
                >
                    <div className="mb-6 grid grid-cols-2 gap-4">
                        <div className="col-span-2 sm:col-span-1">
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-default-500"
                            >
                                Full name (as displayed on card)*
                            </label>
                            <Input
                                isClearable
                                onClear={() => setName("")}
                                variant="bordered"
                                color="primary"
                                radius="sm"
                                placeholder="Enter Full Name"
                                value={name}
                                onValueChange={setName}
                            />
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <label
                                htmlFor="card-number-input"
                                className="mb-2 block text-sm font-medium text-default-500"
                            >
                                Card number*
                            </label>
                            <CardNumberElement className="h-10 w-full px-3 py-2 mb-1 border-2 border-default-200 rounded-md" />
                        </div>

                        <div>
                            <label
                                htmlFor="card-expiration-input"
                                className="mb-2 block text-sm font-medium text-default-500"
                            >
                                Card expiration*
                            </label>
                            <CardExpiryElement className="h-10 w-full px-3 py-2 mb-1 border-2 border-default-200 rounded-md" />
                        </div>

                        <div>
                            <label
                                htmlFor="cvv-input"
                                className="mb-2 flex items-center gap-1 text-sm font-medium text-default-500"
                            >
                                CVV*
                            </label>
                            <CardCvcElement className="h-10 w-full px-3 py-2 mb-1 border-2 border-default-200 rounded-md" />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        color="primary"
                        disabled={!stripe || !elements}
                        variant="shadow"
                    >
                        Pay now
                    </Button>
                </form>
            </Card>

            <div className="mt-6 grow sm:mt-8 lg:mt-0">
                <Card className="p-6">
                    <div className="space-y-2">
                        <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                Price
                            </dt>
                            <dd className="text-base font-medium text-default-500">
                                ৳ 1000
                            </dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                Tax Fee.
                            </dt>
                            <dd className="text-base font-medium text-green-500">
                                -৳ 00.00
                            </dd>
                        </dl>
                    </div>
                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                        <dt className="text-base font-bold text-default-500">
                            Total Price
                        </dt>
                        <dd className="text-base font-bold text-default-500">
                            ৳ 1000
                        </dd>
                    </dl>
                </Card>

                <div className="mt-6 flex items-center justify-center gap-8">
                    <Image
                        className="h-8 w-auto dark:hidden"
                        height={32}
                        width={32}
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
                        alt="Visa"
                    />
                    <Image
                        className="hidden h-8 w-auto dark:flex"
                        height={32}
                        width={32}
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
                        alt="Visa"
                    />
                    <Image
                        className="h-8 w-auto dark:hidden"
                        height={32}
                        width={32}
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
                        alt="MasterCard"
                    />
                    <Image
                        className="hidden h-8 w-auto dark:flex"
                        height={32}
                        width={32}
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
                        alt="MasterCard"
                    />
                </div>
            </div>

            {/* Next UI Modal for Payment Success */}
            <Modal
                closeButton
                isOpen={isPaymentSuccessful}
                onClose={() => setIsPaymentSuccessful(false)}
            >
                <ModalContent>
                    <ModalHeader>
                        <h3 className="text-lg text-center">
                            Payment Successful!
                        </h3>
                    </ModalHeader>
                    <ModalBody>
                        <h3>You will be redirected to your rentals page.</h3>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            variant="flat"
                            color="primary"
                            as={Link}
                            href="/"
                        >
                            OK
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

const PaymentPage: FC = () => {
    return (
        <Elements stripe={stripePromise}>
            <section className="py-8 antialiased md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mx-auto max-w-5xl">
                        <h2 className="text-xl font-semibold text-default-500 sm:text-2xl">
                            Payment
                        </h2>
                        <PaymentForm />
                    </div>
                </div>
            </section>
        </Elements>
    );
};

export default PaymentPage;
