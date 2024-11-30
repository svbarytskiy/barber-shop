import React, { FC, useState } from "react";
import { ISlot } from "../../../../models/ISlot";
import TimeInput from "../../ui/TimeInput/TimeInput";
import ServiceSelect from "../../ui/ServiceSelect/ServiceSelect";
import ClientInput from "../../ui/ClientInput/ClientInput";
import ActionButtons from "../../ui/ActionButtons/ActionButtons";

interface DetailsProps {
    selectedSlot: ISlot | undefined;
    isEditing: boolean;
    onServiceChange: (service: string) => void;
    onClientChange: (clientNum: string) => void;
    onCancel: () => void;
    onSave: () => void;
    onEditToggle: () => void;
    resetTrigger: boolean;  
}

const Details: FC<DetailsProps> = ({
    selectedSlot,
    isEditing,
    onServiceChange,
    onClientChange,
    onCancel,
    onSave,
    onEditToggle,
    resetTrigger
}) => {

    const time = selectedSlot && selectedSlot.date
        ? new Date(selectedSlot.date).toLocaleTimeString("uk-UA", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })
        : "";


    return (
        <aside className="min-w-[320px] rounded-xl bg-blue-200 flex-grow p-7 flex flex-col">
            <div className="flex-grow">
                <h1 className="text-5xl mb-4">Details</h1>
                <TimeInput time={time} />
                <ServiceSelect
                    initialValue={selectedSlot?.service || ""}
                    onChange={onServiceChange}
                    disabled={!isEditing}
                    resetTrigger={resetTrigger} 
                />
                <ClientInput
                    initialClientNum={selectedSlot?.clientNum || ""}
                    onChange={onClientChange}
                    disabled={!isEditing}
                    resetTrigger={resetTrigger} 
                />
            </div>
            <ActionButtons
                isEditing={isEditing}
                onEditToggle={onEditToggle}
                onCancel={onCancel}
                onSave={onSave}
            />
        </aside>
    );
    };

    export default Details;
