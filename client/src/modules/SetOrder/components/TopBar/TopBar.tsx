import { FC } from "react";
import OneInRow from "../../ui/OneInRow";
import ThreeInRow from "../../ui/ThreeInRow";
import TwoInRow from "../../ui/TwoInRow";

interface TopBarProps {
    selectedService: string[]; 
    handleMapOptionChange: (option: string) => void;
    mapOption: string;
    isSmallScreen: boolean; 
}

const TopBar: FC<TopBarProps> = ({ selectedService, handleMapOptionChange, mapOption, isSmallScreen }) => {
    const handleOptionClick = (option: string) => {
        handleMapOptionChange(option); 
    };

    return (
        <div className="p-5 bg-white rounded-xl mb-3 w-full border lg:mb-5 flex justify-between items-center">
            {selectedService.length > 0 && (
                <div className="text-sm text-gray-900 md:text-lg lg:text-xl">
                    Selected services: {selectedService.join(", ")}
                </div>
            )}
            {!isSmallScreen && (
                <div className="flex space-x-3 ml-auto">
                    <OneInRow isActive={mapOption === "one"} onClick={() => handleOptionClick("one")} />
                    <TwoInRow isActive={mapOption === "two"} onClick={() => handleOptionClick("two")} />
                    <ThreeInRow isActive={mapOption === "three"} onClick={() => handleOptionClick("three")} />
                </div>
            )}
        </div>
    );
};

export default TopBar;
