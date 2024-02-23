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
    const [requestText, setRequestText] = useState<string>(""); // Стан для тексту з текстового поля
    const { store } = useStore();
    const { barberId } = useParams<{ barberId: string }>();
    const { service } = useParams<{ service: string }>();
    const sender = store.auth.user.id;
    const [localBarber, setLocalBarber] = useState<any>(null);

    useEffect(() => {
        if (barberId) {
            const formattedBarberId = barberId.replace(":", "");
            const foundBarber = store.barber.barbers.find(b => b.id === formattedBarberId);
            setLocalBarber(foundBarber);
        }
    }, [barberId, store.barber.barbers]);

    let template = `Шановний ${localBarber.username}, я б хотів записатися на ${service} на ${formattedDate}. Прошу прийняти мій запит.`;

    useEffect(() => {
        if (barberId && service && localBarber) {
            template = `Шановний ${localBarber.username}, я б хотів записатися на ${service} на ${formattedDate}. Прошу прийняти мій запит.`;
            setRequestText(template); // Встановлення тексту за замовчуванням
        }
    }, [barberId, service, localBarber, formattedDate]);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const sendRequest = () => {
        if (service && localBarber && barberId) { 
            console.log('hhhhhhh')
            console.log(requestText)
            console.log('hhhhhhh')
            const formattedBarberId = barberId.replace(":", "");
            const formattedService = service.replace(":", "");
            store.message.createRequest(sender, formattedService, date, requestText, formattedBarberId);
            closeModal(); // Закрити модальне вікно після відправлення запиту
        }
    };

    return (
        <>
            <DoButton buttonText={"Записатися"} callbackHandler={() => setIsModalOpen(true)}></DoButton>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="p-10 bg-white rounded-lg shadow">
                    <div className="text-lg mb-4">Сервіс: {service}</div>
                    <div className="text-lg mb-4">Час: {formattedDate}</div>
                    <div className="text-lg mb-8">Барбер: {localBarber ? localBarber.username : "Барбер не знайдений"}</div>
                    <TextareaWithTemplate
                        barberName={localBarber ? localBarber.username : ''}
                        date={formattedDate}
                        service={service}
                        onUpdateText={setRequestText}
                        template={template} // Функція для оновлення тексту
                    />
                </div>
                <DoButton buttonText={"Надіслати запит"} callbackHandler={sendRequest} />
            </Modal>
        </>
    );
};
