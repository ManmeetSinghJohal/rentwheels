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
    <div className="mx-5 mt-5 rounded-lg bg-white-50 p-5 text-gray-700 dark:bg-gray-850 dark:text-white-200">
      <div className="flex items-center justify-between p-2">
        <AdminSearch placeholder="Search for a user..." />

        <Link href="/dashboard/users/new">
          <Button className="cursor-pointer rounded-md bg-primary px-3 py-2 text-white-100">+ User</Button>
        </Link>
      </div>

      <UserTable users={users} count={totalCount} />

      <Pagination count={totalCount} limit={itemsPerPage} />
    </div>
  );
};

export default UsersPage;
