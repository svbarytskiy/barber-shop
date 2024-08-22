import { FC } from "react";

interface DayBoxItemProps {
    dayName: string;
    date: Date;
    id: string;
    onClick: (id: string) => void; // Callback function for handling click
}

export const DayBoxItem: FC<DayBoxItemProps> = ({ dayName, date, id, onClick }) => {
    const formattedDate = new Date(date).toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <div 
            className="rounded-lg bg-blue-400 gap-3 p-5 pb-24 hover:bg-blue-500 transition duration-300 ease-in-out cursor-pointer" 
            onClick={() => onClick(id)} // Handle click event
        >
            <div className="text-2xl text-white">{dayName}</div>
            <div className="text-base text-white">{formattedDate}</div>
        </div>
    );
}
