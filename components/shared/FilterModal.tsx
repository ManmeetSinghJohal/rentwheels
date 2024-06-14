"use client";
import React, { useState } from "react";
import Image from "next/image";


import FilterForTheModal from "./FilterForTheModal";
import { SearchParamProps } from "@/types";


import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";


const FilterModal = ({ searchParams }: SearchParamProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="h-[48px] w-[48px] bg-white-50 rounded-[10px] flex items-center justify-center p-3 border border-blue-100 dark:bg-gray-900 dark:border-gray-800 lg:border-hidden">
            <Image src="/icons/filter-dark.png" width={24} height={24} alt="filter" className="lg:hidden" />
          </div>
        </DialogTrigger>

        <DialogContent className=" px-2 rounded-[10px] mt-[260px] max-w-[500px] dark:bg-gray-850 dark:border-none">
          <FilterForTheModal searchParams={searchParams} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FilterModal;
