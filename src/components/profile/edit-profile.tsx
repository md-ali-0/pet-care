import { Card } from "@nextui-org/card";

import UpdatePassword from "../user/update-password";
import UpdateProfile from "../user/update-profile";

import { TUser } from "@/types/TUser";

export default function EditProfile({ user }: { user: TUser }) {
  return (
    <div className="space-y-5">
      <Card className="p-4">
        <UpdateProfile user={user} />
      </Card>
      <Card className="p-4">
        <UpdatePassword />
      </Card>
    </div>
  );
}
