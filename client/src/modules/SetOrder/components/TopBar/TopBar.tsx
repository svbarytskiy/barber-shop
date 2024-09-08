import { FC, useState } from "react";
import OneInRow from "../../ui/OneInRow";
import ThreeInRow from "../../ui/ThreeInRow";
import TwoInRow from "../../ui/TwoInRow";

interface TopBarProps {
    selectedService: string[]; // Вибрані сервіси
    handleMapOptionChange: (option: string) => void;
}

const TopBar: FC<TopBarProps> = ({ selectedService, handleMapOptionChange }) => {
    const [activeOption, setActiveOption] = useState<string>("two"); // Вибрана опція

    const handleOptionClick = (option: string) => {
        setActiveOption(option);
        handleMapOptionChange(option); // Передача вибраної опції у батьківський компонент
    };

    return (
        <div className="p-5 bg-white rounded-xl w-full ml-6 border mb-5 flex justify-between items-center">
            {selectedService.length > 0 && (
                <div className="text-gray-900 text-xl">
                    Selected services: {selectedService.join(", ")}
                </div>
            )}
            <div className="flex space-x-3 ml-auto">
                <OneInRow isActive={activeOption === "one"} onClick={() => handleOptionClick("one")} />
                <TwoInRow isActive={activeOption === "two"} onClick={() => handleOptionClick("two")} />
                <ThreeInRow isActive={activeOption === "three"} onClick={() => handleOptionClick("three")} />
            </div>
        </div>
    );
};

export default TopBar;
