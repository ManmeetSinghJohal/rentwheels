import React from "react";
import Image from "next/image";

import CarDetailsModal from "./shared/CarDetailsModal";
import FavoriteButton from "./shared/FavoriteButton";
import { CarMetrics } from "./shared/CarMetrics";
import { CarWithFavorite } from "@/types";

const CarCard = ({ carouselCarCard, car }: { carouselCarCard?: boolean; car: CarWithFavorite }) => {
  return (
    <article className={`flex flex-col p-4 sm:p-6 bg-white-50 ${carouselCarCard ? "max-w-[240px] sm:max-w-xs" : "max-w-full"}  dark:bg-gray-850 rounded-[10px]`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="paragraph-bold dark:text-white-50 md:base-bold">{car.title}</h3>
          <p className="small-regular text-gray-400">{car.type}</p>
        </div>
        <FavoriteButton carId={car.id} initialIsFavorite={car.isFavorite} />
      </div>
      <CarDetailsModal car={car} carouselCarCard={carouselCarCard} />
    </article>
  );
};

export default CarCard;
