import { FC, useEffect, useState } from "react";
import MySelect, { Option } from "../../comon/ui/MySelect/MySelect";
import { useStore } from "../../hooks/useStore";
import { BarberCard } from "./components/BarberCard";
import { IBarber, IService } from "../../models/IBarber";

export const SetOrder: FC = () => {
    const serviceOptions: Option[] = [
        { value: "haircut", label: "Стрижка волосся" },
        { value: "hairDyeing", label: "Фарбування волосся" },
        { value: "pedicure", label: "Педикюр" },
        { value: "manicure", label: "Манікюр" },
        { value: "hairExtension", label: "Нарощування волосся" },
        { value: "hairStyling", label: "Укладка волосся" },
    ];
    const [selectedService, setSelectedService] = useState<string>("");
    const { store } = useStore(); // Припускаємо, що useStore() повертає тип, який містить store.barber.barbers

    useEffect(() => {
        store.barber.getAllBarbers();
    }, [store.barber]);

    const filteredBarbers = store.barber.barbers.filter((barber: IBarber) => barber.services[selectedService as keyof IService]);

    return (
        <>
            <div>
                <MySelect options={serviceOptions} onChange={setSelectedService} />
                {selectedService && <div className="text-gray-400 text-lg">Ви обрали: {selectedService}</div>}
            </div>
            <div className="grid grid-cols-3 gap-4">
                {filteredBarbers.length > 0 ? (
                    filteredBarbers.map((barber) => (
                        <BarberCard key={barber.id} phoneNumber={barber.phoneNumber} barberName={barber.username} options={barber.services} image={barber.image} barberId={barber.id} orderService = {selectedService} />
                    ))
                ) : (
                    <p className="my-10 text-lg text-gray-500 text-center">Немає доступних барберів.</p>
                )}
            </div>
        </>
    );
};
