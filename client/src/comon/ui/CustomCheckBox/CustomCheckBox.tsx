import React, { FC, useState } from 'react';

interface CustomCheckboxProps {
    id: string;
    label: string;
    checked?: boolean;
    onChange?: (checked: boolean, id: string) => void;
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({ id, label, checked = false, onChange }) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        if (onChange) {
            onChange(!isChecked, id);
        }
    };

    return (
        <div className="flex items-center mb-2 overflow-hidden">
            <input
                type="checkbox"
                id={id}
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="hidden"
            />
            <label
                htmlFor={id}
                className={`flex items-center justify-center 
                            w-5 h-5 sm:w-6 sm:h-6 xl:w-8 xl:h-8 
                            border border-gray-900 rounded-md cursor-pointer transition-colors 
                            ${isChecked ? 'bg-blue-500' : 'bg-white'}`}
            >
                {isChecked && (
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </label>
            <span className="ml-2 text-sm sm:ml-3 xl:ml-4 text-gray-900 text-base sm:text-lg xl:text-xl truncate">
                {label}
            </span>
        </div>
    );
};

export default CustomCheckbox;
