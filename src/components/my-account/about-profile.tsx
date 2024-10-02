import { TUser } from "@/types/TUser";

export default function AboutProfile({ user }: { user: TUser }) {
  return (
    <div className="text-left space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-700">Email:</h3>
        <p className="text-gray-600">{user?.email || "Not Provided"}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700">Phone:</h3>
        <p className="text-gray-600">{user?.phone || "Not Provided"}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700">Address:</h3>
        <p className="text-gray-600">{user?.address || "Not Provided"}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700">Bio:</h3>
        <p className="text-gray-600">{user?.bio || "No bio available"}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700">Joined:</h3>
        <p className="text-gray-600">
          {user?.createdAt
            ? new Date(user.createdAt).toLocaleDateString()
            : "N/A"}
        </p>
      </div>
    </div>
  );
}
