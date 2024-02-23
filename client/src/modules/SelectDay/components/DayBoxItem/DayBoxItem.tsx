import { FC } from "react"
import { Link } from "react-router-dom";

interface DayBoxItemProps {
    dayName: string,
    date: Date
    id: string
}

export const DayBoxItem: FC<DayBoxItemProps> = ({ dayName, date, id }) => {
    const formattedDate = new Date(date).toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    return (
        <Link to={`selectSlot/:${id}`}>
            <div className="rounded-lg bg-gray-600 gap-3 p-5 pb-24 hover:bg-gray-700 transition duration-300 ease-in-out cursor-pointer"> {/* rounded-lg для більш заокруглених країв, hover:bg-gray-700 для ефекту ховеру */}
                <div className="text-2xl text-gray-300">{dayName}</div>
                <div className="text-base text-gray-300">{formattedDate}</div>
            </div>
        </Link>
    )
}