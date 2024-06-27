import { ReactNode } from "react";

import Sidebar from "@/components/Dashboard/Sidebar";
import AdminNavbar from "@/components/Dashboard/AdminNavbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex w-full bg-white-200 dark:bg-gray-900">
      <div className="min-h-screen w-1/5 min-w-fit p-5">
        <Sidebar />
      </div>
      <div className="grow">
        <AdminNavbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
