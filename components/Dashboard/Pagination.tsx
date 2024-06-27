"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

type PaginationProps = {
  count: number;
  limit?: number;
};

const Pagination = ({ count, limit = 10 }: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1", 10));
  const [maxPage, setMaxPage] = useState(Math.ceil(count / limit));
  const hasPrev = page > 1;
  const hasNext = page < maxPage;

  useEffect(() => {
    setPage(parseInt(searchParams.get("page") || "1", 10));
    setMaxPage(Math.ceil(count / limit));
  }, [searchParams, count, limit]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleChangePage = (type: "prev" | "next") => {
    let newPage;
    if (type === "prev") {
      newPage = Math.max(page - 1, 1);
    } else {
      newPage = Math.min(page + 1, maxPage);
    }

    const newQueryString = createQueryString("page", newPage.toString());

    router.push(`${pathname}?${newQueryString}`);
  };

  return (
    <div className="mt-5 flex justify-between p-2">
      <Button className={`px-2 py-1 ${!hasPrev && "cursor-not-allowed bg-gray-200 dark:bg-gray-600"} text-white-50`} disabled={!hasPrev} onClick={() => handleChangePage("prev")}>
        <ArrowLeft />
      </Button>

      <div className="paragraph-medium flex items-center justify-center px-2 py-1 text-gray-700 dark:text-gray-100">
        Page {page} of {maxPage}
      </div>

      <Button className={`px-2 py-1 ${!hasNext && "cursor-not-allowed bg-gray-200 dark:bg-gray-600"} text-white-50`} disabled={!hasNext} onClick={() => handleChangePage("next")}>
        <ArrowRight />
      </Button>
    </div>
  );
};

export default Pagination;
