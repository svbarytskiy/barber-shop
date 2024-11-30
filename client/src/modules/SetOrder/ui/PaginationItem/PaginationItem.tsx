import { FC } from "react";

interface PaginationItemProps {
    number: number;
    onClick: (number: number) => void;
    currentPage: number;
}

const PaginationItem: FC<PaginationItemProps> = ({ number, onClick, currentPage }) => {
    return (
        <button
            onClick={() => onClick(number)}
            className={`p-2 min-w-[30px] text-base font-bold rounded cursor-pointer bg-white border hover:bg-gray-200 transition ${currentPage === number ? 'scale-125' : ''} sm:p-3 sm:min-w-[40px] sm:text-xl md:p-3 md:min-w-[50px] md:text-xl`}
        >
            {number}
        </button>
    );
}

export default PaginationItem;
