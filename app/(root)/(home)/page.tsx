import { Metadata } from "next";
import { currentUser } from "@clerk/nextjs";

import Featured from "@/components/Featured";
import PopularCars from "@/components/PopularCars";
import RecommendedCars from "@/components/RecommendedCars";
import { getAllCars, getAllCarsWithFavorites, getFilteredCars } from "@/lib/actions/car.action";
import { CarWithFavorite } from "@/types";
import SearchInputs from "@/components/shared/SearchInputs";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

const Home = async ({ searchParams }: any) => {
  const user = await currentUser();
  let cars: CarWithFavorite[] = [];

  if (user?.publicMetadata.userId) {
    const userId = Number(user.publicMetadata.userId);

    cars = await getAllCarsWithFavorites(userId);
  } else {
    cars = await getAllCars();
  }

  // TODO: convert all functions for fetching cars to one function with params

  return (
    <div className="space-y-8 pt-6">
      <Featured />
      <SearchInputs searchParams={searchParams} />
      <PopularCars cars={cars} />
      <RecommendedCars cars={cars} />
    </div>
  );
};

export default Home;
