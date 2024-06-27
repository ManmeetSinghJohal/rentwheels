"use client";

import React, { useState, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { Search } from "lucide-react";
import { debounce } from "@/lib/utils";
import { Input } from "../ui/input";

type AdminSearchParams = {
  placeholder: string;
};

const AdminSearch = ({ placeholder }: AdminSearchParams) => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchQuery = useCallback(
    debounce((query) => {
      const params = new URLSearchParams(searchParams);

      if (query) {
        params.set("query", query);
      } else {
        params.delete("query");
      }
      router.replace(`${pathname}?${params}`);
    }, 300),
    [searchParams, router]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    updateSearchQuery(query);
  };

  return (
    <div className="flex w-max items-center space-x-2 rounded-lg bg-transparent p-2">
      <Search aria-label="Search Icon" />
      <Input type="text" aria-label="Search" placeholder={placeholder} className="h-auto border-none bg-transparent text-gray-900 outline-none dark:text-white-200" value={searchTerm} onChange={handleSearchChange} />
    </div>
  );
};

export default AdminSearch;
