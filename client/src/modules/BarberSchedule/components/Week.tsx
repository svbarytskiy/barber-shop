import { FC, useState } from "react";
import { Day } from "./Day/Day";
import { IDay } from "../../../models/IDay";
import { ISlot } from "../../../models/ISlot";

interface WeekProps {
    id: string,
    startDate: Date,
    endDate: Date,
    days: IDay[],
    number: number,
    barberId: string,
    status: string
}

export const Week: FC<WeekProps> = ({ days, number }) => {
    const [updatedSlots, setUpdatedSlots] = useState<ISlot[]>([]);
    const [selectedDays, setSelectedDays] = useState<string>('Monday');
    const handleUpdateSlot = (updatedSlot: ISlot) => {
        setUpdatedSlots(prevSlots => {
            const existingSlotIndex = prevSlots.findIndex(slot => slot.id === updatedSlot.id);
            if (existingSlotIndex !== -1) {
                // Update existing slot
                const newSlots = [...prevSlots];
                newSlots[existingSlotIndex] = updatedSlot;
                return newSlots;
            } else {
                // Add new updated slot
                return [...prevSlots, updatedSlot];
            }
        });
    };
    const toggleDay = (dayName: string) => {
        setSelectedDays(dayName);
    };
    const [isWeekOnUpdate, setIsWeekOnUpdate] = useState<boolean>(false);
    return (
        <>
            <div className="p-5 rounded-xl bg-gray-600 my-2">
                {isWeekOnUpdate ? (
                    <div className="flex text-center text-2xl text-white">
                        Реадагуйте тиждень
                    </div>) : (<div className=""></div>)}
                <div className="text-center text-xl text-gray-300">Week {number}</div>
                <div className="flex">
                    {days.map((day, index) => (
                        <div
                            key={day.id}
                            onClick={() => toggleDay(day.dayName)}
                            className={`cursor-pointer mr-2 p-3 rounded-full ${selectedDays == day.dayName ? 'bg-gray-700 text-white' : 'bg-gray-200'} transition-colors`}
                        >
                            {day.dayName}
                        </div>
                    ))}
                </div>
                <div className="flex flex-wrap my-3">
                    {days.map((day, index) => (
                        <Day key={index} isWeekOnUpdate={isWeekOnUpdate} {...day} />
                    ))}
                </div>
                <div className="flex justify-end">
                    {isWeekOnUpdate ? (<button onClick={() => { setIsWeekOnUpdate(false) }} className="p-3 bg-gray-800 rounded text-white">Зберегти</button>) :
                        (<button onClick={() => { setIsWeekOnUpdate(true) }} className="p-3 bg-gray-800 rounded text-white">Редагувати тиждень</button>)}

                </div>

            </div>
        </>
    )
} 