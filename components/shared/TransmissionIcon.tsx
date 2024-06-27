"use client";

import Image from "next/image";

import { useTheme } from "@/contexts/ThemeProvider";
import { TransmissionIconProps } from "@/types";

const TransmissionIcon = ({ width, height, alt, extraClasses }: TransmissionIconProps) => {
  const { mode } = useTheme();

  const iconSrc = mode === "light" ? "/icons/wheel-icon-light.svg" : "/icons/wheel-icon-dark.svg";

  return <Image src={iconSrc} alt={alt} height={height} width={width} className={`cursor-pointer ${extraClasses}`} />;
};

export default TransmissionIcon;
