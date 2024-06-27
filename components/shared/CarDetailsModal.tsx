"use client";
import React, { useState } from "react";
import Image from "next/image";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Car } from "@prisma/client";
// import RentalForm from "../form/RentalForm";
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
    console.log(pickupOpen)
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div>
            <div
              className={`flex ${carouselCarCard ? "my-8" : "mb-8 mt-3"}
           items-end justify-between sm:mb-9 sm:mt-12`}
            >
              <div className={`${carouselCarCard ? "w-full" : "flex h-[64px] w-2/3 justify-center sm:h-auto  sm:w-full"}  relative `}>
                <Image src={car.images[0]} blurDataURL={`${car.blurDataURL[0]}`} placeholder="blur" width={248} height={100} alt="car" className="mx-auto object-contain sm:object-cover" />
                <div className="absolute inset-x-0 bottom-0 h-8 border-none bg-transparent bg-gradient-to-t from-white-100 dark:bg-transparent dark:from-gray-850"></div>
              </div>

              {/* Metrics small screen */}
              <CarMetrics car={car} smallScreen={true} classes={`${carouselCarCard ? "hidden" : "flex justify-between flex-col sm:!hidden gap-4"}`} extraClasses={carouselCarCard ? "max-sm:w-[14px] max-sm:h-[14px]" : ""} />
            </div>

            {/* Metrics Large screens */}
            <CarMetrics car={car} smallScreen={false} classes={`${carouselCarCard ? "flex justify-between" : "sm:justify-between sm:flex hidden"} mb-7`} extraClasses={carouselCarCard ? "max-sm:w-[14px] max-sm:h-[14px]" : ""} />
            {/* Price button */}
            <div className="flex items-center justify-between">
              <div>
                <p className="paragraph-bold sm:base-bold dark:text-white-50">
                  ${car.rentPrice}/ <span className="small-regular sm:body-regular text-gray-400">day</span>
                </p>
                <p className="small-regular sm:body-regular text-gray-400">$80.00</p>
              </div>
              <button className="small-regular sm:paragraph-medium h-9 rounded bg-secondary px-5 tracking-wider text-white-50 sm:h-11">More info</button>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className=" mt-[194px] max-w-[1054px] rounded-[10px] px-2 dark:border-none dark:bg-gray-850">
          <div className="w-full bg-white-50 p-4 dark:bg-gray-850 md:grid md:grid-cols-[45%_55%] md:gap-x-7 md:p-6 lg:h-[540px] xl:gap-x-14">
            <div className="flex flex-col justify-center ">
              <div className="relative mb-6 flex w-full items-center justify-center">
                <Image src={selectedImage} alt="ads" width={300} height={300} objectFit="cover" className="rounded-[10px]" />
              </div>
              <div className="dark:dark flex gap-5 overflow-x-auto">
                {images.map((imageSrc, index) => (
                  <div key={imageSrc} className={`relative h-[64px] min-w-[96px] lg:h-[124px] lg:min-w-[146px] ${selectedImageIndex === index ? "overflow-hidden rounded-[10px] border-2 border-primary" : "overflow-hidden rounded-[10px]"}`} onClick={() => handleImageClick(index)}>
                    <Image src={imageSrc} alt={`car ${index}`} width={96} height={64} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 md:flex md:flex-col md:justify-between md:pr-6 md:pt-0 xl:mr-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white-50 md:pt-2 lg:text-[32px]">{car.title}</h3>
              </div>

              <div className="py-4 text-xs font-normal leading-6 tracking-tighter text-gray-700 dark:text-white-200 lg:text-xl lg:leading-10 lg:tracking-wider">
                <p>{car.description}</p>
              </div>

              <div className="flex justify-between gap-x-[47px] text-xs lg:text-xl">
                <div className="flex w-2/4 flex-col gap-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium tracking-tight text-gray-400 lg:font-normal">Type Car</span>
                    <span className="font-semibold tracking-tighter text-gray-700 dark:text-white-200">{car.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium tracking-tight text-gray-400 lg:font-normal">Transm.</span>
                    <span className="font-semibold tracking-tighter text-gray-700 dark:text-white-200">{car.transmission}</span>
                  </div>
                </div>
                <div className="flex w-2/4 flex-col gap-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium tracking-tight text-gray-400 lg:font-normal">Capacity</span>
                    <span className="font-semibold tracking-tighter text-gray-700 dark:text-white-200">{car.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium tracking-tight text-gray-400 lg:font-normal">Gasonline</span>
                    <span className="font-semibold tracking-tighter text-gray-700 dark:text-white-200">{car.fuelCapacity}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <div>
                  <div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white-50 lg:text-[28px]">${car.rentPrice}/</span>
                    <span className="text-xs font-bold text-gray-400 lg:text-base"> day</span>
                  </div>
                  <div className="mt-2.5 text-xs font-bold text-gray-400 line-through md:mb-8 lg:text-base">$100.00</div>
                </div>
                <Button disabled variant="default" className="btn-primary h-[54px] w-[125px] text-sm lg:h-[56px] lg:text-base" onClick={openPickup}>
                  Rent Now
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* <RentalForm title="Rent Now" car={car} open={pickupOpen} onOpenChange={onOpenChange} /> */}
    </>
  );
};

export default CarDetailsModal;
