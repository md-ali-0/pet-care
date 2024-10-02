import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import BackButton from "@/components/ui/back-button";

export default function NotFound() {
  return (
    <section className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center max-w-lg mx-auto text-center">
        <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
          Oops! Page not found
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
          We can&apos;t seem to find the page you&apos;re looking for.
        </h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400">
          The page you are trying to access does not exist or might have been
          moved. Let&apos;s help you get back on track!
        </p>
        <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
          <BackButton />
          <Button as={Link} color="primary" href="/" variant="shadow">
            Take Me Home
          </Button>
        </div>
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          Still can&apos;t find what you&apos;re looking for?{" "}
          <Link href="/contact">Contact support</Link> for help.
        </p>
      </div>
    </section>
  );
}
