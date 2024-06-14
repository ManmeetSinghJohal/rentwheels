"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn, formUrlQuery } from "@/lib/utils";
import { SearchInputSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import FormLocation from "../form/sharedFields/FormLocation";
import FormCalendarSearchInputs from "../form/sharedFields/FormCalanderSearchInputs";
import { SearchParamProps } from "@/types";

const SearchInputs = ({ searchParams }: SearchParamProps) => {
  let searchParamsInstance = new URLSearchParams(searchParams as any);

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
    const { location, availableFrom, availableTo } = values;

    searchParamsInstance.set("location", values.location);

    searchParams = searchParamsInstance.toString() as any;

    const newUrl = formUrlQuery({
      params: searchParams,
    } as any);

    router.push(newUrl, { scroll: false });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="pb-[1px] mb-6 lg:pt-0 lg:bg-white-50 lg:px-5 lg:py-6 lg:h-[328px] lg:flex lg:flex-col rounded-[10px] xl:flex-row xl:h-[136px] dark:bg-gray-850">
          <div className="h-[355px] bg-white-50 rounded-[10px] pt-[19px] pb-[21px] px-3 mb-5 lg:px-0 lg:pb-0 lg:mb-[-20px] xl:flex xl:basis-[95%] xl:h-[136px] dark:bg-gray-850">
            <div className="pb-[22px] xl:basis-[33.3%] xl:pr-4 xl:pt-[.5px]">
              <FormLocation form={form} name="location" label="Location" labelClassName="text-[14px] lg:text-[16px] font-semibold" placeholder="Location Address" hasLabelIcon={true} />
            </div>
            <div className="lg:grid lg:grid-cols-2 lg:gap-[42px] lg: pb-4 xl:basis-[66.6%] xl:gap-4">
              <div className="pb-[22px] ">
                <FormCalendarSearchInputs type="date" form={form} name="availableFrom" label="Availability from" placeholder="Select your date" />
              </div>
              <div className="pb-[22px] xl:pr-4">
                <FormCalendarSearchInputs type="date" form={form} name="availableTo" label="Availability to" placeholder="Select your date" />
              </div>
            </div>
          </div>
          <div className="hidden lg:block xl:basis-[5%] xl:pt-[63px]">
            <Button variant={"ghost"} className={cn(" bg-primary border-none h-[48px] rounded-[10px] w-full text-white-50 text-sm leading-6 font-semibold font-plusJakartaSans lg:h-[56px] xl:w-[60px]")}>
              <Image src="/icons/search-normal.png" width={14} height={14} alt="Search" className="bg-primary mr-[6px] xl:mr-0" />
              <div className="xl:hidden">Search</div>
            </Button>
          </div>
        </div>

        <div className="lg:hidden xl:basis-[5%] xl:pt-[54px] mb-9">
          <Button variant={"ghost"} className={cn(" bg-primary border-none h-[48px] rounded-[10px] w-full text-white-50 text-sm leading-6 font-semibold font-plusJakartaSans lg:h-[56px] xl:w-[60px]")}>
            <Image src="/icons/search-normal.png" width={14} height={14} alt="Search" className="bg-primary mr-[6px] xl:mr-0" />
            <div className="xl:hidden">Search</div>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SearchInputs;
