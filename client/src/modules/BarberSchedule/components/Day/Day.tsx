import { FC, useEffect, useState } from "react"
import { ISlot } from "../../../../models/ISlot"
import { Slot, SlotProp } from "../Slot/Slot"
import { observer } from 'mobx-react-lite';
import DoButton from "../../../../comon/ui/DoButton/DoButton";
import { UpdateDayModal } from "../UpdateDayModal/UpdateDayModal";
import Modal from "../../../../comon/ui/ModalWrapper/ModalWrapper";


interface DayProps {
    id: string,
    date: Date,
    dayName: string,
    slots: ISlot[],
    weekId: string
    isDayOff: boolean
}

export const Day: FC<DayProps> = observer(({ date, dayName, slots, isDayOff, }) => {


    const [isDayOnUpdate, setIsDayOnUpdate] = useState<boolean>(false);
    const [updatedSlots, setUpdatedSlots] = useState<Array<Partial<ISlot>>>([]);
    const [newSlots, setSlots] = useState(slots);

    
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);

    const handleUpdateSlot = (updatedSlot: Partial<ISlot>) => {
        const existingSlot = newSlots.find(slot => slot.id === updatedSlot.id);

        const alreadyUpd = updatedSlots.find(slot => slot?.id === updatedSlot.id);
        const hadChanges = existingSlot ? (
            updatedSlot.slotStatus !== existingSlot.slotStatus ||
            updatedSlot.service !== existingSlot.service ||
            updatedSlot.clientNum !== existingSlot.clientNum) : true;
        if (alreadyUpd && hadChanges) {
            setUpdatedSlots(prevSlots => prevSlots.map(slot => {
                if (slot.id === updatedSlot.id) {
                    return {
                        ...slot,
                        ...updatedSlot
                    };
                }
                return slot;
            }));
        }
        if (hadChanges && !alreadyUpd) {
            setUpdatedSlots(prevSlots => [...prevSlots, updatedSlot]);
        }
        if (!hadChanges && alreadyUpd) {
            setUpdatedSlots(prevSlots =>
                prevSlots.filter(slot => slot.id !== updatedSlot.id)
            );
        }
    }

    const handleCancelUpdate = () => {
        setUpdatedSlots([]); // Очищення масиву з змінами
        setSlots(slots); // Відновлення початкового стану слотів
        setIsDayOnUpdate(false); // Вихід з режиму редагування
    };

    const closeModal = () => {
        setIsUpdateModalOpen(false)
    };

    const handleOpenModal = () => {
        setIsUpdateModalOpen(true)
    };

    const formattedDate = new Date(date).toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <div className=" rounded-xl w-full flex flex-col my-1 h-full flex-grow">
            <div className="flex flex-col flex-wrap my-3 h-full">
                {isDayOff ? (
                    <div className="text-center text-xl text-red-500 my-3">
                        Вихідний день
                    </div>
                ) : (
                    <div className="flex h-full flex-grow">
                        <div className=" bg-blue-100 rounded-xl mr-5  pr-20 pb-20">
                            <h1 className="text-5xl m-5">Schedule</h1>
                            <div className="grid grid-cols-4 gap-4 flex-grow  p-3">
                                {newSlots && newSlots.map((slot, index) => (
                                    <Slot
                                        key={slot.id}
                                        isDayOnUpdate={isDayOnUpdate}
                                        id={slot.id}
                                        date={slot.date}
                                        dayId={slot.dayId}
                                        clientNum={slot.clientNum}
                                        barberId={slot.barberId}
                                        service={slot.service}
                                        slotStatus={slot.slotStatus}
                                        onUpdateSlot={handleUpdateSlot}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="min-w-[320px] rounded-xl bg-blue-200 flex-grow p-7 flex flex-col">
                            <div className="flex-grow">
                                <h1 className="text-5xl mb-4">Details</h1>
                                <div className="mb-5">
                                    <p className="text-lg">Time</p>
                                    <input className="px-4 w-full py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter text here" type="text" />
                                </div>
                                <div className="mb-5">
                                    <p className="text-lg">Service</p>
                                    <input className="px-4 w-full py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter text here" type="text" />
                                </div>
                                <div className="mb-5">
                                    <p className="text-lg">Client</p>
                                    <input className="px-4 w-full py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter text here" type="text" />
                                </div>
                                <div className="mb-5">
                                    <p className="text-lg">Client Number</p>
                                    <input className="px-4 w-full py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter text here" type="text" />
                                </div>
                            </div>

                            <div className="flex justify-between mt-auto">
                                <div className="w-[120px]  cursor-pointer p-2 rounded-full bg-gray-100 text-center items-center hover:bg-gray-200 transition">Edit</div>
                                <div className="w-[120px]  cursor-pointer p-2 rounded-full bg-gray-100 text-center items-center hover:bg-gray-200 transition">Save</div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
            <div className="flex justify-end">
                {isDayOnUpdate ? (
                    <>
                        <DoButton buttonText={"Зберегти"} callbackHandler={handleOpenModal} />
                        <DoButton buttonText={"Відміна"} callbackHandler={handleCancelUpdate} />
                    </>
                ) : (
                    <button onClick={() => setIsDayOnUpdate(true)} className="p-3 bg-gray-800 rounded text-white">Редагувати день</button>
                )}
                <Modal isOpen={isUpdateModalOpen} onClose={closeModal}>
                    <UpdateDayModal updates={updatedSlots} closeModal={closeModal} />
                </Modal>
            </div>
        </div>
    )
})
