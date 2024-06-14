"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { SearchParamProps } from "@/types";
import { formUrlQuery } from "@/lib/utils";

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const ShowMoreCars = ({ searchParams, currentPage, totalPages }: { searchParams: SearchParamProps; postsPerPage: number; currentPage: number; totalPages: number }) => {
  const router = useRouter();

  const handlePageChange = (newPage: number, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    let searchParamsInstance = new URLSearchParams(searchParams);
    searchParamsInstance.set("page", newPage.toString());

    searchParams = searchParamsInstance.toString();

    const newUrl = formUrlQuery({
      params: searchParams,
    } as any);

    router.push(newUrl, { scroll: false });
  };

  const getPageNumbers = () => {
    const pages = [];
    const pageLimit = 5;
    const lowerLimit = currentPage - 2;
    const upperLimit = currentPage + 2;

    let startPage = Math.max(1, lowerLimit);
    let endPage = Math.min(totalPages, upperLimit);

    // Adjust start and end pages if close to page limits
    startPage = lowerLimit < 1 ? Math.max(1, upperLimit - pageLimit + 1) : startPage;
    endPage = upperLimit > totalPages ? Math.min(totalPages, lowerLimit + pageLimit - 1) : endPage;

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(1, startPage > 2 ? "..." : null).filter(Boolean);
    }

    // Add all pages from startPage to endPage
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis and last page if needed
    if (endPage < totalPages) {
      pages.push(endPage < totalPages - 1 ? "..." : null, totalPages).filter(Boolean);
    }

    return pages;
  };

  return (
    <>
      {/* {isClient && ( */}
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious href="#" onClick={(e) => handlePageChange(currentPage - 1, e)} />
            </PaginationItem>
          )}

          {/* Page Numbers with Ellipses */}
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationLink href="#" onClick={(e) => handlePageChange(page, e)} isActive={page === currentPage}>
                {page}
              </PaginationLink>
            )
          )}

          {/* Next Button */}
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext href="#" onClick={(e) => handlePageChange(currentPage + 1, e)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
      {/* )} */}
    </>
  );
};

export default ShowMoreCars;
