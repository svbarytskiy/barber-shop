import { FC } from "react";

interface IconProps {
    isActive: boolean;
    onClick: () => void;
}

const OneInRow: FC<IconProps> = ({ isActive, onClick }) => {
    const spansArray = Array.from({ length: 3 });
    return (
        <button
            onClick={onClick}
            className={`w-[50px] h-[50px] bg-white grid grid-cols-1 gap-[3px] border rounded p-[3px] transition-all duration-300 focus:outline-none hover:scale-105 ${
                isActive ? "border-blue-500 shadow-lg" : "border-gray-400"
            }`}
        >
            {spansArray.map((_, index) => (
                <span
                    key={index}
                    className={`w-full h-full rounded transition-colors duration-300 ${
                        isActive ? "bg-blue-500" : "bg-gray-400"
                    }`}
                ></span>
            ))}
        </button>
    );
};

export default OneInRow;
