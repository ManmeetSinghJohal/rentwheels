"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

type SelectOption = {
  value: string;
  label: string;
};

type FormSelectProps = {
  form: any;
  name: string;
  label: string;
  placeholder: string;
  constant: SelectOption[];
  labelClassName?: string;
  selectTriggerClassName?: string;
  leftImageUrl?: boolean;
};

const FormSelect = ({ form, name, label, placeholder, constant, labelClassName, selectTriggerClassName, leftImageUrl }: FormSelectProps) => {
  const options = constant || [];

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={`flex flex-col ${leftImageUrl === true ? "w-1/2" : ""}`}>
          <FormLabel className={cn("font-plusJakartaSans dark:text-white-50", labelClassName)}>
            <div className="flex gap-2">
              {leftImageUrl && <Image src="/icons/clock.svg" width={16} height={16} alt="clock" />}
              {label}
            </div>
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger
                className={cn(
                  "text-left font-plusJakartaSans  h-[46px] sm:h-[56px] bg-white-200 dark:bg-gray-800 text-[14px] focus:ring-transparent border-none data-[placeholder]:!text-gray-400 data-[placeholder]:font-normal data-[placeholder]:font-plusJakartaSans dark:text-white-50",
                  selectTriggerClassName
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-white-50 dark:bg-gray-800 dark:text-white-50 border-none">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value} className="hover:underline hover:decoration-black dark:hover:decoration-white-50 hover:underline-offset-4 cursor-pointer">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSelect;
