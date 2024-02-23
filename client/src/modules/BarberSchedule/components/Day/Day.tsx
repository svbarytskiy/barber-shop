import { FC, useState } from "react"
import { ISlot } from "../../../../models/ISlot"
import { Slot, SlotProp } from "../Slot/Slot"

interface DayProps {
    id: string,
    date: Date,
    dayName: string,
    slots?: ISlot[],
    weekId: string
    isDayOff: boolean
    isWeekOnUpdate: boolean
    // SlotUpdate: (updatedSlot: Partial<SlotProp>) => void
}

export const Day: FC<DayProps> = ({ date, dayName, slots, isDayOff, isWeekOnUpdate }) => {

    const formattedDate = new Date(date).toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    return (
        <div className="p-3 rounded-xl bg-gray-400 flex flex-col mx-1 my-1">
            <div className="text-center  px-4 py-2 text-sm text-gray-700">
                {formattedDate}
            </div>
            <div className="px-4 py-1 text-center text-lg text-gray-600">{dayName}</div>
            <div className="flex flex-col flex-wrap my-3">
                {isDayOff ? (
                    <div className="text-center text-xl text-red-500 my-3">
                        Вихідний день
                    </div>
                ) : (
                    <div className="flex flex-col flex-wrap my-3">
                        {slots && slots.map((slot, index) => (
                            <Slot
                                 key={index} isWeekOnUpdate={isWeekOnUpdate}
                                {...slot} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
