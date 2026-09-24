"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { MutableRefObject } from "react";

interface PaginationProps {
  setPage:Function,
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, setPage }) => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const pathname = usePathname();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    console.log(page)
    if (page) {
      setPage(page)
      console.log("page")
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }
    push(`${pathname}?${params.toString()}`);
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex my-4">
      <button
        className="mx-1 px-2 py-1 border rounded text-white shadow-xl bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Précédent
      </button>
      {pageNumbers.map((number, index) => (
        <button
          key={index}
          className={`mx-1 px-2 py-1 border rounded shadow-xl ${
            currentPage === number ? "text-white bg-blue-600" : ""
          }`}
          onClick={() => typeof number === "number" && onPageChange(number)}
          disabled={typeof number !== "number"}
        >
          {number}
        </button>
      ))}
      <button
        className="mx-1 px-2 py-1 border rounded text-white shadow-xl bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Suivant
      </button>
    </div>
  );
};

export default Pagination;
