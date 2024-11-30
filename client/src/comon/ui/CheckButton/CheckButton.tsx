import React, { FC, useState } from 'react';

interface CheckButtonProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const CheckButton: FC<CheckButtonProps> = ({ label, checked, onChange }) => {
    const handleToggle = () => {
        onChange(!checked);
    };

    return (
        <label className="flex items-center cursor-pointer">
            <div className="relative">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleToggle}
                    className="sr-only"
                />
                <div
                    className={`block w-10 h-6 rounded-full ${checked ? 'bg-blue-600' : 'bg-gray-400'
                        }`}
                ></div>
                <div
                    className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${checked ? 'transform translate-x-full' : ''
                        }`}
                ></div>
            </div>
            <span className="ml-3 text-gray-900">{label}</span>
        </label>
    );
};

export default CheckButton;