// components/Pagination.tsx
"use client"
import React from 'react';

interface PaginationProps {
    items: any[];
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (pageNumber: number) => void;
}

const ClientPagination: React.FC<PaginationProps> = ({ items, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage - 1, items.length - 1);

    const displayedItems = items.slice(startIndex, endIndex + 1);

    return (
        <div>
            <ul>
                {displayedItems.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <div>
                <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>Previous</button>
                <span>{currentPage} of {totalPages}</span>
                <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>Next</button>
            </div>
        </div>
    );
};

export default ClientPagination;
