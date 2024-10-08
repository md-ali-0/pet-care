"use client";

import { useSession } from "@/provider/session-provider";
import { useCheckPremiumAvailableMutation } from "@/redux/features/premium/premiumApi";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { ErrorResponse } from "@/types";
import { Button } from "@nextui-org/button";
import { Card, CardHeader } from "@nextui-org/card";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import PremiumModal from "./premium-modal";

export default function Banner() {
    const [visible, setVisible] = useState(false);
    
    const [checkPremiumAvailable, { isSuccess, isError, error }] =
        useCheckPremiumAvailableMutation();
    const { session } = useSession();
    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        } else if (isSuccess) {
            setVisible(true);
        }
    }, [isError, isSuccess, error]);

    const { data: userData } = useGetMeQuery(undefined);

    const openModal = async () => {
        await checkPremiumAvailable(session?.user);
    };

    return (
        <>
            {session?.user && userData?.isPremium ? (
                <Card className="p-4">
                    <CardHeader>
                        <h3 className="text-lg font-semibold">
                            You are a Premium User
                        </h3>
                    </CardHeader>
                    <div className="flex justify-center items-center flex-col">
                        <p className="text-sm text-default-500 mb-2">
                            This is a premium post. Please make a payment to
                            view the content.
                        </p>
                        <Button
                            
                            className="bg-primary-500 text-white rounded-full"
                        >
                            Create Premium Content
                        </Button>
                    </div>
                </Card>
            ) : (
                <Card className="p-4">
                    <CardHeader>
                        <h3 className="text-lg font-semibold">
                            Be a Premium Member
                        </h3>
                    </CardHeader>
                    <div className="flex justify-center items-center flex-col">
                        <p className="text-sm text-default-500 mb-2">
                            This is a premium post. Please make a payment to
                            view the content.
                        </p>
                        <Button
                            onClick={openModal}
                            className="bg-yellow-500 text-white rounded-full"
                        >
                            Unlock Premium Content
                        </Button>
                    </div>
                </Card>
            )}

            <PremiumModal visible={visible} setVisible={setVisible} />
        </>
    );
}
