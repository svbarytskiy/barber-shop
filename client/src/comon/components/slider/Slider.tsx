import React, { FC, useState } from 'react';

interface SliderProps {
    items: any[];
    itemsPerPage: number;
    rowsPerPage: number; 
    isAnimating: boolean;
    setIsAnimating: (animating: boolean) => void;
    onNextPage: () => void;
    onPrevPage: () => void;
    renderItem: (item: any) => React.ReactNode;
}

const Slider: FC<SliderProps> = ({
    items,
    itemsPerPage,
    rowsPerPage,
    isAnimating,
    setIsAnimating,
    onNextPage,
    onPrevPage,
    renderItem
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalItemsPerPage = itemsPerPage * rowsPerPage;
    const totalPages = Math.ceil(items.length / totalItemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentPage(currentPage + 1);
                setIsAnimating(false);
                onNextPage();
            }, 300);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentPage(currentPage - 1);
                setIsAnimating(false);
                onPrevPage();
            }, 300);
        }
    };

    const paginatedItems = items.slice((currentPage - 1) * totalItemsPerPage, currentPage * totalItemsPerPage);

    return (
        <div className="relative flex flex-col h-full overflow-hidden justify-between">
            <div className={`grid grid-cols-${itemsPerPage} grid-rows-${rowsPerPage} gap-2 sm:gap-4 transition-transform duration-300 transform ${isAnimating ? 'translate-x-full' : 'translate-x-0'}`}>
                {paginatedItems.map(renderItem)}
            </div>
     
            <div className="flex justify-between py-4">
                <button
                    className={`p-2 text-base sm:text-xl rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    className={`p-2 text-base sm:text-xl rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Slider;
