"use client";
import React, { useState } from "react";
import Image from "next/image";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Car } from "@prisma/client";
import RentalForm from "../form/RentalForm";
import { CarMetrics } from "./CarMetrics";

const CarDetailsModal = ({ carouselCarCard, car }: { carouselCarCard?: boolean; car: Car }) => {
  const images = ["/images/view.svg", "/images/Look3.svg", "/images/Look2.svg", "/images/view.svg", "/images/Look3.svg", "/images/Look2.svg", "/images/view.svg"];
  const [open, setOpen] = useState(false);
  const [pickupOpen, setPickupOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const newImages = [...images];
  if (car.images && car.images[0] && !newImages.includes(car.images[0])) {
    newImages.unshift(car.images[0]);
  }

  const selectedImage = newImages[selectedImageIndex];

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const openPickup = () => onOpenChange(true);

  const onOpenChange = (isOpen: boolean) => {
    setOpen(!isOpen);
    setPickupOpen(isOpen);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div>
            <div
              className={`flex ${carouselCarCard ? "my-8" : "mb-8 mt-3"}
           items-end justify-between sm:mt-12 sm:mb-9`}
            >
              <div className={`${carouselCarCard ? "w-full" : "w-2/3 h-[64px] sm:h-auto flex justify-center  sm:w-full"}  relative `}>
                <Image src={car.images[0]} blurDataURL={`${car.blurDataURL[0]}`} placeholder="blur" width={248} height={100} alt="car" className="object-contain sm:object-cover mx-auto" />
                <div className="absolute inset-x-0 border-none bottom-0 h-8 bg-gradient-to-t from-white-100 to bg-transparent dark:from-gray-850 to dark:bg-transparent"></div>
              </div>

              {/* Metrics small screen */}
              <CarMetrics car={car} smallScreen={true} classes={`${carouselCarCard ? "hidden" : "flex justify-between flex-col sm:!hidden gap-4"}`} extraClasses={carouselCarCard ? "max-sm:w-[14px] max-sm:h-[14px]" : ""} />
            </div>

            {/* Metrics Large screens */}
            <CarMetrics car={car} smallScreen={false} classes={`${carouselCarCard ? "flex justify-between" : "sm:justify-between sm:flex hidden"} mb-7`} extraClasses={carouselCarCard ? "max-sm:w-[14px] max-sm:h-[14px]" : ""} />
            {/* Price button */}
            <div className="flex justify-between items-center">
              <div>
                <p className="paragraph-bold dark:text-white-50 sm:base-bold">
                  ${car.rentPrice}/ <span className="small-regular text-gray-400 sm:body-regular">day</span>
                </p>
                <p className="small-regular sm:body-regular text-gray-400">$80.00</p>
              </div>
              <button className="btn bg-secondary h-9 sm:h-11 small-regular sm:paragraph-medium tracking-wider text-white-50 px-5 rounded">More info</button>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className=" px-2 rounded-[10px] mt-[194px] max-w-[1054px] dark:bg-gray-850 dark:border-none">
          <div className="dark:bg-gray-850 p-4 bg-white-50 w-full md:grid md:grid-cols-[45%_55%] md:gap-x-7 xl:gap-x-14 lg:h-[540px] md:p-6">
            <div className="flex flex-col justify-center ">
              <div className="flex justify-center items-center w-full mb-6 relative">
                <Image src={selectedImage} alt="ads" width={300} height={300} objectFit="cover" className="rounded-[10px]" />
              </div>
              <div className="flex gap-5 overflow-x-auto dark:dark">
                {images.map((imageSrc, index) => (
                  <div key={imageSrc} className={`h-[64px] lg:h-[124px] lg:min-w-[146px] min-w-[96px] relative ${selectedImageIndex === index ? "border-2 border-primary rounded-[10px] overflow-hidden" : "rounded-[10px] overflow-hidden"}`} onClick={() => handleImageClick(index)}>
                    <Image src={imageSrc} alt={`car ${index}`} width={96} height={64} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 md:pr-6 xl:mr-8 md:flex md:flex-col md:justify-between md:pt-0">
              <div>
                <h3 className="text-gray-900 text-xl font-bold lg:text-[32px] md:pt-2 dark:text-white-50">{car.title}</h3>
              </div>

              <div className="py-4 dark:text-white-200 text-gray-700 font-normal text-xs leading-6 tracking-tighter lg:leading-10 lg:text-xl lg:tracking-wider">
                <p>{car.description}</p>
              </div>

              <div className="flex justify-between text-xs gap-x-[47px] lg:text-xl">
                <div className="w-2/4 flex flex-col gap-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-400 tracking-tight lg:font-normal">Type Car</span>
                    <span className="font-semibold tracking-tighter text-gray-700 dark:text-white-200">{car.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-400 tracking-tight lg:font-normal">Transm.</span>
                    <span className="font-semibold tracking-tighter text-gray-700 dark:text-white-200">{car.transmission}</span>
                  </div>
                </div>
                <div className="w-2/4 flex flex-col gap-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-400 tracking-tight lg:font-normal">Capacity</span>
                    <span className="font-semibold tracking-tighter text-gray-700 dark:text-white-200">{car.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-400 tracking-tight lg:font-normal">Gasonline</span>
                    <span className="font-semibold tracking-tighter text-gray-700 dark:text-white-200">{car.fuelCapacity}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <div>
                  <div>
                    <span className="text-gray-900 text-xl font-bold lg:text-[28px] dark:text-white-50">${car.rentPrice}/</span>
                    <span className="text-gray-400 text-xs font-bold lg:text-base"> day</span>
                  </div>
                  <div className="font-bold text-xs text-gray-400 line-through mt-2.5 lg:text-base md:mb-8">$100.00</div>
                </div>
                <Button variant="default" className="btn-primary w-[125px] h-[54px] lg:h-[56px] text-sm lg:text-base" onClick={openPickup}>
                  Rent Now
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <RentalForm title="Rent Now" car={car} open={pickupOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default CarDetailsModal;
