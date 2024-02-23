import { FC, MouseEvent } from "react"
import DoButton from "../../../comon/ui/DoButton/DoButton";
import { SetOrderModal } from "../../../modules/SetOrderModal/SetOrderModal";

interface SlotBoxItemProps {
    id: string
    date: Date
}

export const SlotBoxItem: FC<SlotBoxItemProps> = ({ date, id }) => {

    const formattedDate = new Date(date).toLocaleTimeString('uk-UA', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    return (
        <div className="rounded w-200 bg-gray-600 p-5 items-center">
            <div className="text-gray-400 mb-5">{formattedDate}</div>
            <SetOrderModal date={date} slotId={id} />
        </div>
    )
}
