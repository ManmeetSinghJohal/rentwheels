"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import FilterModal from "./FilterModal";

import { Slider } from "../ui/slider";
import { formUrlQuery } from "@/lib/utils";

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

  const [search, setSearch] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleChange("q", search, true);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const onValueChange = (value: number[]) => {
    setMaxPrice(value[0]);
  };

  useEffect(() => {
    handleChange("rentPrice", maxPrice, true);
  }, [maxPrice]);

  const handleChange = (key: string, value: string | number, replace = false) => {
    let values = searchParamsInstance.get(key)?.split(",") || [];

    const valueAsString = String(value);

    if (values?.includes(valueAsString)) {
      values = values.filter((t) => t !== valueAsString);
    } else {
      values?.push(valueAsString);
    }

    if (!replace) {
      searchParamsInstance.set(key, values?.join(",") || "");
    } else {
      searchParamsInstance.set(key, value + "");
    }
    searchParamsInstance.set("page", "1");

    searchParams = searchParamsInstance.toString();

    const newUrl = formUrlQuery({
      params: searchParams,
      key,
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
    <div className="border-gray-850 dark:bg-gray-900 lg:ml-[-25px] lg:bg-white-50 lg:px-6 lg:pt-[41px] lg:dark:border-r-[1px]">
      <div className="mb-7 hidden text-xs font-semibold text-blue-300 lg:block">SEARCH</div>
      <div className="mb-8 flex gap-4 pt-6 lg:mb-[52px] lg:pt-0">
        <input type="text" placeholder="Search something here" className="search-input h-[46px] w-full rounded-md border border-blue-100 bg-white-50 px-[11px] py-4 text-xs font-normal leading-6 text-gray-700 dark:border-gray-800 dark:bg-gray-850" onChange={(e) => setSearch(e.target.value)} />
        <FilterModal searchParams={searchParams} />
      </div>

      <div className="hidden lg:block ">
        <div className="mb-7 hidden text-xs font-semibold text-blue-300 lg:block">TYPE</div>

        {["Sports", "Hybrid", "Electric", "Sedan", "Coupe", "Hatchback"].map((type) => (
          <CheckBoxes key={type} handleChange={handleChange} category="type" type={type} value={type} isChecked={selectedTypes.includes(type)} />
        ))}

        <div className="mt-14"></div>

        <div className="mb-7 hidden text-xs  font-semibold text-blue-300 lg:block">CAPACITY</div>

        {["2", "4", "5", "8"].map((capacity) => (
          <CheckBoxes key={capacity} handleChange={handleChange} category="capacity" capacity={capacity} value={capacity} isChecked={selectedCapacities.includes(capacity)} />
        ))}

        <div className="mt-14"></div>

        <div className="mb-7 hidden text-xs  font-semibold text-blue-300 lg:block">PRICE</div>

        <div>
          <Slider className="w-[246px]" name="slider" defaultValue={[maxPrice]} max={400} onValueChange={onValueChange} />
          <div className="mt-3 text-xl font-semibold text-gray-700">Max. ${maxPrice.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
