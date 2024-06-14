"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import FilterModal from "./FilterModal";

import { Slider } from "../ui/slider";
import { formUrlQuery } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import CheckBoxes from "../Search/CheckBoxes";

const Filter = ({ searchParams }: any) => {
  const [maxPrice, setMaxPrice] = useState(200);
  let searchParamsInstance = new URLSearchParams(searchParams);

  const router = useRouter();

  const handleInputChange = (value: string) => {
    console.log("input value", value)
  }

  const onValueChange = (value: number[]) => {
    setMaxPrice(value[0]);
  };

  useEffect(() => {
    handleChange("rentPrice", maxPrice);
  }, [maxPrice]);

  const handleChange = (key: string, value: string | number) => {
    let values = searchParamsInstance.get(key) ? searchParamsInstance.get(key)?.split(",") : [];

    const valueAsString = String(value);

    if (key === "rentPrice" && !values?.includes(valueAsString)) {
      values = [valueAsString];
    } else if (values?.includes(valueAsString)) {
      values = values.filter((t) => t !== valueAsString);
    } else {
      values?.push(valueAsString);
    }

    searchParamsInstance.set(key, values?.join(",") || "");

    // Reset page number to 1
    searchParamsInstance.set("page", "1");

    searchParams = searchParamsInstance.toString();

    const newUrl = formUrlQuery({
      params: searchParams,
      key: key,
      value: new URLSearchParams(searchParams).get(key),
    });

    router.push(newUrl, { scroll: false, shallow: true });
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

        <CheckBoxes handleChange={handleChange} category={"type"} type={"Sports"} />
        <CheckBoxes handleChange={handleChange} category={"type"} type={"Hybrid"} />
        <CheckBoxes handleChange={handleChange} category={"type"} type={"Electric"} />
        <CheckBoxes handleChange={handleChange} category={"type"} type={"Sedan"} />
        <CheckBoxes handleChange={handleChange} category={"type"} type={"Coupe"} />
        <CheckBoxes handleChange={handleChange} category={"type"} type={"Hatchback"} />

        <div className="mt-14"></div>

        <div className="hidden lg:block text-xs  font-semibold text-blue-300 mb-7">CAPACITY</div>

        <CheckBoxes handleChange={handleChange} category={"capacity"} capacity={"2"} />
        <CheckBoxes handleChange={handleChange} category={"capacity"} capacity={"4"} />
        <CheckBoxes handleChange={handleChange} category={"capacity"} capacity={"5"} />
        <CheckBoxes handleChange={handleChange} category={"capacity"} capacity={"8"} />

        <div className="mt-14"></div>

        <div className="hidden lg:block text-xs  font-semibold text-blue-300 mb-7">PRICE</div>

        <div>
          <Slider className="w-[246px]" name="slider" defaultValue={[200]} max={200} onValueChange={(value: number[]) => onValueChange(value)} />
          <div className="mt-3 text-xl font-semibold text-gray-700">Max. ${maxPrice.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
