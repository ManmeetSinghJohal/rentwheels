"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Slider } from "../ui/slider";
import { formUrlQuery } from "@/lib/utils";
import CheckBoxes from "../Search/CheckBoxes";

const FilterForTheModal = ({ searchParams }: any) => {
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
    <div className="border-gray-850 bg-white-50 px-6 pt-[10px] dark:bg-gray-900">
      <div>
        <div className="mb-7 text-xs font-semibold text-blue-300">TYPE</div>

        {["Sports", "Hybrid", "Electric", "Sedan", "Coupe", "Hatchback"].map((type) => (
          <CheckBoxes key={type} handleChange={handleChange} category="type" type={type} value={type} isChecked={selectedTypes.includes(type)} />
        ))}

        <div className="mt-10"></div>

        <div className="mb-7  text-xs font-semibold text-blue-300">CAPACITY</div>

        {["2", "4", "5", "8"].map((capacity) => (
          <CheckBoxes key={capacity} handleChange={handleChange} category="capacity" capacity={capacity} value={capacity} isChecked={selectedCapacities.includes(capacity)} />
        ))}

        <div className="mt-10"></div>

        <div className="mb-7 text-xs font-semibold text-blue-300">PRICE</div>

        <div>
          <Slider className="w-[246px]" name="slider" defaultValue={[200]} max={200} onValueChange={(value: number[]) => onValueChange(value)} />
          <div className="mt-3 text-xl font-semibold text-gray-700">Max. ${maxPrice.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default FilterForTheModal;
