import React from "react";
import { Metadata } from "next";

import SearchInputs from "@/components/shared/SearchInputs";
import Filter from "@/components/shared/Filter";
import CarCard from "@/components/CarCard";
import { getFilteredCars } from "@/lib/actions/car.action";
import ShowMoreCars from "@/components/Search/ShowMoreCars";

export const metadata: Metadata = {
  title: "Search Page",
  description: "Search for your next car on RentWheels",
};

const Search = async ({ searchParams }: { searchParams: { capacity: string; page: string; rentPrice: string; type: string[] } }) => {
  const currentPage = Number(searchParams.page as string) || 1;

  const cars = await getFilteredCars({
    searchParams: searchParams as any,
    perPage: 10,
    page: currentPage,
  });
  if (!cars) return null;
  const totalNumberOfPosts = cars.totalCarsCount;
  const totalNumberOfPages = Math.ceil(totalNumberOfPosts / 10);

  return (
    <div className="max-w-[1440px] lg:grid lg:grid-cols-[1fr_2fr] lg:gap-6">
      <Filter searchParams={searchParams} />
      <div className="mt-6 lg:pt-6">
        <SearchInputs />
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {cars.cars.map((car, i) => (
              <CarCard key={i} car={car} />
            ))}
          </div>
          <div className="mx-auto my-[42px]">
            <ShowMoreCars currentPage={currentPage} totalPages={totalNumberOfPages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
