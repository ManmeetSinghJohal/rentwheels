import Link from "next/link";

import { Button } from "@/components/ui/button";

const AdminViewButton = ({ role }: { role: string }) => {
  return (
    role === "ADMIN" && (
      <Link href="/dashboard">
        <Button className="w-[110px] bg-secondary hover:bg-primary text-center text-white-50 text-xs font-bold">View Admin</Button>
      </Link>
    )
  );
};

export default AdminViewButton;
