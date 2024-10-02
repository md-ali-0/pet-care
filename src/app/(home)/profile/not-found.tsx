import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
// Import useRouter

import BackButton from "@/components/ui/back-button";

export default function NotFound() {
  return (
    <section className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center max-w-lg mx-auto text-center">
        <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
          Uh-oh! Something&apos;s missing...
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
          Profile Not Found
        </h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400">
          It looks like the profile you&apos;re searching for doesn&apos;t
          exist, or it may have been removed. Let&apos;s help you find your way
          back.
        </p>
        <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
          <BackButton />
          <Button as={Link} color="primary" href="/" variant="shadow">
            Take me home
          </Button>
        </div>
      </div>
    </section>
  );
}
