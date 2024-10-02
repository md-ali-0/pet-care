"use client";

import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter(); // Initialize the router

  return (
    <Button
      color="danger"
      variant="shadow"
      onPress={() => router.back()} // Use router.back() to navigate to the previous page
    >
      <span>Go back</span>
    </Button>
  );
}
