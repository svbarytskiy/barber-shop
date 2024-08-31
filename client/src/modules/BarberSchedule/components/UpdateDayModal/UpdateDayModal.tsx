import React, { FC, useState } from "react";
import { useStore } from "../../../../hooks/useStore";
import { ISlot } from "../../../../models/ISlot";
import { observer } from "mobx-react-lite";


interface CreateWeekModalProps {
    updates: Array<Partial<ISlot>>
    closeModal: () => void
    function: () => void
}

export const UpdateDayModal: FC<CreateWeekModalProps> = observer(({ closeModal, updates }) => {
    const { store } = useStore();
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const updateDay = async () => {
        setIsLoading(true);
        try {
            const data = await store.schedule.updateDay(updates);
            setResponseMessage("Зміни успішно збережено!");
            setIsLoading(false);
        } catch (e) {
            console.log(e);
            setResponseMessage("Помилка при збереженні змін.");
            setIsLoading(false);
        }
    }

    return (
        <div className="p-5 bg-white rounded-lg shadow w-[400px] h-[250px] flex flex-col items-center justify-between">
            <h3 className="text-2xl mb-4">Зберегти зміни</h3>
            <div className="mb-4">
                {responseMessage && <p>{responseMessage}</p>}
                {isLoading && <p>Завантаження...</p>}
            </div>
            <button
                onClick={!isLoading && responseMessage ? closeModal : updateDay}
                className="rounded bg-gray-700 text-white p-3"
                disabled={isLoading} // Додаємо атрибут disabled, коли завантаження триває
            >
                {responseMessage ? "Закрити" : "Зберегти зміни"}
            </button>
        </div>
    );
})
