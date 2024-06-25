"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import FilterModal from "./FilterModal";

import { Slider } from "../ui/slider";
import { formUrlQuery } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import CheckBoxes from "../Search/CheckBoxes";

const Filter = ({ searchParams }: any) => {
  const searchParamsInstance = new URLSearchParams(searchParams);
  const router = useRouter();

  const [maxPrice, setMaxPrice] = useState(() => {
    const price = searchParamsInstance.get("rentPrice");
    return price ? Number(price) : 400;
  });
  const [selectedTypes, setSelectedTypes] = useState(() => {
    const types = searchParamsInstance.get("type");
    return types ? types.split(",") : [];
  });
  const [selectedCapacities, setSelectedCapacities] = useState(() => {
    const capacities = searchParamsInstance.get("capacity");
    return capacities ? capacities.split(",") : [];
  });

  const handleInputChange = (value: string) => {
    console.log("input value", value);
  };

  const onValueChange = (value: number[]) => {
    setMaxPrice(value[0]);
  };

  useEffect(() => {
    handleChange("rentPrice", maxPrice);
  }, [maxPrice]);

  const handleChange = (key: string, value: string | number) => {
    let values = searchParamsInstance.get(key)?.split(",") || [];

    const valueAsString = String(value);

    if (key === "rentPrice" && !values?.includes(valueAsString)) {
      values = [valueAsString];
    } else if (values?.includes(valueAsString)) {
      values = values.filter((t) => t !== valueAsString);
    } else {
      values?.push(valueAsString);
    }

    searchParamsInstance.set(key, values?.join(",") || "");
    searchParamsInstance.set("page", "1");

    searchParams = searchParamsInstance.toString();

    const newUrl = formUrlQuery({
      params: searchParams,
      key: key,
      value: new URLSearchParams(searchParams).get(key),
    });

    router.push(newUrl, { scroll: false, shallow: true } as any);

    if (key === "type") {
      setSelectedTypes(values);
    } else if (key === "capacity") {
      setSelectedCapacities(values);
    }
  };

  return (
    <div className="lg:pt-[41px] lg:px-6 lg:bg-white-50 dark:bg-gray-900 lg:dark:border-r-[1px] border-gray-850 lg:ml-[-25px]">
      <div className="hidden lg:block text-xs font-semibold text-blue-300 mb-7">SEARCH</div>
      <div className="flex gap-4 mb-8 lg:mb-[52px] pt-6 lg:pt-0">
        <input
          type="text"
          placeholder="Search something here"
          className="w-full h-[46px] dark:border-gray-800 dark:bg-gray-850 text-gray-700 font-normal text-xs leading-6 px-[11px] py-4 bg-white-50 rounded-md border border-blue-100 search-input"
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <FilterModal searchParams={searchParams} />
      </div>

      <div className="hidden lg:block ">
        <div className="hidden lg:block text-xs font-semibold text-blue-300 mb-7">TYPE</div>

        {["Sports", "Hybrid", "Electric", "Sedan", "Coupe", "Hatchback"].map((type) => (
          <CheckBoxes key={type} handleChange={handleChange} category="type" type={type} value={type} isChecked={selectedTypes.includes(type)} />
        ))}

        <div className="mt-14"></div>

        <div className="hidden lg:block text-xs  font-semibold text-blue-300 mb-7">CAPACITY</div>

        {["2", "4", "5", "8"].map((capacity) => (
          <CheckBoxes key={capacity} handleChange={handleChange} category="capacity" capacity={capacity} value={capacity} isChecked={selectedCapacities.includes(capacity)} />
        ))}

        <div className="mt-14"></div>

        <div className="hidden lg:block text-xs  font-semibold text-blue-300 mb-7">PRICE</div>

        <div>
          <Slider className="w-[246px]" name="slider" defaultValue={[maxPrice]} max={400} onValueChange={onValueChange} />
          <div className="mt-3 text-xl font-semibold text-gray-700">Max. ${maxPrice.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
