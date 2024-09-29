import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";

import ForgotPasswordForm from "@/components/auth/forgot-passoword-form";

export default function ForgotPasswordPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card
        className="flex w-full max-w-sm flex-col rounded-large md:p-3.5"
        shadow="sm"
      >
        <CardHeader className="flex flex-col items-center">
          <p className="text-xl font-medium">Forgot your password?</p>
          <p className="text-small text-center text-default-500 pt-2.5">
            Don’t worry! Enter your email and we’ll send you a link to reset
            your password.
          </p>
        </CardHeader>
        <CardBody>
          <ForgotPasswordForm />
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
