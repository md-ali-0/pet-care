import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";

import SigninForm from "@/components/auth/signin-form";

export default function SigninPage() {
  return (
    <div className="flex h-full w-full items-center justify-center py-10">
      <Card
        className="flex w-full max-w-sm flex-col rounded-large md:p-3.5"
        shadow="sm"
      >
        <CardHeader className="flex flex-col items-center">
          <p className="text-xl font-medium">Welcome Back</p>
          <p className="text-small text-default-500">
            Log in to your account to continue
          </p>
        </CardHeader>
        <CardBody>
          <SigninForm />
        </CardBody>
        <CardFooter className="flex justify-center text-small">
          Need to create an account?&nbsp;
          <Link href="/auth/signup" size="sm">
            Sign Up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
