"use client";

import Link from "next/link";

import CarCard from "./CarCard";
import { Button } from "./ui/button";
import { CarWithFavorite } from "@/types";

const PopularCars = ({ cars }: { cars: CarWithFavorite[] }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-[12px] sm:text-[16px] font-semibold text-gray-400">PopularCars</p>
        <Link href="/search" className="group">
          <Button className="bg-transparent hover:bg-transparent dark:group-hover:text-white-50 small-regular md:text-[16px] font-semibold text-primary ">View All</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default PopularCars;
