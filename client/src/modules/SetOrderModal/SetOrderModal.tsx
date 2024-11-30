import { FC, useState, useEffect } from "react";
import Modal from "../../comon/ui/ModalWrapper/ModalWrapper";
import DoButton from "../../comon/ui/DoButton/DoButton";
import { useParams } from "react-router-dom";
import { useStore } from "../../hooks/useStore";
import { TextareaWithTemplate } from "./components/TextareaWithTemplate";

interface SetOrderModalProps {
    date: Date;
    slotId: string;
}

export const SetOrderModal: FC<SetOrderModalProps> = ({ date, slotId }) => {
    const formattedDate = new Date(date).toLocaleString('uk-UA', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [requestText, setRequestText] = useState<string>("");
    const { store } = useStore();
    const { barberId } = useParams<{ barberId: string }>();
    const { service } = useParams<{ service: string }>();
    const sender = store.auth.user.id;
    const [localBarber, setLocalBarber] = useState<any>(null);

    useEffect(() => {
        if (barberId) {
            const formattedBarberId = barberId.replace(":", "");
            const foundBarber = store.barber.barbers.find(b => b.id === formattedBarberId);
            if (foundBarber) {
                setLocalBarber(foundBarber);
                const template = `Шановний ${foundBarber.username}, я б хотів записатися на ${service} на ${formattedDate}. Прошу прийняти мій запит.`;
                setRequestText(template);
            }
        }
    }, [barberId, store.barber.barbers, service, formattedDate]);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const sendRequest = () => {
        if (service && localBarber && barberId) {
            const formattedBarberId = barberId.replace(":", "");
            const formattedService = service.replace(":", "");
            store.message.createRequest(sender, formattedService, date, requestText, formattedBarberId);
            closeModal();
        }
    };

    return (
        <>
            <DoButton buttonText={"Sign up"} callbackHandler={() => setIsModalOpen(true)} />
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="p-10 bg-white rounded-lg shadow min-w-[600px]">
                    <div className="text-lg mb-4">Сервіс: {service}</div>
                    <div className="text-lg mb-4">Час: {formattedDate}</div>
                    <div className="text-lg mb-8">Барбер: {localBarber?.username ?? "Барбер не знайдений"}</div>
                    <TextareaWithTemplate
                        barberName={localBarber?.username ?? ''}
                        date={formattedDate}
                        service={service}
                        onUpdateText={setRequestText}
                        template={requestText}
                    />
                </div>
                <DoButton buttonText={"Надіслати запит"} callbackHandler={sendRequest} />
            </Modal>
        </>
    );
};