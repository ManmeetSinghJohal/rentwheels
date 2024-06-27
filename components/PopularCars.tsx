"use client";

import Link from "next/link";

import CarCard from "./CarCard";
import { Button } from "./ui/button";
import { CarWithFavorite } from "@/types";

const PopularCars = ({ cars }: { cars: CarWithFavorite[] }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-semibold text-gray-400 sm:text-[16px]">PopularCars</p>
        <Link href="/search" className="group">
          <Button className="small-regular bg-transparent font-semibold text-primary hover:bg-transparent dark:group-hover:text-white-50 md:text-[16px] ">View All</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default PopularCars;
