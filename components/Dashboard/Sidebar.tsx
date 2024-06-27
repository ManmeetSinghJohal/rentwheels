import React from "react";
import Image from "next/image";
import { menuItems } from "@/constants/dashboard";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { setProfilePicture } from "@/lib/utils";

const Sidebar = async () => {
  const user = await currentUser();
  const profileImg = setProfilePicture(user);

  return (
    <div className="sticky top-10">
      <div className="mb-5 flex items-center space-x-5">
        {/* Profile Image */}
        <Image src={profileImg} alt="profile-picture" width={50} height={50} className="rounded-full" />

        {/* Profile Info */}
        <div className="flex flex-col">
          <span className="font-medium text-gray-700 dark:text-gray-300">{`@${user?.username}`}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">Admin</span>
        </div>
      </div>

      {/* Menu Items */}
      <ul className="list-none">
        {menuItems.map((cat) => (
          <li key={cat.id}>
            <span className="mb-2 block text-sm font-bold text-gray-500 dark:text-gray-400">{cat.title}</span>
            {cat.list.map((item) => (
              <Link key={item.title} href={item.path} className="flex items-center space-x-2 p-5 text-base text-gray-700 dark:text-gray-300">
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
