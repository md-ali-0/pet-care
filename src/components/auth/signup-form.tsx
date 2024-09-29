"use client";

import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function SignupForm() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <form className="flex flex-col gap-3">
      <div className="flex flex-col gap-2.5">
        <Input
          isRequired
          className=""
          color="primary"
          label="Name"
          placeholder="Enter your name"
          type="text"
          variant="underlined"
        />
        <Input
          isRequired
          className=""
          color="primary"
          label="Email"
          placeholder="Enter your email"
          type="email"
          variant="underlined"
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
          label="Password"
          placeholder="Enter your password"
          type={isVisible ? "text" : "password"}
          variant="underlined"
        />
      </div>
      <div className="flex items-center justify-between px-1 py-2">
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
      <Button color="primary" type="submit" variant="shadow">
        Log In
      </Button>
    </form>
  );
}
