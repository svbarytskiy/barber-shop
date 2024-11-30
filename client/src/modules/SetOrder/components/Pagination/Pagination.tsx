import { FC } from "react";
import PaginationItem from "../../ui/PaginationItem/PaginationItem";

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    onPaginate: (number: number) => void;
    currentPage: number;
}

const Pagination: FC<PaginationProps> = ({ totalItems, itemsPerPage, onPaginate, currentPage }) => {
    const pageNumbers: number[] = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const start = Math.max(currentPage - 2, 1);  
    const end = Math.min(currentPage + 2, pageNumbers.length);  

    const visiblePages = pageNumbers.slice(start - 1, end); 

    return (
        <section className="mx-auto flex justify-center gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-5">
            {visiblePages.map((number) => (
                <PaginationItem
                    key={number}
                    number={number}
                    onClick={onPaginate}
                    currentPage={currentPage}
                />
            ))}
        </section>
    );
}

export default Pagination;
