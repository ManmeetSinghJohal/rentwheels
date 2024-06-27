import Link from "next/link";

import { Button } from "@/components/ui/button";

const AdminViewButton = ({ role }: { role: string }) => {
  return (
    role === "ADMIN" && (
      <Link href="/dashboard">
        <Button className="w-[110px] bg-secondary text-center text-xs font-bold text-white-50 hover:bg-primary">View Admin</Button>
      </Link>
    )
  );
};

export default AdminViewButton;
