import React from "react";

interface MenuIconProps {
  size: number;
  extraClasses?: string;
}

const MenuIcon = ({ size, extraClasses }: MenuIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={`stroke-current ${extraClasses}`}
        d="M3 7H21"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        className={`stroke-current ${extraClasses}`}
        d="M3 12H21"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        className={`stroke-current ${extraClasses}`}
        d="M3 17H21"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default MenuIcon;
