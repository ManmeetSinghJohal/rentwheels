"use client";

import { cn } from "@/lib/utils";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";

interface FormInputProps {
  form: any;
  name: string;
  label: string;
  labelClassName?: string;
  placeholder: string;
}

const FormInput = ({ form, name, label, placeholder, labelClassName }: FormInputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        if (field.value === 0) field.value = "";
        return (
          <FormItem>
            <FormLabel className={cn(" font-plusJakartaSans font-bold text-[14px] dark:text-white-50", labelClassName)}>{label}</FormLabel>
            <FormControl>
              <Input placeholder={placeholder} className={cn("h-[46px] sm:h-[56px] bg-white-200 text-[14px] font-normal  text-gray-900 placeholder:!text-gray-400 dark:bg-gray-800 dark:text-white-200 focus:ring-transparent", field.value === 0 && "text-gray-400")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default FormInput;
