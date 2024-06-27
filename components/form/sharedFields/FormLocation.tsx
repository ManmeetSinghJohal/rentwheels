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

  useEffect(() => {
    const fetchPredictions = async () => {
      const predictions = await searchLocation({ searchText: locationWatch });
      setPlacePredictions(predictions);
    };

    if ((locationWatch && !isClicked) || locationWatch !== location) {
      setIsActive(true);
      fetchPredictions();
    } else {
      setIsActive(false);
    }
  }, [locationWatch, isClicked, location]);

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
              <div className="flex h-[16px] w-[16px] items-center justify-center self-center rounded-full bg-purple-200 dark:bg-gray-700">
                <Image src="icons/ellipse.svg" alt="elipse" width={8} height={8} />
              </div>
              <FormLabel className={cn("text-left flex flex-col text-gray-900 font-plusJakartaSans font-semibold leading-normal dark:text-white-50", labelClassName)}>{label}</FormLabel>
            </div>
          ) : (
            <FormLabel className={cn("text-left flex flex-col text-gray-900 font-plusJakartaSans font-semibold leading-normal dark:text-white-50", labelClassName)}>{label}</FormLabel>
          )}

          <FormControl>
            <Input
              className="text-[12px] font-normal text-gray-950 ring-transparent placeholder:text-gray-400 dark:bg-gray-800 dark:text-white-50 sm:text-[14px]"
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
              <PopoverContent className="z-10 w-[410px] rounded-md border bg-white-50 p-2 shadow-md dark:border-none dark:bg-gray-800  ">
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
