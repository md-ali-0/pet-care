import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { LuCake, LuMail, LuPhone, LuUser, LuUsers } from "react-icons/lu";

import { TUser } from "@/types/TUser";

export default function AboutSection({ profileData }: { profileData: TUser }) {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Profile Info</h2>
      </CardHeader>
      <CardBody>
        <div className="border border-gray-200 p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">About {profileData.name}</h3>
            <i className="fas fa-ellipsis-h text-gray-500" />
          </div>
          <p className="text-gray-600">{profileData.bio}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="border border-gray-200 p-4 rounded-lg flex justify-between items-center">
            <div>
              <LuCake className="inline ext-gray-500 mr-2" size={18} />
              <span className="text-gray-600 mr-2">Born:</span>
              <span className="font-semibold">
                {profileData?.birthdate
                  ? new Date(profileData?.birthdate).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg flex justify-between items-center">
            <div>
              <LuPhone className="inline ext-gray-500 mr-2" size={18} />
              <span className="text-gray-600 mr-2">Phone:</span>
              <span className="font-semibold">
                {profileData?.phone || "N/A"}
              </span>
            </div>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg flex justify-between items-center">
            <div>
              <LuPhone className="inline ext-gray-500 mr-2" size={18} />
              <span className="text-gray-600 mr-2">Address:</span>
              <span className="font-semibold">
                {profileData?.address || "N/A"}
              </span>
            </div>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg flex justify-between items-center">
            <div>
              <LuUser className="inline ext-gray-500 mr-2" size={18} />
              <span className="text-gray-600 mr-2">Followers:</span>
              <span className="font-semibold">
                {profileData?.followers.length || 0}
              </span>
            </div>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg flex justify-between items-center">
            <div>
              <LuUsers className="inline ext-gray-500 mr-2" size={18} />
              <span className="text-gray-600 mr-2">Following:</span>
              <span className="font-semibold">
                {profileData?.following.length || 0}
              </span>
            </div>
          </div>

          <div className="border border-gray-200 p-4 rounded-lg flex justify-between items-center">
            <div>
              <LuMail className="inline ext-gray-500 mr-2" size={18} />
              <span className="text-gray-600 mr-2">Email:</span>
              <span className="font-semibold">{profileData.email}</span>
            </div>
            <i className="fas fa-ellipsis-h text-gray-500" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
