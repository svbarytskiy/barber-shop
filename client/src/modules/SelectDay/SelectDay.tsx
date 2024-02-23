import { FC, useEffect, useState } from "react";
import FormHeader from "../../comon/ui/headers/FormHeader/FormHeader";
import { useStore } from "../../hooks/useStore";
import { useParams } from "react-router-dom";
import { DayBoxItem } from "./components/DayBoxItem/DayBoxItem";


export const SelectDay: FC = () => {
    const { store } = useStore()
    const { barberId } = useParams<{ barberId: string }>();
    console.log(barberId)
    useEffect(() => {
        if (barberId) {
            store.session.getValidDays(barberId);
        }
    }, [barberId, store.session]);

    const days = store.session.days || [];
    return (
        <>
            <FormHeader headerText={"Виберіть день в який ви б хотіли зареєструватись на сеанс"} />
            {days.length > 0 ? (
                <div className="grid grid-cols-3 gap-5">
                    {days.map((day, index) => (
                        <DayBoxItem key={index} dayName={day.dayName} date={day.date} id={day.id} />
                    ))}
                </div>
            ) : (
                <div className="text-center mt-5 text-lg text-gray-500">
                    Вільних днів немає. Будь ласка, виберіть іншого барбера.
                </div>
            )}
        </>
    )
}