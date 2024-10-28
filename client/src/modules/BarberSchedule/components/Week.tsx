import { FC, useEffect, useState } from "react";
import { Day } from "./Day/Day";
import { IDay } from "../../../models/IDay";
import { observer } from 'mobx-react-lite';

interface WeekProps {
    id: string,
    startDate: Date,
    endDate: Date,
    days: IDay[],
    number: number,
    barberId: string,
    status: string
}

export const Week: FC<WeekProps> = observer(({ days, number }) => {
    const [selectedDay, setSelectedDay] = useState<string>('Monday');

    useEffect(() => {
        console.log(`selectedDay updated to: ${selectedDay}`);
    }, [selectedDay]);

    const toggleDay = (dayName: string) => {
        setSelectedDay(dayName);
        console.log(selectedDay)
        const matchingDays = days.filter(day => day.dayName === selectedDay);

        matchingDays.forEach(day => {
          console.log(`Slots for ${day.dayName}:`, day.slots);
        });
    };

    const formatDate = (dateString: Date) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'long' });
        
        const daySuffix = (d: number) => {
            if (d > 3 && d < 21) return 'th'; // special case for 11th-13th
            switch (d % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        };

        return `${day}${daySuffix(day)} of ${month}`;
    };

    return (
        <>
            <div className="p-5 rounded-xl my-2 h-full flex-grow">
                <div className="flex">
                    {days.map((day, index) => (
                        <div
                            key={day.id}
                            onClick={() => toggleDay(day.dayName)}
                            className={`cursor-pointer text-lg mr-2 overflow-hidden truncate p-3 rounded-full ${selectedDay == day.dayName ? 'bg-blue-200' : 'bg-gray-200'} transition-colors`}
                        >
                            {day.dayName}, {formatDate(day.date)}
                        </div>
                    ))}
                </div>
                <div className="flex flex-wrap my-3 h-full flex-grow">
                    {days.filter(day => day.dayName === selectedDay).map((day, index) => (
                        <div key={day.id} className="w-full h-full">
                            {/* <div className="text-xl font-semibold mb-2">
                                {day.dayName} - {formatDate(day.date)}
                            </div> */}
                            <Day 
                                id={day.id} 
                                date={day.date} 
                                dayName={day.dayName} 
                                slots={day.slots} 
                                weekId={day.weekId} 
                                isDayOff={day.isDayOff}  
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
});
