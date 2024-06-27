// @ts-nocheck

import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import React from "react";

const CheckBoxes = ({ handleChange, category, type, capacity, isChecked }: any) => {
  return (
    <div className="mb-8 flex items-center gap-2">
      <Checkbox id={type || capacity} className="h-6 w-6 rounded-md" onClick={() => handleChange(category, type || capacity)} checked={isChecked} />
      <Label htmlFor="Sport" className="text-xl font-semibold leading-6 text-gray-700 dark:text-white-100">
        {type || `${capacity} person`}
      </Label>
    </div>
  );
};

export default CheckBoxes;
