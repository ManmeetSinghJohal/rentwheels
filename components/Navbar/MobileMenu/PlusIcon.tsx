import React from "react";

interface PlusIconProps {
  size: number;
  extraClasses?: string;
}

const PlusIcon = ({ size, extraClasses }: PlusIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_7532_37048)">
        <path
          className={extraClasses}
          d="M11.7279 0.49996C14.4479 0.49996 15.9999 2.03598 15.9999 4.764V12.2361C15.9999 14.9481 14.4559 16.5001 11.7359 16.5001H4.2638C1.53577 16.5001 -0.000244141 14.9481 -0.000244141 12.2361V4.764C-0.000244141 2.03598 1.53577 0.49996 4.2638 0.49996H11.7279ZM7.99184 4.908C7.62383 4.908 7.32783 5.20401 7.32783 5.57201V7.82803H5.06381C4.88781 7.82803 4.7198 7.90003 4.5918 8.02004C4.4718 8.14804 4.3998 8.31524 4.3998 8.49204C4.3998 8.86004 4.6958 9.15605 5.06381 9.16405H7.32783V11.4281C7.32783 11.7961 7.62383 12.0921 7.99184 12.0921C8.35984 12.0921 8.65584 11.7961 8.65584 11.4281V9.16405H10.9279C11.2959 9.15605 11.5919 8.86004 11.5919 8.49204C11.5919 8.12404 11.2959 7.82803 10.9279 7.82803H8.65584V5.57201C8.65584 5.20401 8.35984 4.908 7.99184 4.908Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_7532_37048">
          <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PlusIcon;
