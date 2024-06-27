"use client";

import React from "react";
import Image from "next/image";

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTheme } from "@/contexts/ThemeProvider";
import { themes } from "@/constants";
import MoonIcon from "./MoonIcon";
import SunIcon from "./SunIcon";
import MonitorIcon from "./MonitorIcon";

const ThemeSwitch = () => {
  const { mode, setMode } = useTheme();

  const handleClick = (value: string) => {
    setMode(value);

    if (value !== "system") {
      localStorage.mode = value;
    } else {
      localStorage.removeItem("mode");
    }
  };

  const iconSrc = mode === "dark" ? "/assets/icons/moon.svg" : "/assets/icons/sun.svg";
  const altText = mode === "dark" ? "moon_icon" : "sun_icon";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image src={iconSrc} alt={altText} height={20} width={20} loading="eager" className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-3 inline-flex h-[114px] w-[105px] flex-col items-center justify-center gap-4 rounded border border-default-50 bg-white-200 px-[15.50px] py-3.5 text-sm font-semibold text-gray-400 dark:border-gray-800 dark:bg-gray-850 dark:text-blue-100 lg:h-[123px] lg:w-[120px] lg:py-[15.50px] lg:pl-[19px] lg:pr-5 lg:text-base">
        <DropdownMenuGroup>
          {themes.map((item) => (
            <DropdownMenuItem key={item.value} className={`${mode === item.value ? "text-primary" : "text-gray-400 dark:text-blue-100"} inline-flex cursor-pointer items-center justify-start gap-1`} onClick={() => handleClick(item.value)}>
              {item.value === "dark" && <MoonIcon size={16} extraClasses={`${mode === item.value ? "fill-primary" : "fill-gray-400 dark:fill-blue-100"}`} />}
              {item.value === "light" && <SunIcon size={16} extraClasses={`${mode === item.value ? "fill-primary" : "fill-gray-400 dark:fill-blue-100"}`} />}
              {item.value === "system" && <MonitorIcon size={16} extraClasses={`${mode === item.value ? "fill-primary" : "fill-gray-400 dark:fill-blue-100"}`} />}

              <div>{item.label}</div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitch;
