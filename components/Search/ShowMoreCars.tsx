"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const ShowMoreCars = ({ currentPage, totalPages }: { currentPage: number; totalPages: number }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handlePageChange = (newPage: number, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const pageNumberSearchParams = new URLSearchParams(searchParams);
    pageNumberSearchParams.set("page", newPage.toString());
    router.push("?" + pageNumberSearchParams.toString(), { scroll: false });
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
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
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    // Add all pages from startPage to endPage
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis and last page if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    // Filter out any null values
    return pages.filter(Boolean);
  };

  return (
    <>
      {/* {isClient && ( */}
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && <PaginationPrevious href="#" onClick={(e) => handlePageChange(currentPage - 1, e)} />}

          {/* Page Numbers with Ellipses */}
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationLink key={index} href="#" onClick={(e) => typeof page === "number" && handlePageChange(page, e)} isActive={page === currentPage}>
                {page}
              </PaginationLink>
            )
          )}

          {/* Next Button */}
          {currentPage < totalPages && <PaginationNext href="#" onClick={(e) => handlePageChange(currentPage + 1, e)} />}
        </PaginationContent>
      </Pagination>
      {/* )} */}
    </>
  );
};

export default ShowMoreCars;
