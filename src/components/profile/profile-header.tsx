import { Button } from "@nextui-org/button";

import { TUser } from "@/types/TUser";

export default function ProfileHeader({ profileData }: { profileData: TUser }) {
  return (
    <section className="relative pt-44 sm:pt-60 pb-24">
      <img
        alt="cover-image"
        className="w-full absolute rounded-xl top-0 left-0 z-0 h-60 sm:h-80 object-cover"
        src={profileData.cover}
      />
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-center sm:justify-start relative z-10 mb-5">
          <img
            alt="user-avatar-image"
            className="border-4 border-solid border-white rounded-full object-cover w-32 sm:w-44"
            src={profileData.avatar}
          />
        </div>
        <div className="flex items-center justify-center flex-col sm:flex-row max-sm:gap-5 sm:justify-between mb-5">
          <div className="block">
            <h3 className="font-manrope font-bold text-4xl text-default-900 mb-1 max-sm:text-center">
              {profileData.name}
            </h3>
            <p className="font-normal text-base leading-7 text-gray-500  max-sm:text-center">
              {profileData.bio} <br className="hidden sm:block" />
              New York, United States
            </p>
          </div>
          <Button
            className="min-w-40"
            color="primary"
            size="lg"
            variant="shadow"
          >
            <span className="px-2 font-semibold text-base leading-7 text-white">
              Follow
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}
