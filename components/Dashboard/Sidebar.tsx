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
      <div className="flex items-center space-x-5 mb-5">
        {/* Profile Image */}
        <Image src={profileImg} alt="profile-picture" width={50} height={50} className="rounded-full" />

        {/* Profile Info */}
        <div className="flex flex-col">
          <span className="text-gray-700 dark:text-gray-300 font-medium">{`@${user?.username}`}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">Admin</span>
        </div>
      </div>

      {/* Menu Items */}
      <ul className="list-none">
        {menuItems.map((cat) => (
          <li key={cat.id}>
            <span className="text-gray-500 dark:text-gray-400 font-bold text-sm mb-2 block">{cat.title}</span>
            {cat.list.map((item) => (
              <Link key={item.title} href={item.path} className="flex items-center p-5 space-x-2 text-gray-700 dark:text-gray-300 text-base-medium">
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
