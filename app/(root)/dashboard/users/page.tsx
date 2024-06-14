import Link from "next/link";

import Pagination from "@/components/Dashboard/Pagination";
import { getAllUsers, searchUsers } from "@/lib/actions/user.action";
import { Button } from "@/components/ui/button";
import AdminSearch from "@/components/Dashboard/AdminSearch";
import UserTable from "@/components/Dashboard/UserTable";

const UsersPage = async ({ searchParams }: any) => {
  const query = searchParams.query;
  const page = parseInt(searchParams.page || "1", 10);
  const itemsPerPage = 5;

  const { users, totalCount } = query ? await searchUsers(query) : await getAllUsers(page, itemsPerPage);

  return (
    <div className="p-5 mt-5 mx-5 text-gray-700 dark:text-white-200 dark:bg-gray-850 bg-white-50 rounded-lg">
      <div className="flex p-2 items-center justify-between">
        <AdminSearch placeholder="Search for a user..." />

        <Link href="/dashboard/users/new">
          <Button className="px-3 py-2 bg-primary text-white rounded-md cursor-pointer">+ User</Button>
        </Link>
      </div>

      <UserTable users={users} count={totalCount} />

      <Pagination count={totalCount} limit={itemsPerPage} />
    </div>
  );
};

export default UsersPage;
