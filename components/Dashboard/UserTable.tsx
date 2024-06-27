import Image from "next/image";
import Link from "next/link";
import { User } from "@prisma/client";
import AdminTable from "./AdminTable";
import { Eye } from "lucide-react";
import AdminDeleteDialog from "./AdminDeleteDialog";
import { UserTableProps } from "@/types";

const usersColumns = [
  {
    header: "Name",
    accessor: (user: User) => (
      <div className="flex items-center space-x-2">
        <Image src={user.picture || "/images/default-profile.png"} alt="profile-picture" width={30} height={30} className="rounded-full object-cover" />
        <span>{user.name}</span>
      </div>
    ),
  },
  { header: "Email", accessor: (user: User) => user.email },
  { header: "Clerk Id", accessor: (user: User) => user.clerkId },
  { header: "Role", accessor: (user: User) => user.role },
  {
    header: "Action",
    accessor: (user: User) => (
      <div className="flex items-center justify-between space-x-2">
        <Link href={`/dashboard/users/${user.id}`} className="flex h-10 cursor-pointer items-center px-2 py-1">
          <Eye />
        </Link>

        <AdminDeleteDialog resource={user} url="/api/resource/delete" />
      </div>
    ),
  },
];

const UserTable = async ({ users, count }: UserTableProps) => {
  return <AdminTable data={users} columns={usersColumns} count={count} />;
};

export default UserTable;
