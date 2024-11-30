import React, { useState, useEffect, FC } from "react";

interface Option {
    value: string;
    label: string;
}

interface MySelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

const MySelect: FC<MySelectProps> = ({ options, value, onChange, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);
 
    useEffect(() => {
        if (isOpen) {
            const handleClickOutside = (event: MouseEvent) => {
                if ((event.target as HTMLElement).closest(".my-select") === null) {
                    setIsOpen(false);
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen]);

    const handleOptionClick = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false); 
    };

    return (
        <div className="relative w-full my-select">
            <div
                className={`cursor-pointer px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${disabled ? "bg-gray-200" : "bg-white"
                    }`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                {options.find(option => option.value === value)?.label || "Select an option"}
            </div>
            {isOpen && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    {options.map(option => (
                        <li
                            key={option.value}
                            className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                            onClick={() => handleOptionClick(option.value)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MySelect;
