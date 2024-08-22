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
        <div className="flex items-center mb-2">
            <input
                type="checkbox"
                id={id}
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="hidden"
            />
            <label
                htmlFor={id}
                className={`flex items-center justify-center w-6 h-6 border-2 border-gray-900 rounded-md cursor-pointer transition-colors ${isChecked ? 'bg-blue-500' : 'bg-white'
                    }`}
            >
                {isChecked && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </label>
            <span className="ml-3 text-gray-900 text-lg">{label}</span>
        </div>
    );
};

export default CustomCheckbox;
