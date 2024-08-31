import React, { FC, useState } from "react";
import { ISlot } from "../../../../models/ISlot";
import { Slot } from "../Slot/Slot";
import { observer } from "mobx-react-lite";
import Modal from "../../../../comon/ui/ModalWrapper/ModalWrapper";
import { UpdateDayModal } from "../UpdateDayModal/UpdateDayModal";
import Details from "../Details/Details"; // Import the Details component

interface DayProps {
    id: string;
    date: Date;
    dayName: string;
    slots: ISlot[];
    weekId: string;
    isDayOff: boolean;
}

export const Day: FC<DayProps> = observer(({ date, dayName, slots, isDayOff }) => {
    const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [editedService, setEditedService] = useState<string>('');
    const [editedClientNumber, setEditedClientNumber] = useState<string>('');
    const [resetTrigger, setResetTrigger] = useState<boolean>(false); // Додайте стан resetTrigger

    const selectedSlot = slots.find(slot => slot.id === selectedSlotId);

    const handleSelectSlot = (slotId: string) => {
        setSelectedSlotId(slotId);
        setIsEditing(false);
        setEditedService('');
        setEditedClientNumber('');
        setResetTrigger(prev => !prev); // Оновіть resetTrigger при виборі слоту
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        // if (selectedSlot) {
        //     selectedSlot.service = editedService;
        //     selectedSlot.clientNum = editedClientNumber;
        // }
        setIsEditing(false);
        setIsUpdateModalOpen(true);
    };

    const handleCancel = () => {
        setEditedService(selectedSlot?.service || '');
        setEditedClientNumber(selectedSlot?.clientNum || '');
        setIsEditing(false);
        setResetTrigger(prev => !prev); // Оновіть resetTrigger при скасуванні
    };

    const handleServiceChange = (service: string) => {
        setEditedService(service);
    };

    const handleClientChange = (clientNum: string) => {
        setEditedClientNumber(clientNum);
    };

    const closeModal = () => {
        setIsUpdateModalOpen(false);
    };

    return (
        <div className="rounded-xl w-full flex flex-col my-1 h-full flex-grow">
            <div className="flex flex-col flex-wrap my-3 h-full">
                {isDayOff ? (
                    <div className="text-center text-xl text-red-500 my-3">Вихідний день</div>
                ) : (
                    <div className="flex h-full flex-grow">
                        <div className="bg-blue-100 rounded-xl mr-5 pr-20 pb-20">
                            <h1 className="text-5xl m-5">Schedule</h1>
                            <div className="grid grid-cols-4 gap-4 flex-grow p-3">
                                {slots.map(slot => (
                                    <Slot
                                        key={slot.id}
                                        slot={slot}
                                        isSelected={slot.id === selectedSlotId}
                                        onSelect={handleSelectSlot}
                                    />
                                ))}
                            </div>
                        </div>
                        <Details
                            selectedSlot={selectedSlot}
                            isEditing={isEditing}
                            onServiceChange={handleServiceChange}
                            onClientChange={handleClientChange}
                            onCancel={handleCancel}
                            onSave={handleSave}
                            onEditToggle={handleEditToggle}
                            resetTrigger={resetTrigger} // Передайте resetTrigger
                        />
                    </div>
                )}
            </div>

            <Modal isOpen={isUpdateModalOpen} onClose={closeModal}>
                <UpdateDayModal updates={selectedSlot ? [selectedSlot] : []} closeModal={closeModal} function={handleSave}/>
            </Modal>
        </div>
    );
});
