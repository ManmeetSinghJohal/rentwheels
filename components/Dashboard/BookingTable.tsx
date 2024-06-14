import Image from "next/image";
import Link from "next/link";
import AdminTable from "./AdminTable";
import { BookingTableProps, BookingWithUserAndCar } from "@/types";
import { Eye, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

const bookingColumns = [
  {
    header: "Customer Name",
    accessor: (booking: BookingWithUserAndCar) => (
      <div className="flex items-center space-x-2">
        <Image src={booking.user.picture || "/images/default-profile.png"} alt="profile-picture" width={30} height={30} className="rounded-full object-cover" />
        <span>{booking.user.name}</span>
      </div>
    ),
  },
  { header: "Email", accessor: (booking: BookingWithUserAndCar) => booking.user.email },
  { header: "Car Name", accessor: (booking: BookingWithUserAndCar) => booking.car.title },
  { header: "Owner", accessor: (booking: BookingWithUserAndCar) => booking.car.owner.name },
  {
    header: "Action",
    accessor: (booking: BookingWithUserAndCar) => (
      <div className="flex items-center justify-between space-x-2">
        <Link href={`/dashboard/bookings/${booking.id}`} className="px-2 py-1 cursor-pointer h-10 flex items-center">
          <Eye />
        </Link>

        <Button className="px-2 py-1 cursor-pointer bg-transparent hover:bg-transparent rounded-none">
          <Trash2 />
        </Button>
      </div>
    ),
  },
];

const BookingTable = async ({ bookings, count }: BookingTableProps) => {
  return <AdminTable data={bookings} columns={bookingColumns} count={count} />;
};

export default BookingTable;
