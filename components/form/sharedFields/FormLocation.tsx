import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { searchLocation } from "@/lib/actions/utils.action";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PlacePrediction {
  description: string;
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: string[]; //
    secondary_text: string;
  };
  terms: string[];
  types: string[];
  matched_substrings: string[];
}

interface FormLocationProps {
  form: any;
  name: string;
  label: string;
  labelClassName?: string;
  hasLabelIcon?: boolean;
  placeholder: string;
}

const FormLocation = ({ form, name, label, labelClassName, hasLabelIcon, placeholder }: FormLocationProps) => {
  const [placePredictions, setPlacePredictions] = useState<PlacePrediction[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [location, setLocation] = useState("");

  const locationWatch = form.watch(name);
  const inputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   const fetchPredictions = async () => {
  //     const predictions = await searchLocation({ searchText: locationWatch });
  //     setPlacePredictions(predictions);
  //   };

  //   if ((locationWatch && !isClicked) || locationWatch !== location) {
  //     setIsActive(true);
  //     fetchPredictions();
  //   } else {
  //     setIsActive(false);
  //   }
  // }, [locationWatch]);

  const handleClick = (description: string) => {
    form.setValue(name, description);
    setIsActive(false);
    setIsClicked(true);
    setLocation(description);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {hasLabelIcon ? (
            <div className="flex gap-2 pb-3">
              <div className="flex w-[16px] items-center justify-center h-[16px] rounded-full bg-purple-200 self-center dark:bg-gray-700">
                <Image src="icons/ellipse.svg" alt="elipse" width={8} height={8} />
              </div>
              <FormLabel className={cn("text-left flex flex-col text-gray-900 font-plusJakartaSans font-semibold leading-normal dark:text-white-50", labelClassName)}>{label}</FormLabel>
            </div>
          ) : (
            <FormLabel className={cn("text-left flex flex-col text-gray-900 font-plusJakartaSans font-semibold leading-normal dark:text-white-50", labelClassName)}>{label}</FormLabel>
          )}

          <FormControl>
            <Input
              className="ring-transparent dark:bg-gray-800 font-normal placeholder:text-gray-400 sm:text-[14px] text-[12px] dark:text-white-50 text-gray-950"
              form={form}
              placeholder={placeholder}
              {...field}
              name={name}
              ref={inputRef}
              onChange={(e) => {
                if (!isClicked) {
                  field.onChange(e);
                  setTimeout(() => inputRef.current?.focus(), 1000);
                } else {
                  field.onChange(e);
                  setTimeout(() => inputRef.current?.focus(), 1000);
                }
              }}
            />
          </FormControl>
          <FormMessage />
          {isActive && (
            <Popover open={isActive}>
              <PopoverTrigger asChild>
                <div className="invisible w-full" />
              </PopoverTrigger>
              <PopoverContent className="w-[410px] z-10 bg-white-50 p-2 dark:bg-gray-800 rounded-md dark:border-none border border-1 shadow-md  ">
                <ul>
                  {placePredictions.map((prediction) => (
                    <li key={prediction.place_id} className="cursor-pointer hover:underline hover:decoration-white-50 hover:underline-offset-4 dark:text-white-50" onClick={() => handleClick(prediction.description)}>
                      {prediction.description}
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
          )}
        </FormItem>
      )}
    />
  );
};

export default FormLocation;
