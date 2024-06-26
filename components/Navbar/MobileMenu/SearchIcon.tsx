import React from "react";

interface SearchIconProps {
  size: number;
  extraClasses?: string;
}

const SearchIcon = ({ size, extraClasses }: SearchIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        className={extraClasses}
        d="M13.4966 13.5234C13.8058 13.2163 14.3015 13.2163 14.6107 13.5234L16.6544 15.1731H16.6899C17.1034 15.5911 17.1034 16.2686 16.6899 16.6866C16.2764 17.1045 15.6061 17.1045 15.1926 16.6866L13.4966 14.7428L13.4322 14.6702C13.3123 14.5184 13.2461 14.3292 13.2461 14.1331C13.2461 13.9043 13.3362 13.6849 13.4966 13.5234ZM7.86211 1C9.68206 1 11.4275 1.73075 12.7144 3.03149C14.0013 4.33223 14.7242 6.09642 14.7242 7.93594C14.7242 11.7666 11.652 14.8719 7.86211 14.8719C4.07227 14.8719 1 11.7666 1 7.93594C1 4.10533 4.07227 1 7.86211 1Z"
        fill="#3D5278"
      />
    </svg>
  );
};

export default SearchIcon;
