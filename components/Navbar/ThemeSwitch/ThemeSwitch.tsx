"use client";

import React from "react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  const iconSrc =
    mode === "dark" ? "/assets/icons/moon.svg" : "/assets/icons/sun.svg";
  const altText = mode === "dark" ? "moon_icon" : "sun_icon";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src={iconSrc}
          alt={altText}
          height={20}
          width={20}
          loading="eager"
          className="cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-3 w-[105px] h-[114px] px-[15.50px] py-3.5 lg:w-[120px] lg:h-[123px] lg:pl-[19px] lg:pr-5 lg:py-[15.50px] bg-white-200 dark:bg-gray-850 rounded border text-gray-400 dark:text-blue-100 border-default-50 dark:border-gray-800 flex-col justify-center gap-4 items-center inline-flex text-sm lg:text-base font-semibold">
        <DropdownMenuGroup>
          {themes.map((item) => (
            <DropdownMenuItem
              key={item.value}
              className={`${
                mode === item.value
                  ? "text-primary"
                  : "text-gray-400 dark:text-blue-100"
              } justify-start items-center gap-1 inline-flex cursor-pointer`}
              onClick={() => handleClick(item.value)}
            >
              {item.value === "dark" && (
                <MoonIcon
                  size={16}
                  extraClasses={`${
                    mode === item.value
                      ? "fill-primary"
                      : "fill-gray-400 dark:fill-blue-100"
                  }`}
                />
              )}
              {item.value === "light" && (
                <SunIcon
                  size={16}
                  extraClasses={`${
                    mode === item.value
                      ? "fill-primary"
                      : "fill-gray-400 dark:fill-blue-100"
                  }`}
                />
              )}
              {item.value === "system" && (
                <MonitorIcon
                  size={16}
                  extraClasses={`${
                    mode === item.value
                      ? "fill-primary"
                      : "fill-gray-400 dark:fill-blue-100"
                  }`}
                />
              )}

              <div>{item.label}</div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitch;
