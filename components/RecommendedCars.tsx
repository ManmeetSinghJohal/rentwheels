"use client";

import React from "react";
import CarCard from "./CarCard";
import { Button } from "./ui/button";
import { CarWithFavorite } from "@/types";

const RecommendedCars = ({ cars }: { cars: CarWithFavorite[] }) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[12px] font-semibold text-gray-400 sm:text-[16px] ">Recommended cars</p>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      <div className="mx-auto py-16">
        <Button className=" small-regular bg-secondary  font-semibold text-white-50 hover:bg-primary dark:group-hover:text-white-50 md:text-[16px] ">Show more cars</Button>
      </div>
    </div>
  );
};

export default RecommendedCars;
