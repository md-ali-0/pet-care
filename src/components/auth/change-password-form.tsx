import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

export default function ChangePasswordForm() {
  return (
    <form className="flex flex-col gap-3">
      <div className="flex flex-col gap-2.5">
        <Input
          isRequired
          className=""
          color="primary"
          label="New Password"
          placeholder="Enter your password"
          radius="sm"
          type="text"
          variant="underlined"
        />
      </div>
      <Button color="primary" type="submit" variant="shadow">
        Change Password
      </Button>
    </form>
  );
}
