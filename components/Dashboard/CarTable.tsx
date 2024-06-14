import Image from "next/image";
import Link from "next/link";
import React from "react";
import AdminTable from "./AdminTable";
import { CarWithOwner, CarTableProps } from "@/types";
import { Eye, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

const carsColumns = [
  {
    header: "Owner",
    accessor: (car: CarWithOwner) => (
      <div className="flex items-center space-x-2">
        <Image src={car.owner.picture || "/images/default-profile.png"} alt="profile-picture" width={30} height={30} className="rounded-full object-cover" />
        <span>{car.owner.name}</span>
      </div>
    ),
  },
  { header: "Model", accessor: (car: CarWithOwner) => `${car.title}  ${car.type}` },
  { header: "Price", accessor: (car: CarWithOwner) => `$${car.rentPrice}` },
  { header: "Capacity", accessor: (car: CarWithOwner) => car.capacity },
  { header: "Transmission", accessor: (car: CarWithOwner) => car.transmission },
  { header: "Location", accessor: (car: CarWithOwner) => car.location },
  { header: "Status", accessor: (car: CarWithOwner) => (car.rentalStatus ? "available" : "unavailable") },
  {
    header: "Action",
    accessor: (car: CarWithOwner) => (
      <div className="flex items-center justify-between space-x-2">
        <Link href={`/dashboard/cars/${car.id}`} className="px-2 py-1 cursor-pointer h-10 flex items-center">
          <Eye />
        </Link>

        <Button className="px-2 py-1 cursor-pointer bg-transparent hover:bg-transparent rounded-none">
          <Trash2 />
        </Button>
      </div>
    ),
  },
];

const CarTable = async ({ cars, count }: CarTableProps) => {
  return <AdminTable data={cars} columns={carsColumns} count={count} />;
};

export default CarTable;
