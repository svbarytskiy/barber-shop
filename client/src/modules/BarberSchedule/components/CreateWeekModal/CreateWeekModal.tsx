import React, { FC, useState } from "react";
import { useStore } from "../../../../hooks/useStore";

interface CreateWeekModalProps {
    id: string;
    closeModal: () => void
}

export const CreateWeekModal: FC<CreateWeekModalProps> = ({ id, closeModal }) => {
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [selectedHours, setSelectedHours] = useState<number[]>([]);
    const { store } = useStore();
    const createWeek = () => {
        try {
            console.log(id)
            store.schedule.createWeek(selectedDays, selectedHours, id)
            closeModal()
        } catch (e) {
            console.log(e)
        }
    }

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const hours = Array.from({ length: 12 }, (_, i) => 8 + i);

    const toggleDay = (day: string) => {
        setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
    };

    const toggleHour = (hour: number) => {
        setSelectedHours(prev => prev.includes(hour) ? prev.filter(h => h !== hour) : [...prev, hour]);
    };

    return (
        <div className="p-5 bg-white rounded-lg shadow">
            <h3 className="text-2xl mb-4">Створити тиждень</h3>
            <div className="mb-4">
                <div className="mb-2">Виберіть дні відпочинку:</div>
                <div className="flex flex-wrap gap-2">
                    {daysOfWeek.map(day => (
                        <div
                            key={day}
                            onClick={() => toggleDay(day)}
                            className={`cursor-pointer p-3 rounded-full ${selectedDays.includes(day) ? 'bg-gray-700 text-white' : 'bg-gray-200'} transition-colors`}
                        >
                            {day}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div className="mb-2">Виберіть години відпочинку:</div>
                <div className="flex flex-wrap gap-2">
                    {hours.map(hour => (
                        <div
                            key={hour}
                            onClick={() => toggleHour(hour)}
                            className={`cursor-pointer p-3 rounded-full ${selectedHours.includes(hour) ? 'bg-gray-700 text-white' : 'bg-gray-200'} transition-colors`}
                        >
                            {hour}:00
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={createWeek} className="my-5 rounded ml-full bg-gray-700 text-white p-3">Створити тиждень</button>
        </div>
    );
};
