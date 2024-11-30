import { FC } from "react";

interface SlotBoxItemProps {
    id: string;
    date: Date;
    onClick: (date: Date) => void; 
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
            className="rounded w-200 bg-blue-500 text-xs sm:text-base p-2 sm:p-5 items-center cursor-pointer hover:bg-blue-600"
            onClick={() => onClick(date)} 
        >
            <div className="text-white mb-5">{formattedDate}</div>
            {/* <SetOrderModal date={date} slotId={id} /> */}
        </div>
    );
};
