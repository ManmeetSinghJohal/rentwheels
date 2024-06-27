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
          <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[10px] border border-blue-100 bg-white-50 p-3 dark:border-gray-800 dark:bg-gray-900 lg:border-hidden">
            <Image src="/icons/filter-dark.png" width={24} height={24} alt="filter" className="lg:hidden" />
          </div>
        </DialogTrigger>

        <DialogContent className=" mt-[260px] max-w-[500px] rounded-[10px] px-2 dark:border-none dark:bg-gray-850">
          <FilterForTheModal searchParams={searchParams} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FilterModal;
