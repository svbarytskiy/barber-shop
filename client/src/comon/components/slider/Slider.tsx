import React, { FC, useState } from 'react';

interface SliderProps {
    items: any[]; // Replace any with the type that corresponds to your slots or days
    itemsPerPage: number;
    rowsPerPage: number; // New prop for rows per page
    isAnimating: boolean;
    setIsAnimating: (animating: boolean) => void;
    onNextPage: () => void;
    onPrevPage: () => void;
    renderItem: (item: any) => React.ReactNode; // Function to render individual items
}

const Slider: FC<SliderProps> = ({ 
    items, 
    itemsPerPage, 
    rowsPerPage, // Accept the new prop
    isAnimating, 
    setIsAnimating, 
    onNextPage, 
    onPrevPage, 
    renderItem 
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalItemsPerPage = itemsPerPage * rowsPerPage; // Calculate total items per page
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
        <div className="relative overflow-hidden">
            <div className={`grid grid-cols-${itemsPerPage} grid-rows-${rowsPerPage} gap-4 transition-transform duration-300 transform ${isAnimating ? 'translate-x-full' : 'translate-x-0'}`}>
                {paginatedItems.map(renderItem)}
            </div>
            <div className="flex justify-between mt-5">
                <button
                    className={`p-2 text-xl rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    className={`p-2 text-xl rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
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
