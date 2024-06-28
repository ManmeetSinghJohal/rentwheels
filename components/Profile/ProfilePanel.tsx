"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { useUser } from "@clerk/nextjs";

import UserProfileDialog from "./UserProfileDialog";
import CoverImageDialog from "./CoverImageDialog";
import { getUserById } from "@/lib/actions/userActions";
import AdminViewButton from "./AdminViewButton";

const ProfilePanel = () => {
  const [coverImage, setCoverImage] = useState("/images/profile-cover.png");
  const [role, setRole] = useState("USER");
  const { user } = useUser();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = user?.publicMetadata?.userId;
        if (userId) {
          const dbUser = await getUserById(Number(userId));
          setCoverImage(dbUser?.coverImg || coverImage);
          setRole(dbUser?.role || role);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  });

  const updateCoverImage = (newCoverImageUrl: string) => {
    setCoverImage(newCoverImageUrl);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const { firstName, lastName, username, imageUrl } = user;
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className="relative mb-10 h-[301px] w-full min-w-[327px] rounded-[10px] bg-white-50 dark:bg-gray-850">
      {/* Profile Image */}
      <Image src={imageUrl} alt="profile-picture" width={70} height={70} className="absolute left-[13px] top-[115px] z-10 h-[70px] w-[70px] rounded-full lg:left-[31px] lg:top-[119px] lg:h-40 lg:w-40" />

      {/* Cover Image */}
      <div className="relative flex h-[150px] lg:h-[184px]">
        <Image src={coverImage} alt="cover-picture" width={375} height={150} loading="eager" className="z-0 h-auto w-full rounded-t-[10px] object-cover" priority />
        <CoverImageDialog onCoverImageUpdated={updateCoverImage} />
      </div>

      {/* Profile Details */}
      <div className="flex items-start justify-start lg:ml-[223px] lg:mt-[30px]">
        <div className="ml-[13px] flex flex-col gap-2 pt-[45px] lg:ml-0 lg:pt-0">
          <div className="w-full text-xl font-bold text-gray-900 dark:text-white-50">{fullName}</div>
          <div className="w-full text-sm font-normal text-gray-400">{`@${username}`}</div>
        </div>
      </div>

      {/* Edit Button */}
      <div className="absolute bottom-5 right-[13px] lg:bottom-[42px] lg:right-[50px]">
        <div className="flex items-center justify-center gap-3">
          <AdminViewButton role={role} />
          <UserProfileDialog />
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;
