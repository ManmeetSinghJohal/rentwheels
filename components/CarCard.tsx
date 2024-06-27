import React from "react";

import CarDetailsModal from "./shared/CarDetailsModal";
import FavoriteButton from "./shared/FavoriteButton";
// import { CarMetrics } from "./shared/CarMetrics";
import { CarWithFavorite } from "@/types";

const CarCard = ({ carouselCarCard, car }: { carouselCarCard?: boolean; car: CarWithFavorite }) => {
  return (
    <article className={`flex flex-col bg-white-50 p-4 sm:p-6 ${carouselCarCard ? "max-w-[240px] sm:max-w-xs" : "max-w-full"}  rounded-[10px] dark:bg-gray-850`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="paragraph-bold md:base-bold dark:text-white-50">{car.title}</h3>
          <p className="small-regular text-gray-400">{car.type}</p>
        </div>
        <FavoriteButton carId={car.id} initialIsFavorite={car.isFavorite} />
      </div>
      <CarDetailsModal car={car} carouselCarCard={carouselCarCard} />
    </article>
  );
};

export default CarCard;
