"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SearchInputSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import FormLocation from "../form/sharedFields/FormLocation";
import FormCalendarSearchInputs from "../form/sharedFields/FormCalanderSearchInputs";
// import { SearchParamProps } from "@/types";

const SearchInputs = () => {
  // const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof SearchInputSchema>>({
    resolver: zodResolver(SearchInputSchema),
    defaultValues: {
      location: "",
      availableFrom: undefined,
      availableTo: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof SearchInputSchema>) {
    // const { location, availableFrom, availableTo } = values;
    const mySearchParams = new URLSearchParams();
    mySearchParams.set("location", values.location);

    router.replace(mySearchParams.toString(), { scroll: false });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-6 rounded-[10px] pb-[1px] dark:bg-gray-850 lg:flex lg:h-[328px] lg:flex-col lg:bg-white-50 lg:px-5 lg:py-6 lg:pt-0 xl:h-[136px] xl:flex-row">
          <div className="mb-5 h-[355px] rounded-[10px] bg-white-50 px-3 pb-[21px] pt-[19px] dark:bg-gray-850 lg:mb-[-20px] lg:px-0 lg:pb-0 xl:flex xl:h-[136px] xl:basis-[95%]">
            <div className="pb-[22px] xl:basis-[33.3%] xl:pr-4 xl:pt-[.5px]">
              <FormLocation form={form} name="location" label="Location" labelClassName="text-[14px] lg:text-[16px] font-semibold" placeholder="Location Address" hasLabelIcon={true} />
            </div>
            <div className="lg: pb-4 lg:grid lg:grid-cols-2 lg:gap-[42px] xl:basis-[66.6%] xl:gap-4">
              <div className="pb-[22px] ">
                <FormCalendarSearchInputs type="date" form={form} name="availableFrom" label="Availability from" placeholder="Select your date" />
              </div>
              <div className="pb-[22px] xl:pr-4">
                <FormCalendarSearchInputs type="date" form={form} name="availableTo" label="Availability to" placeholder="Select your date" />
              </div>
            </div>
          </div>
          <div className="hidden lg:block xl:basis-[5%] xl:pt-[63px]">
            <Button disabled variant={"ghost"} className={cn(" bg-primary border-none h-[48px] rounded-[10px] w-full text-white-50 text-sm leading-6 font-semibold font-plusJakartaSans lg:h-[56px] xl:w-[60px]")}>
              <Image src="/icons/search-normal.png" width={14} height={14} alt="Search" className="mr-[6px] bg-primary xl:mr-0" />
              <div className="xl:hidden">Search</div>
            </Button>
          </div>
        </div>

        <div className="mb-9 lg:hidden xl:basis-[5%] xl:pt-[54px]">
          <Button disabled variant={"ghost"} className={cn(" bg-primary border-none h-[48px] rounded-[10px] w-full text-white-50 text-sm leading-6 font-semibold font-plusJakartaSans lg:h-[56px] xl:w-[60px]")}>
            <Image src="/icons/search-normal.png" width={14} height={14} alt="Search" className="mr-[6px] bg-primary xl:mr-0" />
            <div className="xl:hidden">Search</div>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SearchInputs;
