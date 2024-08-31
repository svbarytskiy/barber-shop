import React, { FC } from "react";

interface ActionButtonsProps {
    isEditing: boolean;
    onEditToggle: () => void;
    onCancel: () => void;
    onSave: () => void;
}

const ActionButtons: FC<ActionButtonsProps> = ({ isEditing, onEditToggle, onCancel, onSave }) => (
    <div className="flex justify-between mt-auto">
        {isEditing ? (
            <>
                <button
                    className="w-[120px] cursor-pointer p-2 rounded-full bg-red-400 text-center items-center hover:bg-red-500 transition"
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button
                    className="w-[120px] cursor-pointer p-2 rounded-full bg-gray-100 text-center items-center hover:bg-gray-200 transition"
                    onClick={onSave}
                >
                    Save
                </button>
            </>
        ) : (
            <button
                className={`w-full cursor-pointer p-2 rounded-full bg-gray-100 text-center items-center hover:bg-gray-200 transition-all duration-300 ${!isEditing ? 'w-[120px]' : ''
                    }`}
                onClick={onEditToggle}
                disabled={isEditing}
            >
                Edit
            </button>
        )}
    </div>
);

export default ActionButtons;
