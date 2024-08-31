import React, { FC } from "react";
import { ISlot } from "../../../../models/ISlot";
import { observer } from "mobx-react-lite";

interface SlotProps {
    slot: ISlot;
    isSelected: boolean;
    onSelect: (slotId: string) => void;
}

export const Slot: FC<SlotProps> = observer(({ slot, isSelected, onSelect }) => {
    const handleClick = () => {
        onSelect(slot.id);
    };

    return (
        <div
            onClick={handleClick}
            className={`rounded-3xl bg-gray-100 hover:bg-gray-200 m-1 p-1 cursor-pointer border ${
                isSelected ? "border-blue-500" : "border-transparent"
            }`}
        >
            <div className="p-3 rounded-md">
                <div className="text-gray-700 text-xl mb-2">
                    {new Date(slot.date).toLocaleTimeString("uk-UA", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    })}
                </div>
                <div className="text-gray-800 text-lg mb-3">{slot.service}</div>
                <div className="">
                    <span
                        className={`rounded-full px-3 border-2 py-1 text-xx ${
                            slot.slotStatus === "Available"
                                ? "bg-green-400 border-green-800"
                                : "bg-red-400 border-red-800"
                        }`}
                    >
                        {slot.slotStatus === "Available" ? "Available" : "Unavailable"}
                    </span>
                </div>
            </div>
        </div>
    );
});
