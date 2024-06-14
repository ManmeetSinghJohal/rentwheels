"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Slider } from "../ui/slider";
import { formUrlQuery } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import CheckBoxes from "../Search/CheckBoxes";

const FilterForTheModal = ({ searchParams }: SearchParamProps) => {
  const [maxPrice, setMaxPrice] = useState(200);
  let searchParamsInstance = new URLSearchParams(searchParams);

  const router = useRouter();

  const onValueChange = (value: number[]) => {
    setMaxPrice(value[0]);
  };

  useEffect(() => {
    handleChange("rentPrice", maxPrice);
  }, [maxPrice]);

  const handleChange = (key: string, value: string | number) => {
    let values = searchParamsInstance.get(key) ? searchParamsInstance.get(key).split(",") : [];

    const valueAsString = String(value);

    if (key === "rentPrice" && !values.includes(valueAsString)) {
      values = [valueAsString];
    } else if (values.includes(valueAsString)) {
      values = values.filter((t) => t !== valueAsString);
    } else {
      values.push(valueAsString);
    }

    searchParamsInstance.set(key, values.join(","));

    // Reset page number to 1
    searchParamsInstance.set("page", "1");

    searchParams = searchParamsInstance.toString();

    const newUrl = formUrlQuery({
      params: searchParams,
      key: key,
      value: new URLSearchParams(searchParams).get(key),
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="pt-[10px] px-6 bg-white-50 dark:bg-gray-900 border-gray-850">
      <div>
        <div className="text-xs font-semibold text-blue-300 mb-7">TYPE</div>

        <CheckBoxes handleChange={handleChange} category={"type"} type={"Sports"} />
        <CheckBoxes handleChange={handleChange} category={"type"} type={"Hybrid"} />
        <CheckBoxes handleChange={handleChange} category={"type"} type={"Electric"} />
        <CheckBoxes handleChange={handleChange} category={"type"} type={"Sedan"} />
        <CheckBoxes handleChange={handleChange} category={"type"} type={"Coupe"} />
        <CheckBoxes handleChange={handleChange} category={"type"} type={"Hatchback"} />

        <div className="mt-10"></div>

        <div className="text-xs  font-semibold text-blue-300 mb-7">CAPACITY</div>

        <CheckBoxes handleChange={handleChange} category={"capacity"} capacity={"2"} />
        <CheckBoxes handleChange={handleChange} category={"capacity"} capacity={"4"} />
        <CheckBoxes handleChange={handleChange} category={"capacity"} capacity={"5"} />
        <CheckBoxes handleChange={handleChange} category={"capacity"} capacity={"8"} />

        <div className="mt-10"></div>

        <div className="text-xs font-semibold text-blue-300 mb-7">PRICE</div>

        <div>
          <Slider className="w-[246px]" name="slider" defaultValue={[200]} max={200} onValueChange={(value: number[]) => onValueChange(value)} />
          <div className="mt-3 text-xl font-semibold text-gray-700">Max. ${maxPrice.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default FilterForTheModal;
