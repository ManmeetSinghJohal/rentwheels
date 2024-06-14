"use client";

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../ui/form";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import { Button, buttonVariants } from "@/components/ui/button";

const FormCalendar = ({ form, name, label, placeholder }: any) => {
  const customCalendarClassNames = {
    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
    month: "space-y-4",
    caption: "flex justify-center pt-1 relative items-center font-bold text-gray-950 dark:text-white-50",
    caption_label: "text-sm font-medium",
    nav: "space-x-1 flex items-center",
    nav_button: cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"),
    nav_button_previous: "absolute left-1",
    nav_button_next: "absolute right-1",
    table: "w-full border-collapse space-y-1",
    head_row: "flex",
    head_cell: "text-gray-950 dark:text-white-50 rounded-md w-9 font-normal text-[0.8rem]",
    row: "flex w-full mt-2",
    cell: "h-9 w-9 text-center text-gray-950 dark:text-white-50 text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
    day: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
    day_range_end: "day-range-end",
    day_selected: "bg-primary text-white-50 hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
    day_today: "bg-accent text-primary",
    day_outside: "day-outside text-gray-400 opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
    day_disabled: "text-gray-400 opacity-50 line-through",
    day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
    day_hidden: "invisible",
  };
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-1/2">
          <FormLabel className="flex gap-2 font-plusJakartaSans text-[14px] sm:text-[16px] font-semibold leading-normal text-gray-900 dark:text-white-50">
            <Image src="/icons/calendar.svg" width={16} height={16} alt="Calendar" />
            {label}
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button variant="ghost" className={cn("flex justify-between bg-white-200 dark:bg-gray-800 dark:text-white-50 border-none h-[56px] rounded-[7px] ")}>
                  {field.value ? (
                    format(field.value, "dd/MM/yyyy")
                  ) : (
                    <>
                      <span className=" font-normal font-plusJakartaSans !text-gray-400">{placeholder}</span>
                      <Image src="/icons/arrow-down.svg" alt="arrow-down" width={12} height={12} />
                    </>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white-50 z-10 rounded-md" align="start">
              <Calendar mode="single" className="dark:bg-gray-800 rounded-md text-white-50" classNames={customCalendarClassNames} selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date()} initialFocus />
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormCalendar;
