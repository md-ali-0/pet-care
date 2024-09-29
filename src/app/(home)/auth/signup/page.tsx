import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";

import SignupForm from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card
        className="flex w-full max-w-sm flex-col rounded-large md:p-3.5"
        shadow="sm"
      >
        <CardHeader className="flex flex-col items-center">
          <p className="text-xl font-medium">Welcome Back</p>
          <p className="text-small text-default-500">
            Create an account to get started
          </p>
        </CardHeader>
        <CardBody>
          <SignupForm />
        </CardBody>
        <CardFooter className="flex justify-center text-small">
          Already have an account? &nbsp;
          <Link href="/auth/signin" size="sm">
            Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
