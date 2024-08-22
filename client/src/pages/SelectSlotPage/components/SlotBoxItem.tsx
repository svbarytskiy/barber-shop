import { FC } from "react";

interface SlotBoxItemProps {
    id: string;
    date: Date;
    onClick: (date: Date) => void; // Callback function for handling click
}

export const SlotBoxItem: FC<SlotBoxItemProps> = ({ date, id, onClick }) => {
    console.log("Rendering SlotBoxItem with ID:", id);
    const formattedDate = new Date(date).toLocaleTimeString('uk-UA', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    return (
        <div
            className="rounded w-200 bg-blue-500 p-5 items-center cursor-pointer hover:bg-blue-600"
            onClick={() => onClick(date)} // Виклик функції з передачею параметра date
        >
            <div className="text-white mb-5">{formattedDate}</div>
            {/* <SetOrderModal date={date} slotId={id} /> */}
        </div>
    );
};
