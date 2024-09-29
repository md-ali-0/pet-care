import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";

import ChangePasswordForm from "@/components/auth/change-password-form";

export default function ChangePasswordPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card
        className="flex w-full max-w-sm flex-col rounded-large md:p-3.5"
        shadow="sm"
      >
        <CardHeader className="flex flex-col items-center">
          <p className="text-xl font-medium">Change Your Password </p>
          <p className="text-small text-center text-default-500 pt-2.5">
            Enter your new password below to reset it. .
          </p>
        </CardHeader>
        <CardBody>
          <ChangePasswordForm />
        </CardBody>
        <CardFooter className="flex justify-center text-small">
          Remembered your password?&nbsp;
          <Link href="/auth/signin" size="sm">
            Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
