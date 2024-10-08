"use client";

import { Card } from "@nextui-org/card";

import User from "./user";

import {
  useGetAllUsersQuery,
  useGetMeQuery,
} from "@/redux/features/user/userApi";
import { TUser } from "@/types/TUser";

export default function NewUsers() {
  const { data: me } = useGetMeQuery(undefined);

  const { data } = useGetAllUsersQuery([
    {
      name: "sort",
      value: "-createdAt",
    },
    {
      name: "limit",
      value: 4,
    },
  ]);

  return (
    <Card className="p-4 sticky top-20" radius="sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">New Peoples</h2>
      </div>
      {data?.data?.map((user) => (
        <User key={user._id} me={me as TUser} user={user} />
      ))}
    </Card>
  );
}
