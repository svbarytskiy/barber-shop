import { FC, useEffect, useState } from "react";
import { store } from "../../..";
import { useParams } from "react-router-dom";
import { useStore } from "../../../hooks/useStore";
import { TextareaWithTemplate } from "../../SetOrderModal/components/TextareaWithTemplate";
import { observer } from "mobx-react-lite";

interface StageThreeProps {
    onPrev: () => void;
    onNext: () => void;
    selectedDate: Date | null;
}

export const StageThree: FC<StageThreeProps> = ({ onPrev, onNext, selectedDate }) => {
    const formattedDate = selectedDate
        ? new Date(selectedDate).toLocaleString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        })
        : 'No date selected';

    const [requestText, setRequestText] = useState<string>("");
    const { store } = useStore();
    const { barberId } = useParams<{ barberId: string }>();
    const { service } = useParams<{ service: string }>();
    const sender = store.auth.user.id;
    const [localBarber, setLocalBarber] = useState<any>(null);

    useEffect(() => {
        if (barberId && service && selectedDate) {
            const formattedBarberId = barberId.replace(":", "");
            let foundBarber = store.barber.barbers.find(b => b.id === formattedBarberId);
            if (!foundBarber) {
                store.barber.getAllBarbers()
                foundBarber = store.barber.barbers.find(b => b.id === formattedBarberId);
            }
            if (foundBarber) {
                setLocalBarber(foundBarber);
                const template = `Шановний ${foundBarber.username}, я б хотів записатися на ${service} на ${formattedDate}. Прошу прийняти мій запит.`;
                setRequestText(template);
            }
        }
    }, [barberId, store.barber.barbers, service, selectedDate]);

    const sendRequest = () => {
        if (service && localBarber && barberId && selectedDate) {
            const formattedBarberId = barberId.replace(":", "");
            const formattedService = service.replace(":", "");
            store.message.createRequest(sender, formattedService, selectedDate, requestText, formattedBarberId);
        }
        onNext()
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Stage 3: Payment Information</h2>
            <p className="text-grey-900 text-xl my-5">Your selected date: <strong>{formattedDate}</strong></p>
            <div className="max-h-[300px]">
                <div className="text-lg mb-4">Service: <strong>{service}</strong> </div>
                <div className="text-lg mb-4">Barber: <strong>{localBarber?.username ?? "Барбер не знайдений"}</strong></div>
                {localBarber && (
                    <TextareaWithTemplate
                        barberName={localBarber.username}
                        date={formattedDate}
                        service={service ?? ''}
                        onUpdateText={setRequestText}
                        template={requestText}
                    />
                )}
            </div>
            <div className="flex justify-end mt-5">
                <button
                    className="p-2 text-xl rounded bg-gray-900 transition text-white hover:bg-gray-800"
                    onClick={sendRequest}
                >
                    Send Request
                </button>
            </div>
            <div className="mt-5">
                <button
                    className="p-2 text-xl rounded bg-blue-500 text-white"
                    onClick={onPrev}
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default observer(StageThree)