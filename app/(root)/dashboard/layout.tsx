import { ReactNode } from "react";

import Sidebar from "@/components/Dashboard/Sidebar";
import AdminNavbar from "@/components/Dashboard/AdminNavbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full flex bg-white-200 dark:bg-gray-900">
      <div className="p-5 min-h-screen w-1/5 min-w-fit">
        <Sidebar />
      </div>
      <div className="flex-grow">
        <AdminNavbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
