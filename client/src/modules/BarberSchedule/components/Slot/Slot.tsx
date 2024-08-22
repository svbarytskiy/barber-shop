import { FC, useEffect, useRef, useState, } from "react"
import MySelect from "../../../../comon/ui/MySelect/MySelect";
import { ISlot } from "../../../../models/ISlot";
import { observer } from 'mobx-react-lite';

export interface SlotProp {
    id: string,
    date: Date,
    dayId: string,
    clientNum: string,
    barberId: string,
    service: string,
    slotStatus: string,
    isDayOnUpdate: boolean
    onUpdateSlot: (updatedSlot: Partial<ISlot>) => void;
}

export const Slot: FC<SlotProp> = observer(({ id, date, service, slotStatus, isDayOnUpdate, clientNum, onUpdateSlot }) => {
    const [newSlotStatus, setNewSlotStatus] = useState<string>(slotStatus);

    const [newService, setNewService] = useState<string>(service);
    const [newClientNum, setNewClientNum] = useState<string>(clientNum);
    const prevSlotStatus = usePrevious(newSlotStatus);

    function usePrevious<T>(value: T): T | undefined {
        const ref = useRef<T | undefined>(undefined);
        useEffect(() => {
            ref.current = value;
        }, [value]);
        return ref.current;
    }

    useEffect(() => {
        if (newSlotStatus === 'Available' && prevSlotStatus !== 'Available') {
            setNewService('None');
            setNewClientNum('');
        }
    }, [newSlotStatus, prevSlotStatus]);

    useEffect(() => {

    }, [isDayOnUpdate]);

    useEffect(() => {
        onUpdateSlot({
            id,
            slotStatus: newSlotStatus,
            service: newService,
            clientNum: newClientNum,
        });
        if (!isDayOnUpdate) {
            setNewService(service)
            setNewClientNum(clientNum);
            setNewSlotStatus(slotStatus);
        }
    }, [newSlotStatus, newService, newClientNum, slotStatus, service, clientNum, isDayOnUpdate]); // Залежності useEffect
    const [isOpen, setIsOpen] = useState<boolean>(false);


    const formattedDate = new Date(date).toLocaleTimeString('uk-UA', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    const serviceOptions = [
        { value: "haircut", label: "Стрижка волосся" },
        { value: "hairDyeing", label: "Фарбування волосся" },
        { value: "pedicure", label: "Педикюр" },
        { value: "manicure", label: "Манікюр" },
        { value: "hairExtension", label: "Нарощування волосся" },
        { value: "hairStyling", label: "Укладка волосся" },
        { value: "None", label: "Пусто" },
    ];

    const options = [
        { value: "Available", label: "Доступно" },
        { value: "Unavailable", label: "Недоступно" }
    ];



    const handleServiceChange = (selectedValue: string) => {
        setNewService(selectedValue);
    };
    const handleClientNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewClientNum(e.target.value);
    };
    const handleSlotStatusChange = (selectedValue: string) => {
        setNewSlotStatus(selectedValue);
    };
    return (
        <div onClick={() => setIsOpen(!isOpen)} className="rounded-3xl bg-gray-100 hover:bg-gray-200 m-1 p-1 cursor-pointer border ">
            <div className="p-3 rounded-md">
                <div className="text-gray-700 text-xl mb-2">{formattedDate}</div>
                {!isDayOnUpdate && (
                    <div>
                        <div className="text-gray-800 text-lg mb-3">{service}</div>
                        {/* {newSlotStatus === 'Unavailable' && clientNum !== null && (
                        <div className="text-gray-800 text-xl ml-3">Номер клієнта: {clientNum}</div>
                    )} */}
                    </div>
                )}
                <div className="">
                    <span className={`rounded-full px-3 border-2 py-1 text-xx ${newSlotStatus === 'Available' ? 'bg-green-400 border-green-800' : 'bg-red-400 border-red-800'}`}>
                        {slotStatus === 'Available' ? 'Available' : 'Unavailable'}
                    </span>
                </div>
            </div>


            {isDayOnUpdate && (
                <>
                    <MySelect options={options} selectedOption={slotStatus} onChange={handleSlotStatusChange} />
                    {newSlotStatus === 'Unavailable' && (
                        <>
                            <div className="mt-2 mx-3">
                                <label className="block text-gray-800 text-lg">Сервіс:</label>
                                <MySelect
                                    options={serviceOptions}
                                    selectedOption={service}
                                    onChange={handleServiceChange}
                                />
                            </div>
                            <div className="text-gray-800 text-xl mx-3 mt-2">
                                <label className="text-gray-800 text-xl mr-2">Номер клієнта: </label>
                                <input value={newClientNum} onChange={handleClientNumChange} className="rounded p-3 outline-none w-full placeholder:text-gray-700" placeholder="Введіть номер клієнта"></input>
                            </div>
                        </>
                    )}

                </>
            )}

        </div>
    )
})