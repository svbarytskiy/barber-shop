import { FC, useState } from "react"

export interface SlotProp {
    date: Date,
    dayId: string,
    clientId: string,
    barberId: string,
    service: string,
    slotStatus: string,
    isWeekOnUpdate: boolean
}

export const Slot: FC<SlotProp> = ({ date, service, slotStatus, isWeekOnUpdate }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const formattedDate = new Date(date).toLocaleTimeString('uk-UA', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    return (
        <div onClick={() => setIsOpen(!isOpen)} className="rounded-md bg-gray-200 hover:bg-gray-300 m-1 cursor-pointer border">
            <div className="p-3 rounded-md flex justify-between">
                <div className="">{formattedDate}</div>
                <div className="">
                    <span className={`rounded-full ml-1 px-3 py-1 text-white ${slotStatus === 'Available' ? 'bg-green-500' : 'bg-red-500'}`}>
                        {slotStatus === 'Available' ? 'Доступно' : 'Недоступно'}
                    </span>
                </div>
            </div>

            {isOpen && !isWeekOnUpdate && (
                <>
                    <div>Сервіс: {service}</div>
                </>
            )}
            {isOpen && isWeekOnUpdate && (
                <>
                    <div className="">
                        <input value={service} className="rounded p-3 outline-none placeholder:text-gray-700" placeholder="Введіть новий сервіс"></input>
                    </div>
                </>
            )}

        </div>

    )
}