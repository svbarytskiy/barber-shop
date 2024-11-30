import { FC, useEffect } from "react"
import { useParams } from "react-router-dom";
import { useStore } from "../../hooks/useStore";
import { SlotBoxItem } from "./components/SlotBoxItem";

export const SelectSlotPage: FC = () => {
    const { store } = useStore()
    const { barberId } = useParams<{ barberId: string }>();
    const { dayId } = useParams<{ dayId: string }>();
    useEffect(() => {
        if (barberId && dayId) {
            store.session.getValidSlots(barberId, dayId);
        }
    }, [barberId, store.session]);

    const slots = store.session.slots || [];
    return (
        <div className="">
            {/* <div className="text-xl text-gray-500 my-4">Виберіть день в який ви б хотіл  записатися на сеанс</div>
            {slots.length > 0 ? (
                <div className="grid grid-cols-4 gap-4">
                    {slots.map((slot, index) => (
                        <SlotBoxItem key={index} id={slot.id} date={slot.date} />
                    ))}
                </div>
            ) : (
                <div className="text-gray-300 text-2xl text-center my-20">
                    Вільних слотів немає. Виберіть інший день або іншого барбера
                </div>
            )} */}
        </div>
    )
}
