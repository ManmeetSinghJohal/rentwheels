import React from "react";

interface MoonIconProps {
  size: number;
  extraClasses?: string;
}

const MoonIcon = ({ size, extraClasses }: MoonIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        className={extraClasses}
        id="Subtract"
        d="M10.6849 10.6849C13.4251 7.94475 13.4251 3.50198 10.6849 0.761796C10.4035 0.480409 10.5818 -0.0373932 10.9777 0.00213997C13.1998 0.223986 15.3619 1.18598 17.0641 2.88818C20.9786 6.80274 20.9786 13.1495 17.0641 17.0641C13.1495 20.9786 6.80273 20.9786 2.88818 17.0641C1.18598 15.3619 0.223985 13.1998 0.00213996 10.9777C-0.0373932 10.5818 0.480409 10.4035 0.761796 10.6849C3.50197 13.4251 7.94475 13.4251 10.6849 10.6849Z"
        fill="#833DFF"
      />
    </svg>
  );
};

export default MoonIcon;
