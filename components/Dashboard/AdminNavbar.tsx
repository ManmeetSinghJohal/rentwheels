"use client";

import { usePathname } from "next/navigation";
import { getTitleFromUrl } from "@/lib/utils";
import { useEffect, useState } from "react";

const AdminNavbar = () => {
  const pathname = usePathname();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchTitle = async () => {
      const title = await getTitleFromUrl(pathname);
      setTitle(title);
    };

    fetchTitle();
  }, [pathname]);

  return (
    <div className="flex w-full items-center justify-between gap-5 p-5">
      <div className="h3-bold capitalize text-gray-850 dark:text-gray-300">{title}</div>
    </div>
  );
};

export default AdminNavbar;
