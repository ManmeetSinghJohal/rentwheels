"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface FormComboboxProps {
  form: any;
  name: string;
  label: string;
  labelClassName?: string;
  placeholder: string;
  constant: any;
}

const FormCombobox = ({ form, name, label, labelClassName, placeholder, constant }: FormComboboxProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={cn("dark:text-white-50 font-plusJakartaSans font-bold text-[14px]", labelClassName)}>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button variant="outline" role="combobox" className={cn("w-full sm:h-[56px] h-[46px] dark:bg-gray-800 bg-white-200 border-none text-gray-900 font-plusJakartaSans dark:text-white-50 justify-between", !field.value && "font-normal  text-gray-400")}>
                  {field.value ? constant.find((item: any) => item.value === field.value)?.label : `Select ${label}`}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-black" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[350px] p-0 dark:bg-gray-800 dark:border-none bg-white-50">
              <Command>
                <CommandInput placeholder={placeholder} className="dark:text-white-50" />
                <CommandEmpty>
                  {" "}
                  <p className="dark:text-white-50">No {label} found.</p>
                </CommandEmpty>
                <CommandGroup>
                  {constant.map((car: any) => (
                    <CommandItem
                      value={car.label}
                      key={car.value}
                      onSelect={() => {
                        form.setValue(name, car.value);
                      }}
                      className="hover:underline hover:decoration-black dark:hover:decoration-white-50 hover:underline-offset-4 cursor-pointer dark:text-white-50"
                    >
                      <Check className={cn("mr-2 h-4 w-4 text-primary dark:text-white-50 ", car.value === field.value ? "opacity-100" : "opacity-0")} />
                      {car.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormCombobox;
